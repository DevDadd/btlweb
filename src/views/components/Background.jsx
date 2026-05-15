export default function Background({ gradientOnly = false, className = "" }) {
  const base = `bg${gradientOnly ? " bg-gradient-only" : ""}`;
  return (
    <div
      className={[base, className].filter(Boolean).join(" ")}
      aria-hidden="true"
    />
  );
}
