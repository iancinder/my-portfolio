"use client";

import dynamic from "next/dynamic";

const ASCIIText = dynamic(() => import("./ASCIIText"), {
  ssr: false,
});

export default function AsciiSection() {
  return (
    <section className="relative flex items-center justify-center min-h-[55vh] overflow-hidden">
      <ASCIIText
        text="portfolio"
        asciiFontSize={8}
        textFontSize={220}
        textColor="#fdf9f3"
        planeBaseHeight={8}
        enableWaves={false}
      />
    </section>
  );
}
