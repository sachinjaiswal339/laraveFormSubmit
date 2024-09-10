<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class HomeController extends Controller
{
    public function index()
    {
        $roles = Role::all();  // Fetch all roles from the database
        return view('home', compact('roles'));
    }
}
