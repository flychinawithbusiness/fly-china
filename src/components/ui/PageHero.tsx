type PageHeroProps = {
  title: string;
  subtitle: string;
  badge: string;
};

export default function PageHero({ title, subtitle, badge }: PageHeroProps) {
  return (
    <section
      className="bg-[#0A1628] py-24 px-6 text-center pt-32"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 50%)",
        backgroundSize: "20px 20px",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <span className="inline-block bg-[#F5C200]/10 text-[#F5C200] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-[#F5C200]/20 mb-6">
          {badge}
        </span>
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
          {title}
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
}
