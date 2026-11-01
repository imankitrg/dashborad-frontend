"use client";

import { useState } from "react";

import useBooks from "@/hooks/useBooks";

import SearchBar from "@/components/booksComponents/SearchBar";
import Filter from "@/components/booksComponents/Filter";
import SortDropdown from "@/components/booksComponents/SortDropdown";
import BookViewToggle from "@/components/booksComponents/BookViewToggle";

import BookGrid from "@/components/booksComponents/BookGrid";
import BookTable from "@/components/booksComponents/BookTable";
import Pagination from "@/components/booksComponents/Pagination";

import Loading from "@/components/booksComponents/Lodding";
import Error from "@/components/booksComponents/ErrorState";
import EmptyState from "@/components/booksComponents/EmptyState";

import BookForm from "@/components/booksComponents/BookForm";

export default function BooksPage() {
    const {
        books,
        loading,
        error,
        updateSearch,
        updateGenre,
        updateSort,
        changePage,
        filters,
        pagination,
    } = useBooks();

    const [view, setView] = useState("grid");

    if (loading) return <Loading />;

    if (error) return <Error />;

    return (
        <div>
            <div className="flex gap-4 mb-4">
                <SearchBar
                    value={filters.search}
                    onSearch={updateSearch}
                />

                <Filter
                    value={filters.genre}
                    onGenreChange={updateGenre}
                />

                <SortDropdown
                    value={filters.sort}
                    onSortChange={updateSort}
                />

                <BookViewToggle
                    view={view}
                    onViewChange={setView}
                />
                <BookForm />
            </div>

            {books.length === 0 ? (
                <EmptyState />
            ) : view === "grid" ? (
                <BookGrid books={books} />
            ) : (
                <BookTable books={books} />
            )}

            {books.length > 0 && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={changePage}
                />
            )}
        </div>
    );
}