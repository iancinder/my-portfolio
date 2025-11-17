"use client";

import { useEffect, useRef, useState } from "react";
import { timelineItems } from "./timelineData";

function TimelineItem({ item, index }: { item: any; index: number }) {
  const isLeft = index % 2 === 0;
  const liRef = useRef<HTMLLIElement | null>(null);
  const [inView, setInView] = useState(false);

  // Fade / slide in when item enters viewport
  useEffect(() => {
    const el = liRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target); // run once
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={liRef}
      className="relative grid grid-cols-2 items-center"
    >
      {/* Left column or right column card */}
      <div
  className={[
    // Size
        // Size
    isLeft ? "w-[90%]" : "w-[65%]",


    // Positioning
    isLeft
      ? "col-start-1 col-end-2 justify-self-end pr-6"
      : "col-start-2 col-end-3 justify-self-start pl-6",

    // Styling
    "rounded-xl border border-slate-700/70 bg-slate-900/60 p-6", // <— rounded-xl here
    "backdrop-blur-md shadow-xl",

    // Animation
    "transition-all duration-700 ease-out",
    "opacity-0",
    isLeft ? "-translate-x-8" : "translate-x-8",
    inView ? "opacity-100 translate-x-0" : "",
  ].join(" ")}
>

        {/* date */}
        <p
          className="text-xs uppercase tracking-[0.2em]"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {item.date}
        </p>

        {/* title */}
        <h3
          className="mt-1 text-xl font-semibold"
          style={{ color: "#e9e7f4" }}
        >
          {item.title}
        </h3>

        {/* tag pill */}
        <span
          className="mt-2 inline-block rounded-full bg-slate-800 px-3 py-1 text-xs"
          style={{ color: "rgba(233,231,244,0.85)" }}
        >
          {item.tag}
        </span>

        {/* description */}
        <p
          className="mt-3 text-sm"
          style={{ color: "rgba(233,231,244,0.85)" }}
        >
          {item.description}
        </p>
      </div>

      {/* Dot on the center line */}
      <div className="pointer-events-none absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-pink-400 shadow-[0_0_12px_#ec4899]" />
    </li>
  );
}

export function Timeline() {
  return (
    <section
      id="timeline"
      className="relative mx-auto max-w-5xl px-6 py-32"
      style={{
        fontFamily:
          '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#e9e7f4",
      }}
    >
      <h2 className="mb-20 text-center text-4xl font-semibold">
        Timeline
      </h2>

      <div className="relative">
        {/* Center vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-700/80" />

        <ol className="relative space-y-24">
          {timelineItems.map((item, i) => (
            <TimelineItem key={item.title + item.date} item={item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
