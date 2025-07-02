// import React from "react";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import Image from "next/image";

// function CustomLoading({ loading }) {
//   return (
//     <AlertDialog open={loading}>
//       <AlertDialogContent>
//         <AlertDialogTitle className="sr-only">
//           Generating Video
//         </AlertDialogTitle>
//         <div className="flex flex-col items-center my-10 justify-center">
//           <Image
//             src={"/work-in-progress.gif"}
//             width={100}
//             height={100}
//             alt="Loading animation"
//           />
//           <h2>Generating you video... Do not Refresh</h2>
//         </div>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// export default CustomLoading;

//-----------------------------Another version to disable warning on console

import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogTitle className="sr-only">
          Generating Video
        </AlertDialogTitle>
        <AlertDialogDescription className="sr-only">
          Your video is currently being generated. Please wait and do not
          refresh the page.
        </AlertDialogDescription>
        <div className="flex flex-col items-center my-10 justify-center">
          <Image
            src={"/work-in-progress.gif"}
            width={100}
            height={100}
            alt="Loading animation"
          />
          <h2>Generating your video... Do not Refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
