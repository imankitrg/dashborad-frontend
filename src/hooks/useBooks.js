"use client";

import { useState, useEffect, useCallback } from "react";
import { getBooks } from "@/services/book.service";
import useDebounce from "./useDebounce";

const useBooks = () => {
    // -------------------------
    // States
    // -------------------------

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        search: "",
        genre: "",
        sort: "",
    });

    const debouncedSearch = useDebounce(filters.search, 2000); //

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalBooks: 0,
        limit: 10,
    });

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await getBooks({
                    ...filters,
                    search: debouncedSearch,
                });

                setBooks(response.data);
                setPagination(response.pagination);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [
        filters.page,
        filters.limit,
        filters.genre,
        filters.sort,
        debouncedSearch
    ]);

    // -------------------------
    // Search
    // -------------------------

    const updateSearch = (value) => {
        setFilters((prev) => ({
            ...prev,
            search: value,
            page: 1,
        }));
    };

    // -------------------------
    // Genre Filter
    // -------------------------

    const updateGenre = (value) => {
        setFilters((prev) => ({
            ...prev,
            genre: value,
            page: 1,
        }));
    };

    // -------------------------
    // Sort
    // -------------------------

    const updateSort = (value) => {
        setFilters((prev) => ({
            ...prev,
            sort: value,
            page: 1,
        }));
    };

    // -------------------------
    // Pagination
    // -------------------------

    const changePage = (page) => {
        setFilters((prev) => ({
            ...prev,
            page,
        }));
    };

    // -------------------------
    // Return
    // -------------------------

    return {
        books,

        loading,

        error,

        filters,

        pagination,

        updateSearch,

        updateGenre,

        updateSort,

        changePage,
    };
};

export default useBooks;