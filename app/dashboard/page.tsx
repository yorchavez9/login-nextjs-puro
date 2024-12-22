"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const DashboardPage = () => {
    const [user, setUser] = useState({
        email: '',
        username: ''
    })
    const router = useRouter();

    const getProfile = async () => {
        const response = await axios.get('/api/profile');
        console.log(response);
        setUser(response.data);
    }

    const logout = async () => {
        try {
            await axios.post('/api/logout');
            router.push('/login');
        } catch (error) {
            router.push('/login');
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Dashboard</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-medium text-gray-800">User Profile</h2>
                    <pre className="bg-gray-200 p-4 rounded-md text-sm text-gray-600">{JSON.stringify(user, null, 2)}</pre>
                </div>
                <div className="space-x-4 text-center">
                    <button
                        onClick={getProfile}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Get Profile
                    </button>
                    <button
                        onClick={logout}
                        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
