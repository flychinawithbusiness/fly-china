export default function PageHero({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge: string;
}) {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0A1628 0%, #1C3A6B 100%)",
        paddingTop: "7rem",
        paddingBottom: "5rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(245,194,0,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(245,194,0,0.06) 0%, transparent 50%)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            background: "rgba(245,194,0,0.1)",
            border: "1px solid rgba(245,194,0,0.2)",
            color: "#F5C200",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "0.4rem 1rem",
            borderRadius: 999,
            marginBottom: "1.25rem",
            fontFamily: "var(--font-body)",
          }}
        >
          {badge}
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            color: "#ffffff",
            lineHeight: 1.1,
            margin: "0 0 1rem",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
