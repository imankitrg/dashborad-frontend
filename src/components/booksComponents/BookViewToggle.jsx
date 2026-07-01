export default function BookViewToggle({ view, onViewChange }) {
  return (
    <div>
      <button onClick={() => onViewChange("grid")}>
        Grid
      </button>

      <button onClick={() => onViewChange("table")}>
        Table
      </button>
    </div>
  );
}