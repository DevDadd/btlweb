export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  icon = '🔍',
}) {
  return (
    <div className="search-wrapper">
      <span className="search-icon" aria-hidden="true">
        {icon}
      </span>
      <input
        type="text"
        className="search-input text-start"
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        className={`search-clear${value ? ' visible' : ''}`}
        aria-label="Clear search"
        onClick={() => onChange('')}
      >
        ×
      </button>
    </div>
  );
}
