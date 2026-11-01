"use client";


import { useRouter } from "next/navigation";

export default function EmptyState() {

    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold text-white mb-2">Empty State</h1>
            <p className="text-sm text-slate-500">No books found</p>
            <p className="text-sm text-slate-500 mt-2">try change filter <br /> or search</p>
        </div>
    );
}