import type { Metadata } from "next";
import { Nunito, Fraunces, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "./theme-script";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wuko Lingo: say hi to your language buddy",
  description:
    "Learn languages by ear, with Wuko. No flashcards, no boring drills. Just sound-first, recall fast, build it yourself.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${fraunces.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full font-sans">
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
