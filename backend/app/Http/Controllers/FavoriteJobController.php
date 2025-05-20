<?php

namespace App\Http\Controllers;

use App\Models\FavoriteJob;
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
            'job_seeker_id' => 'required|exists:job_seekers,id',
            'job_id' => 'required|exists:job_listings,id',
        ]);

        $favorite = FavoriteJob::create($request->only('job_seeker_id', 'job_id'));
        return response()->json($favorite, 201);
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
