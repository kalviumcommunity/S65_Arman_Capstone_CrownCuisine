interface HeroSectionProps {
  userName: string;
}

export function HeroSection({ userName }: HeroSectionProps) {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  return (
    <div className="relative overflow-hidden bg-stone-200">
      <div className="container relative z-10 mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black tracking-tight">
            {getTimeOfDay()}, <span className="italic">{userName}</span>
          </h1>
          <p className="mt-6 text-lg text-black/80 font-serif max-w-2xl mx-auto">
            Streamline your restaurant&apos;s day-to-day, from managing menus
            and tracking reservations to optimizing staff and service, all in
            one place.
          </p>
        </div>
      </div>
    </div>
  );
}
