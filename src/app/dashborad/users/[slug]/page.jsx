"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Shield, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import usersData from "@/data/users";

export default function UserDetailsPage({ params }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const { slug } = resolvedParams;

    const [user, setUser] = useState(null);

    useEffect(() => {
        // Find user by slug or ID
        const foundUser = usersData.find(u => u.slug === slug || u.id === slug || u._id === slug);
        setUser(foundUser);
    }, [slug]);

    if (!user) {
        return (
            <div className="p-12 max-w-xl mx-auto text-center mt-20 bg-white rounded-2xl border border-gray-150 shadow-sm">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-150">
                    <AlertCircle className="w-8 h-8" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">User Not Found</h1>
                <p className="text-sm text-gray-500 mt-2">The user details you are trying to view do not exist or have been moved.</p>
                <button
                    onClick={() => router.back()}
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Go Back to Users</span>
                </button>
            </div>
        );
    }

    const hasAvatarUrl = user.avatar && user.avatar.startsWith("http");
    const initials = user.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "US";
    const bg = user.bg || "from-blue-500 to-indigo-500";

    const formattedDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            {/* Header / Back Link */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Back to Users</span>
                </button>

                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 border border-gray-100 px-3 py-1 rounded-md">
                    User ID: {user.id || user._id}
                </div>
            </div>

            {/* Profile Info Sheet */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">

                {/* Left Column: Avatar & Name Accent */}
                <div className="w-full md:w-[280px] bg-gray-50/50 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100 shrink-0">
                    <div className={`w-32 h-32 rounded-3xl bg-gradient-to-tr ${bg} text-white text-4xl font-extrabold flex items-center justify-center shadow-md overflow-hidden relative border-2 border-white mb-4`}>
                        {hasAvatarUrl ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <span>{user.avatar || initials}</span>
                        )}
                    </div>

                    <h2 className="text-xl font-extrabold text-gray-900 text-center uppercase tracking-tight line-clamp-1">{user.name}</h2>
                    <span className="text-xs font-semibold text-gray-400 mt-0.5 uppercase tracking-wider">{user.role}</span>

                    <span className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${user.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}>
                        {user.status === "active" ? (
                            <>
                                <CheckCircle2 className="w-3.5 h-3.5 animate-pulse" />
                                <span>Active</span>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>Inactive</span>
                            </>
                        )}
                    </span>
                </div>

                {/* Right Column: User details */}
                <div className="flex-1 p-8 space-y-6">
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">User Details</h3>

                        <div className="space-y-4">
                            {/* Email */}
                            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <Mail className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</span>
                                    <span className="text-sm font-semibold text-gray-800">{user.email}</span>
                                </div>
                            </div>

                            {/* Role Spec */}
                            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <Shield className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Assigned Role</span>
                                    <span className="text-sm font-semibold text-gray-800 capitalize">{user.role}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About/Description */}
                    {user.description && (
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Profile Biography
                            </h4>
                            <div className="text-sm text-gray-600 leading-relaxed bg-gray-50/50 p-5 rounded-2xl border border-gray-100/60">
                                {user.description}
                            </div>
                        </div>
                    )}

                    {/* Meta Timestamps */}
                    <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>Created: <strong>{formattedDate(user.createdAt)}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 justify-end">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>Updated: <strong>{formattedDate(user.updatedAt)}</strong></span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
