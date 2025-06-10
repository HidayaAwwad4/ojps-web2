<?php

namespace App\Http\Controllers;

use App\Models\FavoriteJob;
use App\Models\Application;
use Illuminate\Support\Facades\DB;
use App\Models\JobListing;
use Illuminate\Http\JsonResponse;

class ReportsController extends Controller
{
    public function getAdminStats(): JsonResponse
    {
        $totalApplications = Application::count();

        $totalSeekers = DB::table('users')
            ->join('roles', 'users.role_id', '=', 'roles.id')
            ->where('roles.name', 'seeker')
            ->count();

        $totalEmployers = DB::table('users')
            ->join('roles', 'users.role_id', '=', 'roles.id')
            ->where('roles.name', 'employer')
            ->count();

        $hasData = $totalApplications > 0 || $totalSeekers > 0 || $totalEmployers > 0;

        return response()->json([
            'message' => $hasData ? 'Admin statistics fetched successfully' : 'No statistics data found',
            'data' => [
                'totalApplications' => $totalApplications,
                'totalSeekers' => $totalSeekers,
                'totalEmployers' => $totalEmployers,
            ]
        ], $hasData ? 200 : 404);
    }

    public function getEmployerStats(): JsonResponse
    {
        $user = auth()->user();

        if (!$user || $user->role->name !== 'employer') {
            return response()->json([
                'message' => 'Unauthorized access or invalid user role.',
            ], 403);
        }

        $employerId = $user->employer->id ?? null;

        if (!$employerId) {
            return response()->json([
                'message' => 'Employer not found.',
            ], 404);
        }

        $applicationsReceived = Application::whereHas('job', function ($query) use ($employerId) {
            $query->where('employer_id', $employerId);
        })->count();

        $applicationsSaved = FavoriteJob::whereHas('job', function ($query) use ($employerId) {
            $query->where('employer_id', $employerId);
        })->count();

        $hasData = $applicationsReceived > 0 || $applicationsSaved > 0;

        return response()->json([
            'message' => $hasData ? 'Employer statistics fetched successfully' : 'No employer statistics data found',
            'data' => [
                'applicationsReceived' => $applicationsReceived,
                'applicationsSaved' => $applicationsSaved,
            ]
        ], $hasData ? 200 : 404);
    }

    public function getAdminBarchartData(): JsonResponse
    {
        $data = JobListing::select('category', DB::raw('count(*) as total'))
            ->groupBy('category')
            ->get();

        return response()->json([
            'message' => $data->isEmpty() ? 'No Bar Chart data found' : 'Bar Chart data fetched successfully',
            'data' => $data->isEmpty() ? [] : $data
        ], $data->isEmpty() ? 404 : 200);
    }

    public function getEmployerLineChartData(): JsonResponse
    {
        $user = auth()->user();

        if (!$user || $user->role->name !== 'employer') {
            return response()->json([
                'message' => 'Unauthorized access or invalid user role.',
            ], 403);
        }

        $employerId = $user->employer->id ?? null;

        if (!$employerId) {
            return response()->json([
                'message' => 'Employer not found.',
                'data' => [
                    'label' => [],
                    'data' => []
                ]
            ], 404);
        }

        $records = Application::select(
            DB::raw("MONTH(created_at) as month_number"),
            DB::raw("DATE_FORMAT(created_at , '%M') as month_name"),
            DB::raw('count(*) as total')
        )
            ->whereHas('job', function ($query) use ($employerId) {
                $query->where('employer_id', $employerId);
            })
            ->groupBy(DB::raw("MONTH(created_at), DATE_FORMAT(created_at , '%M')"))
            ->orderBy(DB::raw("MONTH(created_at)"))
            ->get();

        if ($records->isEmpty()) {
            return response()->json([
                'message' => 'No Line Chart data found',
                'data' => [
                    'label' => [],
                    'data' => []
                ]
            ], 404);
        }

        return response()->json([
            'message' => 'Line Chart data fetched successfully',
            'data' => [
                'label' => $records->pluck('month_name'),
                'data' => $records->pluck('total')
            ]
        ], 200);
    }
}
