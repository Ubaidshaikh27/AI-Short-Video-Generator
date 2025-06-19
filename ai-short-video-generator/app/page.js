import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h2>Hi</h2>
      <Button> Hello</Button>
      <UserButton />
    </div>
  );
}
