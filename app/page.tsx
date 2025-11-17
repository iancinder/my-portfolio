"use client";

import { useEffect } from "react";
import Waves from "./Waves";
import CurvedLoop from "./CurvedLoop";
import AsciiSection from "./ASCIISection";
import MagicBento from "./MagicBento";
import ProfileCard from "@/components/ProfileCard";
import { Timeline } from "./Timeline";

export default function Home() {
  // Fade / blur the waves canvas as you scroll
  useEffect(() => {
  const onScroll = () => {
    const max = 900;
    const progress = Math.min(window.scrollY / max, 1);

    const canvas = document.querySelector<HTMLCanvasElement>(
      "canvas[data-waves]"
    );
    if (!canvas) return;

    const opacity = 1 - progress;
    canvas.style.opacity = opacity.toString();
    canvas.style.filter = `blur(${progress * 20}px)`;
    canvas.style.transform = `scale(${1 - progress * 0.08})`;
  };

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    }
  };

  onScroll();
  window.addEventListener("scroll", handleScroll);

  window.scrollTo({ top: 60, behavior: "smooth" });

  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      <Waves />

      <div className="relative z-10">
        {/* HERO – Profile card */}
        <section className="relative z-10 flex justify-center px-4 mt-32 md:mt-48">
          {/* This wrapper controls how far down the card sits */}
          <div className="mt-40 md:mt-56">
            <ProfileCard
              name="Ian Sendelbach"
              title="Electrical Engineering"
              handle="iansendelbach"
              status="Open to internships"
              contactText="Contact Me"
              avatarUrl="/headshot223.png"
              miniAvatarUrl="/headshot223.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => {
                window.location.href = "mailto:iansendelbach@ou.edu";
              }}
            />
          </div>
        </section>

        <AsciiSection />

        <section className="flex justify-center py-4 px-6 w-full">
          <div className="bento-outer-frame">
            <MagicBento
              textAutoHide
              enableStars
              enableSpotlight
              enableBorderGlow
              enableTilt
              enableMagnetism
              clickEffect
              spotlightRadius={300}
              particleCount={8} 
              glowColor="132, 0, 255"
            />
          </div>
        </section>

        <section className="min-h-screen px-6 py-16">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="max-w-2xl text-lg">
            This section exists so the page is taller than the screen. As you
            scroll down into it, the waves fade and blur away, and you land on
            the actual content.
          </p>
        </section>
      </div>

      <section id="timeline" className="relative z-10 min-h-screen px-4 py-16">
        <Timeline />
      </section>
    </main>
  );
}
