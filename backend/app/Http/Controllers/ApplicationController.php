<?php

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
            \App\Models\Notification::create([
                'user_id' => $application->job_seeker_id,
                'message' => 'Your application has been ' . $request->status . '.',
                'type' => 'application_' . $request->status,
                'redirect_url' => '/seeker/applications-status',
                'is_read' => false,
            ]);
        }



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

}

