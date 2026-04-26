export default function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="category-list">
      {categories.map((cat) => (
        <div
          key={cat}
          className={`category-item${active === cat ? ' active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </div>
      ))}
    </div>
  );
}
