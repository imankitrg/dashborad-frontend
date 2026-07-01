"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchComponent from "@/components/ui/searchComponent";
import PaginationComponent from "@/components/ui/paginationComponent";
import SortComponent from "@/components/ui/sortComponent";
import FilterComponent from "@/components/ui/filterComponent";
import TableComponent from "@/components/ui/tableComponent";
import usersData from "@/data/users";

const ITEMS_PER_PAGE = 5;

// Fallback users list if usersData is not populated
const MOCK_USERS_FALLBACK = [
    { id: 1, name: "Alice Johnson", email: "alice.j@example.com", role: "admin", status: "active", avatar: "AJ", bg: "from-blue-500 to-indigo-500", slug: "alice-johnson" },
    { id: 2, name: "Bob Smith", email: "bob.smith@example.com", role: "editor", status: "active", avatar: "BS", bg: "from-purple-500 to-pink-500", slug: "bob-smith" },
    { id: 3, name: "Charlie Brown", email: "charlie.b@example.com", role: "viewer", status: "inactive", avatar: "CB", bg: "from-gray-400 to-gray-500", slug: "charlie-brown" },
];

export default function Users() {
    const router = useRouter();
    const [users] = useState(usersData || MOCK_USERS_FALLBACK);

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [filterStatus, setFilterStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Helpers
    const getInitials = (name = "") => {
        if (!name) return "US";
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    // 1. Filtering
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            (user.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.email || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "all" || user.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // 2. Sorting
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        let valueA = (a[sortBy] || "").toLowerCase();
        let valueB = (b[sortBy] || "").toLowerCase();

        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    // 3. Pagination
    const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);
    const activePage = Math.min(currentPage, Math.max(1, totalPages));

    const paginatedUsers = sortedUsers.slice(
        (activePage - 1) * ITEMS_PER_PAGE,
        activePage * ITEMS_PER_PAGE
    );

    const handleSortChange = (field, order) => {
        setSortBy(field);
        setSortOrder(order);
        setCurrentPage(1);
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
        setCurrentPage(1);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const columns = [
        {
            key: "name",
            label: "User",
            render: (value, user) => {
                const initials = getInitials(user.name);
                const hasAvatarUrl = user.avatar && user.avatar.startsWith("http");
                const bg = user.bg || "from-blue-500 to-indigo-500";
                const id = user.id || user._id;
                const slug = user.slug || id;

                return (
                    <div
                        onClick={() => router.push(`/dashborad/users/${slug}`)}
                        className="flex items-center gap-3 cursor-pointer group/user select-none"
                    >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${bg} text-white font-bold flex items-center justify-center text-sm shadow-sm overflow-hidden shrink-0`}>
                            {hasAvatarUrl ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <span>{user.avatar || initials}</span>
                            )}
                        </div>
                        <span className="font-semibold text-gray-900 text-sm group-hover/user:text-blue-600 transition-colors uppercase">
                            {user.name}
                        </span>
                    </div>
                );
            }
        },
        {
            key: "email",
            label: "Email"
        },
        {
            key: "role",
            label: "Role",
            render: (role) => (
                <span className="capitalize font-medium text-gray-700">{role}</span>
            )
        },
        {
            key: "status",
            label: "Status",
            render: (status) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${status === "active"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}>
                    {status}
                </span>
            )
        },
        {
            key: "actions",
            label: "Actions",
            align: "right",
            render: (_, user) => {
                const id = user.id || user._id;
                const slug = user.slug || id;
                return (
                    <div className="inline-flex gap-2">
                        <button
                            onClick={() => router.push(`/dashborad/users/${slug}`)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                            title="View Profile Details"
                        >
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                );
            }
        }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Users Management</h1>
                <p className="text-sm text-gray-500">Manage user status, roles, and administrative information.</p>
            </div>

            {/* Controls Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <SearchComponent
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    debounceMs={300}
                />
                <div className="flex flex-wrap items-center gap-3">
                    <FilterComponent
                        label="Status"
                        options={[
                            { value: "all", label: "All Users" },
                            { value: "active", label: "Active" },
                            { value: "inactive", label: "Inactive" },
                        ]}
                        selectedValue={filterStatus}
                        onChange={handleFilterChange}
                    />
                    <SortComponent
                        options={[
                            { value: "name", label: "Name" },
                            { value: "email", label: "Email" },
                            { value: "role", label: "Role" },
                        ]}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onSortChange={handleSortChange}
                    />
                </div>
            </div>

            {/* Users Table / Grid */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <TableComponent
                    columns={columns}
                    data={paginatedUsers}
                    emptyMessage="No users found matching the query."
                />

                {/* Pagination footer */}
                <PaginationComponent
                    currentPage={activePage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}