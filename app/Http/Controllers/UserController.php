<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|regex:/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/|unique:users,phone',
            'description' => 'nullable|string',
            'role_id' => 'required|exists:roles,id',
            'profile_image' => 'nullable|mimes:jpg,jpeg,png|max:2048',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422); // Return validation errors as JSON with 422 status
        }

        if ($request->hasFile('profile_image')) {
            $fileName = time() . '.' . $request->profile_image->extension();
            $request->profile_image->move(public_path('uploads'), $fileName);
        } else {
            $fileName = null;
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'description' => $request->description,
            'role_id' => $request->role_id,
            'profile_image' => $fileName,
            'password' => bcrypt($request->password),
        ]);
        return response()->json(User::with('role')->find($user->id));
    }

    public function index()
    {
        $users = User::with('role')->get();
        return response()->json($users);
    }

}
