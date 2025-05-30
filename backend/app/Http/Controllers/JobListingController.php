<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
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

            if ($job->company_logo) {
                $job->company_logo = config('app.url') . Storage::url($job->company_logo);
            }

            if ($job->documents) {
                $job->documents = config('app.url') . Storage::url($job->documents);
            }

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
                if ($job->company_logo) {
                    Storage::disk('public')->delete($job->company_logo);
                }
                $data['company_logo'] = $request->file('company_logo')->store('logos', 'public');
            } else {
                $data['company_logo'] = $job->company_logo;
            }
            if ($request->hasFile('documents')) {
                if ($job->documents) {
                    Storage::disk('public')->delete($job->documents);
                }
                $data['documents'] = $request->file('documents')->store('documents', 'public');
            } else {
                $data['documents'] = $job->documents;
            }

            $job->update($data);
            $job->refresh();

            // ✅ إرسال الرابط الكامل للصور والمستندات
            $job->company_logo = asset('storage/' . $job->company_logo);
            $job->documents = asset('storage/' . $job->documents);

            return response()->json($job);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update job',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus(Request $request, $id): JsonResponse
    {
        try {
            $job = JobListing::findOrFail($id);
            $request->validate([
                'isOpened' => 'required|boolean',
            ]);
            $job->isOpened = $request->input('isOpened');
            $job->save();
            return response()->json([
                'message' => 'Status updated successfully',
                'job' => $job
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update status',
                'details' => $e->getMessage()
            ], 500);
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
