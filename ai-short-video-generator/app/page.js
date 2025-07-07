import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/cyberpunk.gif')" }}
    >
      {/* Main Button */}
      <Link href="/dashboard" className="z-10">
        <Button className="px-6 py-3 text-lg font-semibold rounded-lg shadow-lg transition bg-white text-black hover:bg-gray-100">
          Click here to continue
        </Button>
      </Link>
      <UserButton />
    </div>
  );
}
