'use client'

import { Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import LoginModal from "./LoginModal";
import { useState } from "react";

const Header = () => {
    const router = useRouter();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    return (
        <div>
            <header className="border-b">
                <div className="max-w-7xl bg-black opacity-90 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo và tên */}
                        <div className="flex items-center space-x-2">
                            <button
                                className="logo-app h-8 w-8"
                                onClick={() => router.push("/")}>
                            </button>
                            <span className="text-xl text-white font-bold">LET'S READ</span>
                        </div>

                        {/* Search và User */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-gray-50 rounded-full">
                                <Search className="h-5 w-5 text-teal-400"
                                    onClick={() => router.push("/admin")}></Search>
                            </button>
                            <button className="p-2 hover:bg-gray-50 rounded-full">
                                <User
                                    className="h-5 w-5 text-teal-400"
                                    onClick={() => setIsLoginModalOpen(true)}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}

            />
        </div>
    )
};

export default Header;