<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\JobListing;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller {
    public function allUsers()
    {
        return response()->json(User::with('role')->get());
    }
    public function addUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role_id' => 'required|exists:roles,id',
            'location' => 'nullable|string',
            'summary' => 'nullable|string',
            'profile_picture' => 'nullable|string',
        ]);
        $validated['password'] = Hash::make($validated['password']);
        $user = User::create($validated);

        return response()->json(['message' => 'User created successfully', 'user' => $user]);
    }
    public function updateUser(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'role_id' => 'required|exists:roles,id',
            'location' => 'nullable|string',
            'summary' => 'nullable|string',
            'profile_picture' => 'nullable|string',
        ]);
        $user = User::findOrFail($id);
        $user->update($validated);

        return response()->json(['message' => 'User updated successfully']);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);

        if($user ->role_id ===1) {
            return response()->json(['message' => 'You cannot delete your own account', 'user' => $user]);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function pendingEmployerRequests()
    {
        $pendingEmployers = User::with('role')
            ->where('role_id', 2)
            ->where('is_approved', false)
            ->get();
        return response()->json($pendingEmployers);
    }

    public function approveEmployer($id)
    {
        $user = User::findOrFail($id);
        if ($user->role_id != 2 || $user->is_approved) {
            return response()->json(['message' => 'User is not pending approval'], 400);
        }
        $user->update(['is_approved' => true]);
        return response()->json(['message' => 'Employer approved successfully']);
    }

    public function rejectEmployer($id)
    {
        $user = User::findOrFail($id);
        if ($user->role_id != 2 || $user->is_approved) {
            return response()->json(['message' => 'User is not pending approval'], 400);
        }
        $user->update([
            'role_id' => 3,
            'is_approved' => true
        ]);
        return response()->json(['message' => 'Employer request rejected. User converted to Job Seeker']);
    }

    public function jobDemandStats()
    {
        $jobStats = Application::select('job_id', DB::raw('COUNT(*) as application_count'))
            ->groupBy('job_id') ->orderByDesc('application_count')->get();

        $mostDemanded = $jobStats->take(3)->map(function ($item) {
            $job = JobListing::find($item->job_id);
            return [
                'title' => $job?->title ?? 'Unknown',
                'count' => $item->application_count,
            ];
        });
        $leastDemanded = $jobStats->sortBy('application_count')->take(3)->map(function ($item) {
            $job = JobListing::find($item->job_id);
            return [
                'title' => $job?->title ?? 'Unknown',
                'count' => $item->application_count,
            ];
        });
        return response()->json([
            'most_demanded' => $mostDemanded->values(),
            'least_demanded' => $leastDemanded->values(),
        ]);
    }

    public function allJobListings()
    {
        $jobs = JobListing::with('employer.user')->latest()->get()->map(function ($job) {
            return [
                'id' => $job->id,
                'title' => $job->title,
                'employer_name' => $job->employer->user->name ?? 'N/A',
                'location' => $job->location,
                'created_at' => $job->created_at->toDateString(),
            ];
        });
        return response()->json($jobs);
    }

    public function deleteJobListing($id)
    {
        $job = JobListing::findOrFail($id);
        $job->delete();

        return response()->json(['message' => 'Job listing deleted successfully']);
    }
    public function userCount()
    {
        $total = User::count();
        return response()->json(['total_users' => $total]);
    }
    public function employerCount()
    {
        $count = User::where('role_id', 2)->count();
        return response()->json(['total_employers' => $count]);
    }

    public function jobSeekerCount()
    {
        $count = User::where('role_id', 3)->count();
        return response()->json(['total_job_seekers' => $count]);
    }

    public function jobListingCount()
    {
        $count = JobListing::count();
        return response()->json(['total_job_listings' => $count]);
    }

    public function acceptedApplicationsCount()
    {
        $count = Application::where('status', 'accepted')->count();
        return response()->json(['accepted_requests' => $count]);
    }

    public function rejectedApplicationsCount()
    {
        $count = Application::where('status', 'rejected')->count();
        return response()->json(['rejected_requests' => $count]);
    }

    public function latestJobListings()
    {
        $jobs = JobListing::latest()
            ->take(5)->get(['id', 'title', 'salary', 'location', 'created_at']);

        return response()->json($jobs);
    }
}
