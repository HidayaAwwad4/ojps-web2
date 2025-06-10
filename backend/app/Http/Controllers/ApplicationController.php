<?php
/*
namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index()
    {
        $applications = Application::with(['job', 'jobSeeker'])->get();
        return response()->json($applications);
    }

    public function show($id)
    {
        $application = Application::with(['job', 'jobSeeker'])->find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }
        return response()->json($application);
    }

    public function store(Request $request)
    {
        $request->validate([
            'job_id' => 'required|integer',
            'job_seeker_id' => 'required|integer',
            'cover_letter' => 'nullable|string',
            'status' => 'nullable|string',
            'appliedAt' => 'required|date',
        ]);

        $application = Application::create([
            'job_id' => $request->job_id,
            'job_seeker_id' => $request->job_seeker_id,
            'cover_letter' => $request->cover_letter,
            'status' => $request->status ?? 'pending',
            'appliedAt' => $request->appliedAt,
        ]);

        $job = \App\Models\JobListing::find($request->job_id);

        if ($job && $job->employer_id) {
            \App\Models\Notification::create([
                'user_id' => $job->employer_id,
                'message' => 'A job seeker has applied to your job: ' . $job->title,
                'type' => 'application_received',
                'redirect_url' => '/employer/job-applications',
                'is_read' => false,
            ]);
        }

        return response()->json($application, 201);

    }

    public function update(Request $request, $id)
    {
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $request->validate([
            'cover_letter' => 'nullable|string',
            'status' => 'nullable|string',
            'appliedAt' => 'nullable|date',
        ]);

        $application->update($request->only(['cover_letter', 'status', 'appliedAt']));

        if ($request->has('status') && in_array($request->status, ['accepted', 'rejected'])) {
            $userId = $application->jobSeeker->user->id ?? null;

            if ($userId) {
                \App\Models\Notification::create([
                    'user_id' => $userId,
                    'message' => 'Your application has been ' . $request->status . '.',
                    'type' => 'application_' . $request->status,
                    'redirect_url' => '/seeker/applications-status',
                    'is_read' => false,
                ]);
            }
        }


        $application->load('jobSeeker.user');

        return response()->json($application);
    }

    public function destroy($id)
    {
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $application->delete();

        return response()->json(['message' => 'Application deleted successfully']);
    }

    public function getApplicantsByJobId($jobId)
    {
        $applications = Application::with(['jobSeeker.user'])
            ->where('job_id', $jobId)
            ->get();

        if ($applications->isEmpty()) {
            return response()->json(['message' => 'No applications found for this job'], 404);
        }


        return response()->json($applications);
    }

    public function getApplicationById($applicationId)
    {
        $application = Application::with(['jobSeeker.user'])
            ->where('id', $applicationId)
            ->first();

        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        return response()->json($application);
    }

}
*/

namespace App\Http\Controllers;
use App\Models\Application;
use App\Models\JobListing;
use App\Models\JobSeeker;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{
    public function index()
    {
        $applications = Application::with(['job', 'jobSeeker'])->get();
        return response()->json($applications);
    }

    public function show($id)
    {
        $application = Application::with(['job', 'jobSeeker'])->find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }
        return response()->json($application);
    }

    public function submit(Request $request)
    {
        $request->validate([
            'job_id' => 'required|exists:job_listings,id',
            'cover_letter' => 'required|string',
            'cv_file' => 'nullable|file|mimes:pdf|max:2048',
        ]);

        $user = Auth::user();
        $jobSeeker = JobSeeker::where('user_id', $user->id)->first();

        if (!$jobSeeker) {
            return response()->json(['error' => 'Job seeker not found'], 404);
        }
        if ($request->hasFile('cv_file')) {
            if ($jobSeeker->resume_path) {
                Storage::disk('public')->delete($jobSeeker->resume_path);
            }
            $path = $request->file('cv_file')->store('cvs', 'public');
            $jobSeeker->resume_path = $path;
            $jobSeeker->save();
        }
        $application = new Application();
        $application->job_id = $request->job_id;
        $application->job_seeker_id = $jobSeeker->id;
        $application->cover_letter = $request->cover_letter;
        $application->status = 'pending';
        $application->appliedAt = now();
        $application->save();

        $job = JobListing::find($request->job_id);
        if ($job && $job->employer_id) {
            Notification::create([
                'user_id' => $job->employer_id,
                'message' => 'A job seeker has applied to your job: ' . $job->title,
                'type' => 'application_received',
                'redirect_url' => '/employer/job-applications',
                'is_read' => false,
            ]);
        }

        return response()->json(['message' => 'Application submitted successfully']);
    }

    public function update(Request $request, $id)
    {
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $request->validate([
            'cover_letter' => 'nullable|string',
            'status' => 'nullable|string',
            'appliedAt' => 'nullable|date',
        ]);

        $application->update($request->only(['cover_letter', 'status', 'appliedAt']));

        if ($request->has('status') && in_array($request->status, ['accepted', 'rejected'])) {
            $userId = $application->jobSeeker->user->id ?? null;

            if ($userId) {
                \App\Models\Notification::create([
                    'user_id' => $userId,
                    'message' => 'Your application has been ' . $request->status . '.',
                    'type' => 'application_' . $request->status,
                    'redirect_url' => '/seeker/applications-status',
                    'is_read' => false,
                ]);
            }
        }


        $application->load('jobSeeker.user');

        return response()->json($application);
    }

    public function destroy($id)
    {
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $application->delete();

        return response()->json(['message' => 'Application deleted successfully']);
    }

    public function getApplicantsByJobId($jobId)
    {
        $applications = Application::with(['jobSeeker.user'])
            ->where('job_id', $jobId)
            ->get();

        if ($applications->isEmpty()) {
            return response()->json(['message' => 'No applications found for this job'], 404);
        }

        return response()->json($applications);
    }

    public function getApplicationById($applicationId)
    {
        $application = Application::with(['jobSeeker.user'])
            ->where('id', $applicationId)
            ->first();

        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        return response()->json($application);
    }

    public function getApplicationsByJobSeekerId($jobSeekerId)
    {
        $user = auth()->user();

        if ($user->role->name !== 'admin' && $user->id != $jobSeekerId) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $applications = Application::with(['job', 'jobSeeker'])
            ->where('job_seeker_id', $jobSeekerId)
            ->get();

        return response()->json($applications);
    }

    public function getUserCV()
    {
        $user = Auth::user();
        $jobSeeker = JobSeeker::where('user_id', $user->id)->first();

        if (!$jobSeeker) {
            return response()->json(['cvFileName' => null]);
        }

        $fileName = $jobSeeker->resume_path ? basename($jobSeeker->resume_path) : null;
        return response()->json(['cvFileName' => $fileName]);
    }

}
