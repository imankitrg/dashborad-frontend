
import BookCard from "./BookCard";

export default function BookGrid({ books }) {
    return (
        <div className="grid">
            {books.map((book) => (
                <BookCard key={book._id} book={book} />
            ))}
        </div>
    );
}