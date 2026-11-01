export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {
    return (
        <div>
            <button className="border-2 p-2 rounded-2xl"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>

            <span className="border-2 p-2 rounded-2xl">
                {currentPage} / {totalPages}
            </span>

            <button className="border-2 p-2 rounded-2xl"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}