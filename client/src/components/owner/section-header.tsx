interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8 border-b border-stone-200 pb-4">
      <h2 className="text-3xl font-semibold tracking-tight text-black">
        {title}
      </h2>
      <p className="mt-2 text-base text-stone-600">{description}</p>
    </div>
  );
}
