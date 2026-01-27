"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function SidebarUserInfo() {
  const [user, setUser] = useState({
    name: "John Doe",
    username: "johndoe",
  });
  async function handleSignOut() {}

  return (
    <div
      className="absolute bottom-3 flex items-center justify-start
    space-x-2 xl:p-3 xl:pe-6 hover:bg-gray-500 hover:bg-opacity-10
    rounded-full transition cursor-pointer w-fit xl:w-[240px] 
    "
      onClick={() => handleSignOut()}
    >
      <Image
        src={"/assets/profile-pic.png"}
        width={36}
        height={36}
        alt="Profile Picture"
        className="w-9 h-9"
      />
      <div className="hidden xl:flex flex-col text-sm max-w-40">
        <span className="whitespace-nowrap text-ellipsis overflow-hidden font-bold">
          {user.name}
        </span>
        <span className="whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
          @{user.username}
        </span>
      </div>
    </div>
  );
}
