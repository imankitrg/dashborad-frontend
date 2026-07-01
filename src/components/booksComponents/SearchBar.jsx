"use client";

import { useState, useEffect } from "react";

export default function SearchBar({ value, onSearch }) {
    const [input, setInput] = useState(value);

    // sync when parent resets (like clear filters)
    useEffect(() => {
        setInput(value);
    }, [value]);

    const handleChange = (e) => {
        setInput(e.target.value);   // instant typing
        onSearch(e.target.value);   // update filters (no debounce here)
    };

    return (
        <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Search books..."
        />
    );
}