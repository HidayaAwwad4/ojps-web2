<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\JobSeeker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{

    private function decodeJsonField($field)
    {
        Log::info('Decoding JSON field:', ['input' => $field, 'type' => gettype($field)]);

        if (is_string($field) && !empty($field)) {
            try {
                // First try to decode once
                $decoded = json_decode($field, true);

                // If the decoded result is a string and looks like JSON, try decoding again
                // This handles double-encoded JSON
                if (is_string($decoded) && !empty($decoded) &&
                    (str_starts_with(trim($decoded), '[') || str_starts_with(trim($decoded), '{'))) {
                    $decoded = json_decode($decoded, true);
                }

                Log::info('JSON decode result:', [
                    'decoded' => $decoded,
                    'json_error' => json_last_error_msg(),
                    'is_array' => is_array($decoded)
                ]);
                return $decoded !== null && is_array($decoded) ? $decoded : [];
            } catch (\Exception $e) {
                Log::error('Failed to decode JSON field: ' . $e->getMessage());
                return [];
            }
        }

        Log::info('Field is not a non-empty string, returning empty array');
        return [];
    }

    public function getProfile(Request $request)
    {
        try {
            $user = $request->user()->load('role');

            Log::info('=== GET PROFILE REQUEST START ===');
            Log::info('User found:', ['user_id' => $user->id, 'role' => $user->role->name ?? 'unknown']);

            // Add profile picture URL to user data
            $userData = $user->toArray();
            if ($user->profile_picture) {
                $userData['profile_picture_url'] = url('storage/' . $user->profile_picture);
            } else {
                $userData['profile_picture_url'] = null;
            }

            // Basic profile data with empty arrays by default
            $profile = [
                'user' => $userData,
                'experience' => [],
                'education' => [],
                'skills' => [],
                'resume_path' => null
            ];

            // Handle different user roles
            if ($user->role) {
                switch ($user->role->name) {
                    case 'job-seeker':
                        // Get the raw data directly from the database to avoid accessor interference
                        $rawJobSeeker = DB::table('job_seekers')->where('user_id', $user->id)->first();

                        if ($rawJobSeeker) {
                            Log::info('JobSeeker found:', ['job_seeker_id' => $rawJobSeeker->id]);

                            // Decode experience, education, and skills
                            $profile['experience'] = $this->decodeJsonField($rawJobSeeker->experience);
                            $profile['education'] = $this->decodeJsonField($rawJobSeeker->education);
                            $profile['skills'] = $this->decodeJsonField($rawJobSeeker->skills);

                            // Add resume path
                            if ($rawJobSeeker->resume_path) {
                                $profile['resume_path'] = url('storage/' . $rawJobSeeker->resume_path);
                            }
                        }
                        break;

                    case 'employer':
                        Log::info('User is an Employer');
                        // Employer-specific data can be added here if needed
                        break;

                    case 'admin':

                    case 'Employer':
                        Log::info('User is an Employer');
                        // Employer-specific data can be added here if needed
                        break;

                    case 'Admin':
                        Log::info('User is an Admin');
                        // Admin-specific data can be added here if needed
                        break;

                    default:
                        Log::info('Unknown user role');
                        break;
                }
            }

            Log::info('Final profile data being sent:', $profile);
            Log::info('=== GET PROFILE REQUEST END ===');

            return response()->json([
                'status' => true,
                'message' => 'Profile retrieved successfully',
                'data' => $profile
            ]);

        } catch (\Exception $e) {
            Log::error('Error in getProfile: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Error retrieving profile: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            // Log the incoming request data
            Log::info('=== UPDATE PROFILE REQUEST START ===');
            Log::info('Request method: ' . $request->method());
            Log::info('Request URL: ' . $request->url());
            Log::info('All request data:', $request->all());
            Log::info('Has experience: ' . ($request->has('experience') ? 'YES' : 'NO'));
            Log::info('Has education: ' . ($request->has('education') ? 'YES' : 'NO'));
            Log::info('Has skills: ' . ($request->has('skills') ? 'YES' : 'NO'));

            if ($request->has('experience')) {
                Log::info('Experience data received:', ['experience' => $request->experience]);
            }
            if ($request->has('education')) {
                Log::info('Education data received:', ['education' => $request->education]);
            }
            if ($request->has('skills')) {
                Log::info('Skills data received:', ['skills' => $request->skills]);
            }

            // Get the authenticated user
            $user = $request->user();
            Log::info('User found:', ['user_id' => $user->id, 'role' => $user->role->name ?? 'unknown']);

            // Update basic user data
            if ($request->has('name')) {
                $user->name = $request->name;
            }
            if ($request->has('location')) {
                $user->location = $request->location;
            }
            if ($request->has('summary')) {
                $user->summary = $request->summary;
            }

            // Save user changes
            $user->save();
            Log::info('User data saved successfully');

            // Handle JobSeeker data if user is a job-seeker
            if ($user->role && $user->role->name === 'job-seeker') {
                Log::info('Processing job-seeker data...');

                // Get the job seeker record directly from DB to avoid model accessors/mutators
                $jobSeekerId = DB::table('job_seekers')->where('user_id', $user->id)->value('id');

                if (!$jobSeekerId) {
                    Log::error('JobSeeker record not found for user:', ['user_id' => $user->id]);
                    return response()->json([
                        'status' => false,
                        'message' => 'JobSeeker record not found'
                    ], 404);
                }

                Log::info('JobSeeker found:', ['job_seeker_id' => $jobSeekerId]);

                // Prepare updates
                $updates = [];

                if ($request->has('experience')) {
                    $encoded = json_encode($request->experience);
                    Log::info('Encoding experience:', [
                        'original' => $request->experience,
                        'encoded' => $encoded,
                        'json_error' => json_last_error_msg()
                    ]);
                    $updates['experience'] = $encoded;
                }

                if ($request->has('education')) {
                    $encoded = json_encode($request->education);
                    Log::info('Encoding education:', [
                        'original' => $request->education,
                        'encoded' => $encoded,
                        'json_error' => json_last_error_msg()
                    ]);
                    $updates['education'] = $encoded;
                }

                if ($request->has('skills')) {
                    $encoded = json_encode($request->skills);
                    Log::info('Encoding skills:', [
                        'original' => $request->skills,
                        'encoded' => $encoded,
                        'json_error' => json_last_error_msg()
                    ]);
                    $updates['skills'] = $encoded;
                }

                // Log data before save
                Log::info('JobSeeker data prepared for save:', $updates);

                // Update using DB query builder to bypass model accessors/mutators
                $updateResult = DB::table('job_seekers')
                    ->where('id', $jobSeekerId)
                    ->update($updates);

                Log::info('JobSeeker update result:', ['success' => $updateResult]);

                // Verify the save by checking the database directly
                $rawData = DB::table('job_seekers')->where('id', $jobSeekerId)->first();
                Log::info('Database verification after save:', [
                    'experience' => $rawData->experience ?? 'null',
                    'education' => $rawData->education ?? 'null',
                    'skills' => $rawData->skills ?? 'null'
                ]);
            }

            Log::info('=== UPDATE PROFILE REQUEST END ===');

            return response()->json([
                'status' => true,
                'message' => 'Profile updated successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error updating profile:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Error updating profile: ' . $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }

    // Other methods remain unchanged...
    public function updateBasicInfo(Request $request) {
        $user = Auth::user();
        $jobSeeker = $user->jobSeeker;

        if ($request->has('name')) $jobSeeker->name = $request->name;
        if ($request->has('email')) $jobSeeker->email = $request->email;
        if ($request->has('summary')) $jobSeeker->summary = $request->summary;

        $jobSeeker->save();

        return response()->json(['message' => 'Basic info updated successfully']);
    }

    public function updateResumeInfo(Request $request) {
        $user = Auth::user();
        $jobSeeker = $user->jobSeeker;

        if ($request->has('experience')) $jobSeeker->experience = json_encode($request->experience);
        if ($request->has('education')) $jobSeeker->education = json_encode($request->education);
        if ($request->has('skills')) $jobSeeker->skills = json_encode($request->skills);

        $jobSeeker->save();

        return response()->json(['message' => 'Resume info updated successfully']);
    }

    public function uploadProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|max:2048'
        ]);

        $user = $request->user();

        if ($user->profile_picture) {
            Storage::disk('public')->delete($user->profile_picture);
        }

        $path = $request->file('profile_picture')->store('profile_pictures', 'public');
        $user->profile_picture = $path;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Profile picture uploaded successfully',
            'data' => [
                'profile_picture_url' => url('storage/' . $path)
            ]
        ]);
    }

    public function uploadResume(Request $request)
    {
        $request->validate([
            'resume' => 'required|file|mimes:pdf,doc,docx|max:5120'
        ]);

        $user = $request->user();

        $jobSeeker = JobSeeker::where('user_id', $user->id)->first();

        if ($jobSeeker->resume_path) {
            Storage::disk('public')->delete($jobSeeker->resume_path);
        }

        $path = $request->file('resume')->store('resumes', 'public');
        $jobSeeker->resume_path = $path;
        $jobSeeker->save();

        return response()->json([
            'status' => true,
            'message' => 'Resume uploaded successfully',
            'data' => [
                'resume_url' => url('storage/' . $path)
            ]
        ]);
    }

    public function getJobSeekerProfile($id)
    {
        try {
            Log::info('=== GET JOB SEEKER PROFILE START ===');
            Log::info('Job seeker ID:', ['id' => $id]);

            // Use DB query builder directly to avoid model accessors/mutators
            $jobSeeker = DB::table('job_seekers')->where('id', $id)->first();

            if (!$jobSeeker) {
                Log::error('Job seeker not found:', ['id' => $id]);
                return response()->json([
                    'status' => false,
                    'message' => 'Job seeker not found'
                ], 404);
            }

            Log::info('Job seeker found:', ['job_seeker_id' => $jobSeeker->id]);

            // Get user data
            $user = DB::table('users')->where('id', $jobSeeker->user_id)->first();

            if (!$user) {
                Log::error('User not found for job seeker:', ['job_seeker_id' => $jobSeeker->id, 'user_id' => $jobSeeker->user_id]);
                return response()->json([
                    'status' => false,
                    'message' => 'User not found for this job seeker'
                ], 404);
            }

            Log::info('User found:', ['user_id' => $user->id]);

            // Add profile picture URL to user data
            $userData = (array) $user;
            if ($user->profile_picture) {
                $userData['profile_picture_url'] = url('storage/' . $user->profile_picture);
            } else {
                $userData['profile_picture_url'] = null;
            }

            // Decode JSON fields
            $experience = $this->decodeJsonField($jobSeeker->experience);
            $education = $this->decodeJsonField($jobSeeker->education);
            $skills = $this->decodeJsonField($jobSeeker->skills);

            Log::info('Decoded profile data:', [
                'experience' => $experience,
                'education' => $education,
                'skills' => $skills
            ]);

            $responseData = [
                'status' => true,
                'message' => 'Job seeker profile retrieved successfully',
                'data' => [
                    'user' => $userData,
                    'experience' => $experience,
                    'education' => $education,
                    'skills' => $skills,
                    'resume_path' => $jobSeeker->resume_path ? url('storage/' . $jobSeeker->resume_path) : null
                ]
            ];

            Log::info('Response data prepared:', $responseData);
            Log::info('=== GET JOB SEEKER PROFILE END ===');

            return response()->json($responseData);

        } catch (\Exception $e) {
            Log::error('Error in getJobSeekerProfile:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Error retrieving job seeker profile: ' . $e->getMessage()
            ], 500);
        }
    }

    public function downloadResume($id)
    {
        $jobSeeker = JobSeeker::findOrFail($id);

        if (!$jobSeeker->resume_path) {
            return response()->json([
                'status' => false,
                'message' => 'No resume available for this job seeker'
            ], 404);
        }

        return Storage::disk('public')->download($jobSeeker->resume_path);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The current password is incorrect.'],
            ]);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Password updated successfully'
        ]);
    }
    

    public function getJobSeekerIdByUser($user_id)
    {
        $jobSeeker = JobSeeker::where('user_id', $user_id)->first();

        if ($jobSeeker) {
            return response()->json([
                'job_seeker_id' => $jobSeeker->id,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Job seeker not found',
            ], 404);
        }
    }
}
