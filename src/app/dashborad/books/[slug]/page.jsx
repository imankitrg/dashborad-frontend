"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Calendar, Tag, ShieldCheck, Inbox, DollarSign } from "lucide-react";
import books from "@/data/books";

export default function BookDetailsPage({ params }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const { slug } = resolvedParams;

    const [book, setBook] = useState(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        // Find the book by slug or by id (supporting both for flexibility)
        const foundBook = books.find(b => b.slug === slug || b.id === slug || b._id === slug);
        setBook(foundBook);
    }, [slug]);

    if (!book) {
        return (
            <div className="p-12 max-w-xl mx-auto text-center mt-20 bg-white rounded-2xl border border-gray-150 shadow-sm">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-150">
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Book Not Found</h1>
                <p className="text-sm text-gray-500 mt-2">The book details you are trying to view do not exist or have been moved.</p>
                <button 
                    onClick={() => router.back()} 
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Go Back to Catalog</span>
                </button>
            </div>
        );
    }

    const author = book.author || book.auther || "Unknown Author";
    const imageUrl = book.imageUrl || book.cover;
    const description = book.description || book.reviews || "No description available for this book catalog item.";

    // Generate a consistent gradient based on the book's title or genre
    const getGradient = (genre = "") => {
        const genreLower = genre.toLowerCase();
        if (genreLower.includes("novel") || genreLower.includes("fiction")) {
            return "from-pink-500 to-rose-600";
        } else if (genreLower.includes("science") || genreLower.includes("sci-fi") || genreLower.includes("thriller")) {
            return "from-blue-600 to-indigo-700";
        } else if (genreLower.includes("mystery") || genreLower.includes("thriller")) {
            return "from-purple-700 to-slate-900";
        } else if (genreLower.includes("fantasy")) {
            return "from-amber-500 to-orange-600";
        } else if (genreLower.includes("biography") || genreLower.includes("history")) {
            return "from-emerald-600 to-teal-700";
        }
        return "from-blue-500 to-violet-600";
    };

    const gradientClass = getGradient(book.genre);

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            {/* Header / Back Link */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Back to Books</span>
                </button>

                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 border border-gray-100 px-3 py-1 rounded-md">
                    Book ID: {book.id || book._id}
                </div>
            </div>

            {/* Main Detail Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
                
                {/* Left Side: Large Book Cover Column */}
                <div className="w-full md:w-[350px] bg-gray-50/50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100 shrink-0">
                    <div className="w-[200px] h-[300px] rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 relative group bg-white">
                        {!imageError && imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={book.title}
                                onError={() => setImageError(true)}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${gradientClass} p-6 flex flex-col justify-between text-white relative`}>
                                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 w-fit">
                                    {book.genre || "Book"}
                                </span>
                                <div className="space-y-1">
                                    <h3 className="font-extrabold text-lg leading-tight uppercase line-clamp-3">
                                        {book.title}
                                    </h3>
                                    <p className="text-xs text-white/80 font-medium italic">
                                        by {author}
                                    </p>
                                </div>
                                <span className="text-[10px] text-white/70 font-semibold uppercase pt-2 border-t border-white/15">
                                    {book.publishedYear}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Detailed specs column */}
                <div className="flex-1 p-8 space-y-6">
                    
                    {/* Header: Title and Author */}
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            {book.genre && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                                    <Tag className="w-3.5 h-3.5" />
                                    {book.genre}
                                </span>
                            )}
                            
                            {/* Stock status indicator */}
                            {book.status && (
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${
                                    book.status === "in-stock" || book.stock > 0
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                        : "bg-rose-50 text-rose-700 border-rose-100"
                                }`}>
                                    <Inbox className="w-3.5 h-3.5" />
                                    {book.status === "in-stock" || book.stock > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight uppercase">
                            {book.title}
                        </h1>
                        <p className="text-base text-gray-500 font-medium mt-1">
                            by <span className="text-gray-800 font-semibold">{author}</span>
                        </p>
                    </div>

                    {/* Stats Highlights: Price, Rating, Published */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        {/* Price */}
                        <div className="flex flex-col items-center text-center p-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <DollarSign className="w-3 h-3 text-gray-400" /> Price
                            </span>
                            <span className="text-lg font-extrabold text-blue-600">
                                ${book.price}
                            </span>
                        </div>

                        {/* Rating */}
                        <div className="flex flex-col items-center text-center p-2 border-x border-gray-200">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> Rating
                            </span>
                            <span className="text-lg font-extrabold text-gray-900 flex items-center gap-1">
                                {book.rating} <span className="text-xs text-gray-400 font-normal">/5</span>
                            </span>
                        </div>

                        {/* Year */}
                        <div className="flex flex-col items-center text-center p-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-gray-400" /> Published
                            </span>
                            <span className="text-lg font-extrabold text-gray-900">
                                {book.publishedYear || "N/A"}
                            </span>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Book Description & Overview
                        </h4>
                        <div className="text-sm text-gray-600 leading-relaxed bg-gray-50/50 p-5 rounded-2xl border border-gray-100/60 whitespace-pre-line">
                            {description}
                        </div>
                    </div>

                    {/* Additional Spec list */}
                    <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                        <div className="flex justify-between py-1 border-b border-gray-50">
                            <span className="text-gray-400 font-medium">Stock Count:</span>
                            <span className="text-gray-900 font-bold">{book.stock !== undefined ? book.stock : "N/A"} items</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-50">
                            <span className="text-gray-400 font-medium">Status:</span>
                            <span className="text-gray-900 font-semibold capitalize">{book.status || "N/A"}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-50">
                            <span className="text-gray-400 font-medium">Route Slug:</span>
                            <span className="text-gray-900 font-mono text-xs">{book.slug || "N/A"}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-50">
                            <span className="text-gray-400 font-medium">Catalog Index:</span>
                            <span className="text-gray-900 font-semibold">#{book.id}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}