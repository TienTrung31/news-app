'use client'
import React, { useEffect, useState } from 'react';
import { Layout, PenLine, LogOut } from 'lucide-react';
import Link from 'next/link';
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        // Lấy user info từ localStorage khi component mount
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            const { username } = JSON.parse(userInfo);
            setUsername(username);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div className="h-[650px] flex max-w-7xl mx-auto">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white">
                <div className="p-4">
                    <div className="flex items-center space-x-2">
                        <Layout className="h-6 w-6" />
                        <span className="text-xl font-bold">Admin Panel</span>
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                        Welcome back, {username}
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-8">
                    <Link
                        href="/admin/create-article"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-800"
                    >
                        <PenLine className="h-5 w-5" />
                        <span>Create Post</span>
                    </Link>
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-4 w-64 px-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white w-full px-4 py-2 rounded-md hover:bg-gray-800"
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100">
                <div className="p-6 h-full overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}