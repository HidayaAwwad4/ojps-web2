<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateJobListingRequest;
use App\Http\Requests\UpdateJobListingRequest;
use App\Models\JobListing;
use Illuminate\Http\JsonResponse;
//use Illuminate\Support\Facades\Auth;

class JobListingController extends Controller
{
    public function getById($id): JsonResponse
    {
        try {
            $job = JobListing::findOrFail($id);
            return response()->json($job);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Job not found'], 404);
        }
    }

    public function getByEmployer($employerId): JsonResponse
    {
        $jobs = JobListing::where('employer_id', $employerId)->get();
        return response()->json($jobs);
    }

    public function create(CreateJobListingRequest $request): JsonResponse
    {
        try {
            $job = JobListing::create($request->validated());
            return response()->json($job, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create job'], 500);
        }
    }

    public function update(UpdateJobListingRequest $request, $id): JsonResponse
    {
        try {
            $job = JobListing::findOrFail($id);

            /*if ($job->employer_id !== Auth::id()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }*/

            $job->update($request->validated());
            return response()->json($job);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update job'], 500);
        }
    }

    public function delete($id): JsonResponse
    {
        try {
            $job = JobListing::findOrFail($id);

            /*if ($job->employer_id !== Auth::id()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }*/

            $job->delete();
            return response()->json(['message' => 'Job deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete job'], 500);
        }
    }

    public function getJobFormOptions(): JsonResponse
    {
        return response()->json([
            'experienceOptions' => JobListing::EXPERIENCE_OPTIONS,
            'employmentOptions' => JobListing::EMPLOYMENT_OPTIONS,
            'categoryOptions' => JobListing::CATEGORY_OPTIONS,
        ]);
    }
}
