<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateJobListingRequest;
use App\Http\Requests\UpdateJobListingRequest;
use App\Models\Employer;
use App\Models\JobListing;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class JobListingController extends Controller
{
    public function getEmployerByUser(): JsonResponse
    {
        try {
            $userId = Auth::id();
            $employer = Employer::where('user_id', $userId)->firstOrFail();
            return response()->json([
                'id' => $employer->id,
                'name' => $employer->company_name ?? null,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Employer not found'], 404);
        }
    }

    public function getById($id): JsonResponse
    {
        try {
            $job = JobListing::with('employer')->findOrFail($id);

            if ($job->company_logo) {
                $job->company_logo = config('app.url') . Storage::url($job->company_logo);

            }
            if ($job->documents) {
                $job->documents = config('app.url') . Storage::url($job->documents);
            }

            return response()->json($job);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Job not found'], 404);
        }
    }

    public function getByEmployer($employerId): JsonResponse
    {
        $jobs = JobListing::with('employer')
            ->where('employer_id', $employerId)
            ->orderBy('created_at', 'desc')
            ->get();

        $jobs->transform(function ($job) {
            if ($job->company_logo) {
                $job->company_logo = config('app.url') . Storage::url($job->company_logo);
            }

            if ($job->documents) {
                $job->documents =config('app.url') . Storage::url($job->documents);
            }

            return $job;
        });

        return response()->json($jobs);
    }

    public function create(CreateJobListingRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            if ($request->hasFile('company_logo')) {
                $data['company_logo'] = $request->file('company_logo')->store('logos', 'public');
            }

            if ($request->hasFile('documents')) {
                $data['documents'] = $request->file('documents')->store('documents', 'public');
            }

            $job = JobListing::create($data);
            return response()->json($job, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create job', 'details' => $e->getMessage()], 500);
        }
    }

    public function update(UpdateJobListingRequest $request, $id): JsonResponse
    {
        try {
            $job = JobListing::findOrFail($id);
            $data = $request->validated();

            if ($request->hasFile('company_logo')) {
                $data['company_logo'] = $request->file('company_logo')->store('logos', 'public');
            }

            if ($request->hasFile('documents')) {
                $data['documents'] = $request->file('documents')->store('documents', 'public');
            }

            $job->update($data);
            $job->refresh();
            return response()->json($job);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update job', 'details' => $e->getMessage()], 500);
        }
    }

    public function delete($id): JsonResponse
    {
        try {
            $job = JobListing::findOrFail($id);
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
