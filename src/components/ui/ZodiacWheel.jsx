// Decorative wheel: zodiac divisions around a North Indian kundli grid.
export default function ZodiacWheel({ className = "" }) {
  const c = 200;
  const polar = (r, deg) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [c + r * Math.cos(a), c + r * Math.sin(a)];
  };

  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  const houses = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" aria-hidden="true" className={className}>
      <circle cx={c} cy={c} r="198" strokeWidth="0.75" />
      <circle cx={c} cy={c} r="186" strokeWidth="0.5" />
      <circle cx={c} cy={c} r="150" strokeWidth="0.75" />
      <circle cx={c} cy={c} r="104" strokeWidth="0.5" strokeDasharray="2 4" />

      {ticks.map((deg) => {
        const [x1, y1] = polar(deg % 30 === 0 ? 178 : 186, deg);
        const [x2, y2] = polar(198, deg);
        return <line key={`t${deg}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.5" />;
      })}

      {houses.map((deg) => {
        const [x1, y1] = polar(150, deg);
        const [x2, y2] = polar(186, deg);
        const [sx, sy] = polar(168, deg + 15);
        return (
          <g key={`h${deg}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.75" />
            <path
              d={`M${sx} ${sy - 4} L${sx + 1.2} ${sy - 1.2} L${sx + 4} ${sy} L${sx + 1.2} ${sy + 1.2} L${sx} ${sy + 4} L${sx - 1.2} ${sy + 1.2} L${sx - 4} ${sy} L${sx - 1.2} ${sy - 1.2} Z`}
              fill="currentColor"
              stroke="none"
            />
          </g>
        );
      })}

      {/* North Indian kundli grid */}
      <g strokeWidth="0.75">
        <rect x="126" y="126" width="148" height="148" />
        <line x1="126" y1="126" x2="274" y2="274" />
        <line x1="274" y1="126" x2="126" y2="274" />
        <path d="M200 126 L274 200 L200 274 L126 200 Z" />
      </g>
    </svg>
  );
}
