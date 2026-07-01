export default function BookCard({ book }) {
    return (
        <div>
            <img src={book.imageUrl} alt={book.title} />

            <h3>{book.title}</h3>
            <p>{book.author}</p>

            <p>₹ {book.price}</p>
            <p>⭐ {book.rating}</p>

            <p>{book.genre}</p>
            <p>{book.publishedYear}</p>
        </div>
    );
}