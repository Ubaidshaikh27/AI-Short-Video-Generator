import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from "lucide-react";
import React from "react";

function SideNav() {
  const MenuOption = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: PanelsTopLeft,
    },
    {
      id: 1,
      name: "Create New",
      path: "/create-new",
      icon: FileVideo,
    },
    {
      id: 1,
      name: "Upgrade",
      path: "/upgrade",
      icon: ShieldPlus,
    },
    {
      id: 1,
      name: "Account",
      path: "/account",
      icon: CircleUser,
    },
  ];

  return (
    <div className="w-64 h-screen shadow-md p-5">
      <div></div>
    </div>
  );
}

export default SideNav;
