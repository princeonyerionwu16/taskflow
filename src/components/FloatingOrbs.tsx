export function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="floating-orb animate-float-slow"
        style={{
          width: 500,
          height: 500,
          top: "-10%",
          left: "-10%",
          background: "oklch(0.65 0.25 295 / 60%)",
        }}
      />
      <div
        className="floating-orb animate-float-slow"
        style={{
          width: 600,
          height: 600,
          bottom: "-20%",
          right: "-10%",
          background: "oklch(0.72 0.2 240 / 50%)",
          animationDelay: "3s",
        }}
      />
      <div
        className="floating-orb animate-float-slow"
        style={{
          width: 400,
          height: 400,
          top: "40%",
          left: "50%",
          background: "oklch(0.82 0.15 200 / 30%)",
          animationDelay: "6s",
        }}
      />
    </div>
  );
}
