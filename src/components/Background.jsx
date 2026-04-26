export default function Background({ gradientOnly = false }) {
  return (
    <div
      className={`bg${gradientOnly ? ' bg-gradient-only' : ''}`}
      aria-hidden="true"
    />
  );
}
