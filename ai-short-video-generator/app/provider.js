"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";

import { eq } from "drizzle-orm";

function Provider({ children }) {
  //cleark -hook  ->  to get all the info of the user like name, password, etc
  const { user } = useUser();

  useEffect(() => {
    user && isNewUser(); //if user is there then only execut the [isNewUser] method
  }, [user]);

  const isNewUser = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    console.log(result);

    if (!result[0]) {
      await db.insert(Users).values({
        name: user.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
      });
    }
  };

  return <div>{children}</div>;
}

export default Provider;
