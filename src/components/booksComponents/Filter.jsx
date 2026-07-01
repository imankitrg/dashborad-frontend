export default function Filter({ value, onGenreChange }) {
    return (
        <select
            value={value}
            onChange={(e) => onGenreChange(e.target.value)}
        >
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Fantasy">Fantasy</option>
        </select>
    );
}