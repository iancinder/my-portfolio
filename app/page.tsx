import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <main className="flex w-full max-w-3xl flex-col gap-10 py-32 px-16 text-white sm:items-start">
        <Image
          className="opacity-80"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <div className="flex flex-col gap-4 text-left">
          <h1 className="text-4xl font-semibold leading-tight">
            Whaddup, I&apos;m Ian and I&apos;m doing dope shit.
          </h1>
          <p className="text-lg text-zinc-300">
            Always looking for a challenge – that&apos;s why I&apos;m building
            this website.
          </p>
        </div>
      </main>
    </div>
  );
}
