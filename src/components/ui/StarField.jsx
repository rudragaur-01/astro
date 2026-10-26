// Deterministic star positions so server and client markup always match.
function seeded(seed) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export default function StarField({ count = 70, seed = 7, className = "" }) {
  const rand = seeded(seed);
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    r: rand() * 0.9 + 0.25,
    twinkle: rand() > 0.7,
    delay: (rand() * 4).toFixed(2),
  }));

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {stars.map((s) => (
        <circle
          key={s.id}
          cx={s.x}
          cy={s.y}
          r={s.r / 6}
          fill="#f7c46a"
          className={s.twinkle ? "animate-twinkle" : undefined}
          style={s.twinkle ? { animationDelay: `${s.delay}s` } : { opacity: 0.55 }}
        />
      ))}
    </svg>
  );
}
