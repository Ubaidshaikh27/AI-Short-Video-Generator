"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import VideoList from "./create-new/_components/VideoList";
import { eq } from "drizzle-orm";
import { VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";

function Dashboard() {
  const [videoList, setVideoList] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    user && GetVideoList();
  }, [user]);
  //------------------showing videos on the Dashboard----------------
  // Used to get Users Video

  const GetVideoList = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress));

    console.log(result);

    setVideoList(result);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>

        <Link href={"dashboard/create-new"}>
          <Button>+ Create New</Button>
        </Link>
      </div>

      {/* Empthy State */}

      {videoList?.length == 0 && (
        <div>
          <EmptyState />
        </div>
      )}

      {/* List of Videos */}
      <VideoList videoList={videoList} />
    </div>
  );
}

export default Dashboard;
