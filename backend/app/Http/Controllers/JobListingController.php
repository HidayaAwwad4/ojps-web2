<?php

namespace App\Http\Controllers;
use App\Http\Requests\UpdateJobListingRequest;
use App\Models\JobListing;
use App\Http\Requests\CreateJobListingRequest;
use Illuminate\Http\JsonResponse;

class JobListingController extends Controller
{
    public function getAll(): JsonResponse
    {
        return response()->json(JobListing::all());
    }

    public function getById($id): JsonResponse
    {
        $job = JobListing::findOrFail($id);
        return response()->json($job);
    }

    public function getByEmployer($employerId): JsonResponse
    {
        $jobs = JobListing::where('employer_id', $employerId)->get();
        return response()->json($jobs);
    }

    public function create(CreateJobListingRequest $request): JsonResponse
    {
        $job = JobListing::create($request->validated());
        return response()->json($job, 201);
    }

    public function update(UpdateJobListingRequest $request, $id): JsonResponse
    {
        $job = JobListing::findOrFail($id);
        $job->update($request->validated());
        return response()->json($job);
    }

    public function delete($id): JsonResponse
    {
        $job = JobListing::findOrFail($id);
        $job->delete();
        return response()->json(['message' => 'Job deleted successfully']);
    }
}
