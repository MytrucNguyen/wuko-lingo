import { Nav } from "@/app/_components/Nav";
import { Footer } from "@/app/_components/Footer";
import { BackgroundDoodles } from "./_components/BackgroundDoodles";
import { Hero } from "./_components/Hero";
import { HowItWorks } from "./_components/HowItWorks";
import { Courses } from "./_components/Courses";
import { CtaBand } from "./_components/CtaBand";

export default function Home() {
  return (
    <>
      <BackgroundDoodles />
      <Nav />
      <Hero />
      <div className="wave-divider" aria-hidden="true"></div>
      <HowItWorks />
      <Courses />
      <CtaBand />
      <Footer />
    </>
  );
}
