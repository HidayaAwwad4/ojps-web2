<?php

namespace App\Http\Controllers;

use App\Models\FavoriteJob;
use App\Models\JobListing;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FavoriteJobController extends Controller
{
    public function index(): JsonResponse
    {
        $favorites = FavoriteJob::all();
        return response()->json($favorites);
    }
public function store(Request $request): JsonResponse
{
    $request->validate([
        'job_id' => 'required|exists:job_listings,id',
    ]);

    $user = auth()->user();
    $jobSeeker = $user->jobSeeker;

    if (!$jobSeeker) {
        return response()->json(['message' => 'Job seeker not found'], 404);
    }

    $existing = FavoriteJob::where('job_seeker_id', $jobSeeker->id)
                           ->where('job_id', $request->job_id)
                           ->first();

    if ($existing) {
        return response()->json(['message' => 'Already saved'], 200);
    }

    $favorite = FavoriteJob::create([
        'job_seeker_id' => $jobSeeker->id,
        'job_id' => $request->job_id,
    ]);

    return response()->json($favorite, 201);
}

public function destroyByJobId($jobId): JsonResponse
{
    $user = auth()->user();
    $jobSeeker = $user->jobSeeker;

    if (!$jobSeeker) {
        return response()->json(['message' => 'Job seeker not found'], 404);
    }

    $favorite = FavoriteJob::where('job_seeker_id', $jobSeeker->id)
                           ->where('job_id', $jobId)
                           ->first();

    if ($favorite) {
        $favorite->delete();
        return response()->json(['message' => 'Favorite deleted']);
    }

    return response()->json(['message' => 'Favorite not found'], 404);
}

public function getByAuthenticatedSeeker(): JsonResponse
{
    $jobSeeker = auth()->user()->jobSeeker;
    $favorites = FavoriteJob::with('job')->where('job_seeker_id', $jobSeeker->id)->get();
    return response()->json($favorites);
}

    public function destroy($id): JsonResponse
    {
        $favorite = FavoriteJob::findOrFail($id);
        $favorite->delete();
        return response()->json(['message' => 'Favorite job deleted successfully']);
    }
    public function getByJobSeeker($jobSeekerId): JsonResponse
    {
        $favorites = FavoriteJob::where('job_seeker_id', $jobSeekerId)->get();
        return response()->json($favorites);
    }

}
