<?php

namespace App\Http\Controllers;

use App\Models\Employer;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use App\Mail\VerificationCodeMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\JobSeeker;

class AuthController extends Controller
{
    public function getRoles()
    {
        $roles = Role::select('id', 'name')->get();
        return response()->json($roles);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role_id' => 'required|exists:roles,id',
            'company_name' => 'nullable|string',
        ]);

        if ($request->role_id == 1 && empty($request->company_name)) {
            return response()->json([
                'message' => 'Company name is required for employers.'
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
        ]);

        if ($user->role_id == 2) { // job-seeker
            JobSeeker::create([
                'user_id' => $user->id,
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Registered successfully as job seeker.',
                'user' => $user,
                'token' => $token,
            ], 201);

        } elseif ($user->role_id == 1) {
            Employer::create([
                'user_id' => $user->id,
                'company_name' => $request->company_name,
                'is_approved' => false,
            ]);

            return response()->json([
                'message' => 'Your registration request has been sent to the admin. Please wait for approval.',
                'user' => $user,
            ], 201);
        }

        // fallback error
        return response()->json([
            'message' => 'Invalid role.',
        ], 400);
    }

    public function verifyCode(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'verification_code' => 'required|string',
        ]);

        $user = User::find($request->user_id);

        if ($user->verification_code === $request->verification_code) {
            $user->email_verified_at = now();
            $user->verification_code = null;
            $user->save();

            return response()->json(['message' => 'Email verified successfully']);
        } else {
            return response()->json(['message' => 'Invalid verification code'], 400);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            if ($user->role_id == 1) {
                if (!$user->is_approved) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Your account is waiting for admin approval.',
                    ], 403);
                }
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'Login successful',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user->load('role'),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error during login',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            return response()->json(['message' => 'Email not found'], 404);
        }

        $verification_code = rand(100000, 999999);
        $user->verification_code = $verification_code;
        $user->save();


        Mail::to($user->email)->send(new VerificationCodeMail($verification_code));

        return response()->json(['message' => 'Verification code sent to your email']);
    }

    public function verifyForgotCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'verification_code' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            return response()->json(['message' => 'Email not found'], 404);
        }

        if ($user->verification_code === $request->verification_code) {
            return response()->json(['message' => 'Code verified']);
        } else {
            return response()->json(['message' => 'Invalid verification code'], 422);
        }
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            return response()->json(['message' => 'Email not found'], 404);
        }

        $user->password = Hash::make($request->password);
        $user->verification_code = null;
        $user->save();

        return response()->json(['message' => 'Password updated successfully']);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Logged out successfully',
        ]);
    }

    public function userProfile(Request $request)
    {
        return response()->json([
            'status' => true,
            'message' => 'User profile',
            'data' => $request->user()->load('role'),
        ]);
    }

    public function updateCategory(Request $request)
    {
        $request->validate([
            'category' => 'required|string|max:255',
        ]);

        $user = auth()->user();

        if (! $user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $jobSeeker = $user->jobSeeker()->firstOrCreate([]);

        $jobSeeker->category = $request->category;
        $jobSeeker->save();

        return response()->json([
            'message' => 'Category updated successfully',
            'category' => $jobSeeker->category,
        ], 200);
    }

}
