import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { LogOut } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

export default function Header() {
    // Get user data from localStorage
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const navigate = useNavigate();

   

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <Toaster />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link to="/">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">
                                EarnScop
                            </h1>
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <HashLink  to="/#courses" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Courses
                        </HashLink>
                        <HashLink to="/#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                            How It Works
                        </HashLink>
                         <HashLink to="/#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Success Stories
                        </HashLink>
                    </div>
                    <div className="flex space-x-4 items-center">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/dashboard">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-red-500 flex items-center justify-center text-white font-semibold">
                                            {(currentUser.name || currentUser.firstName || 'U')[0].toUpperCase()}
                                        </div>
                                        <span className="text-gray-700 font-medium">
                                            {currentUser.name || currentUser.firstName || 'User'}
                                        </span>
                                    </div>
                                </Link>
                               
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}