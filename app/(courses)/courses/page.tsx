import { Nav } from "@/app/_components/Nav";
import { Footer } from "@/app/_components/Footer";
import { Courses } from "@/app/(home)/_components/Courses";

export const metadata = {
  title: "Courses - Wuko Lingo",
  description: "Pick a language to learn with Wuko.",
};

export default function CoursesPage() {
  return (
    <>
      <Nav />
      <main className="courses-page">
        <Courses />
      </main>
      <Footer />
    </>
  );
}
