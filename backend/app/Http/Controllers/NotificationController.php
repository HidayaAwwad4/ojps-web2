<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'notifications' => $user->notifications()->latest()->get()
        ]);
    }

    /**
     * Get unread notifications
     */
    public function unread(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'notifications' => $user->notifications()->where('read', false)->latest()->get()
        ]);
    }

    /**
     * Mark a notification as read
     */
    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->update(['read' => true]);

        return response()->json(['message' => 'Notification marked as read.']);
    }

    /**
     * Create notification for seeker when application is accepted/rejected
     */
    public function notifySeekerApplicationStatus($seekerId, $status)
    {
        $message = $status === 'accepted'
            ? 'Your application has been accepted. Please contact the company for an interview.'
            : 'Your application has been rejected. Better luck next time.';

        Notification::create([
            'user_id' => $seekerId,
            'message' => $message,
            'type' => 'application_status',
            'read' => false
        ]);

        return response()->json(['message' => 'Notification sent to seeker.']);
    }

    /**
     * Create notification for employer when seeker applies or favorites a job
     */
    public function notifyEmployerActivity($employerId, $type)
    {
        $message = '';

        if ($type === 'applied') {
            $message = 'A seeker has applied to one of your job postings.';
        } elseif ($type === 'favorited') {
            $message = 'A seeker has added your job to their favorites.';
        }

        Notification::create([
            'user_id' => $employerId,
            'message' => $message,
            'type' => 'seeker_activity',
            'read' => false
        ]);

        return response()->json(['message' => 'Notification sent to employer.']);
    }

    public function getUserNotifications(Request $request)
    {
        $notifications = Notification::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notifications);
    }

}
