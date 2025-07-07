import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Background GIF using next/image */}
      <Image
        src="/cyberpunk.gif"
        alt="Cyberpunk Background"
        fill
        className="object-cover z-0"
        priority
      />

      {/* Optional overlay for contrast (optional) */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Main content on top of image */}
      <div className="z-20 flex flex-col items-center gap-6">
        <Link href="/dashboard">
          <Button className="px-6 py-3 text-lg font-semibold rounded-lg shadow-lg transition bg-white text-black hover:bg-gray-100">
            Click here to continue
          </Button>
        </Link>

        {/* Clerk user button (optional position) */}
        <div className="mt-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
}
