import axios from "axios";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getBooks = async (params = {}) => {
    const { data } = await API.get("/books", {
        params,
    });

    return data;
};

export const getBook = async (id) => {
    const { data } = await API.get(`/books/${id}`);
    return data;
};

export const createBook = async (book) => {
    const { data } = await API.post("/books", book);
    return data;
};

export const updateBook = async (id, book) => {
    const { data } = await API.put(`/books/${id}`, book);
    return data;
};

export const deleteBook = async (id) => {
    const { data } = await API.delete(`/books/${id}`);
    return data;
};