// import { SignIn } from "@clerk/nextjs";
// import Image from "next/image";

// export default function Page() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2">
//       <div>
//         <Image
//           src={"/newlogin.png"}
//           alt="login"
//           width={500}
//           height={500}
//           className="w-full object-contain"
//         />
//       </div>
//       <div className=" flex justify-center items-center h-screen">
//         <SignIn />;
//       </div>
//     </div>
//   );
// }

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/background.png"
        alt="Background"
        fill
        className="object-cover z-0"
        priority
      />

      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 z-10 backdrop-blur-sm" />

      {/* SignIn Box */}
      <div className="z-20 w-full max-w-md px-4">
        <SignIn />
      </div>
    </div>
  );
}
