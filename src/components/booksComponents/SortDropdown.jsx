export default function SortDropdown({ value, onSortChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="">Default</option>
      <option value="price">Price: Low to High</option>
      <option value="-price">Price: High to Low</option>
      <option value="rating">Rating: Low to High</option>
      <option value="-rating">Rating: High to Low</option>
      <option value="publishedYear">Oldest</option>
      <option value="-publishedYear">Newest</option>
    </select>
  );
}