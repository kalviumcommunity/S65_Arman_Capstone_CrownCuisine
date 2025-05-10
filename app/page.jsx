import Hero from "../components/landing/hero";
import Preview from "../components/landing/preview";
import Footer from "../components/landing/footer";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <section className="w-full max-w-6xl px-8 mt-10">
        <Preview />
      </section>
      <Footer />
    </div>
  );
}
