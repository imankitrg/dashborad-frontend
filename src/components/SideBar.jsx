"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Users,
    User,
    Layers,
    FileText,
    FileCode,
    FileBox,
    LogOut
} from "lucide-react";

export default function SideBar() {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashborad",
            icon: LayoutDashboard
        },
        {
            name: "Users",
            path: "/dashborad/users",
            icon: Users
        },
        {
            name: "Profile",
            path: "/dashborad/profile",
            icon: User
        },
        {
            name: "books",
            path: "/dashborad/books",
            icon: Layers
        },
        {
            name: "Temp 1",
            path: "/dashborad/temp1",
            icon: FileText
        },
        {
            name: "Temp 2",
            path: "/dashborad/temp2",
            icon: FileCode
        },
        {
            name: "Temp 3",
            path: "/dashborad/temp3",
            icon: FileBox
        }
    ];

    return (
        <div className="w-64 h-screen bg-slate-950 text-slate-300 flex flex-col justify-between border-r border-slate-900 shrink-0 select-none">
            {/* Header / Logo */}
            <div>
                <div className="flex items-center gap-2.5 px-6 py-5 border-b border-slate-900/60">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-500/20">
                        AG
                    </div>
                    <div>
                        <h2 className="font-bold text-white text-base tracking-tight leading-none">Ankit's</h2>
                        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Dashboard Panel</span>
                    </div>
                </div>
                {/* Navigation Items */}
                <div className="px-3 py-4 space-y-1">
                    <div className="px-3 mb-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Menu</span>
                    </div>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        const IconComponent = item.icon;
                        return (
                            <motion.button
                                key={item.name}
                                onClick={() => router.push(item.path)}
                                whileHover={{ x: 1 }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 group z-10 ${isActive
                                    ? "text-white"
                                    : "hover:text-white text-slate-400"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavBg"
                                        className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-lg shadow-blue-600/10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-white"} transition-colors`}>
                                    <IconComponent className="w-5 h-5" />
                                </span>
                                <span>{item.name}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-slate-900/60 bg-slate-950/40">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                            AG
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-white text-sm leading-tight">Ankit Gupta</span>
                            <span className="text-xs text-slate-500">Administrator</span>
                        </div>
                    </div>
                </div>
                <motion.button
                    onClick={() => router.push("/login")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-slate-900 text-sm font-medium text-slate-400 hover:text-white hover:bg-rose-600 hover:border-rose-600 transition-all duration-200"
                >
                    <LogOut className="w-4.5 h-4.5" />
                    <span>Sign Out</span>
                </motion.button>
            </div>
        </div>
    );
}