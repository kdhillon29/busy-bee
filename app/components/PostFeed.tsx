"use client";

import React, { useEffect, useState } from "react";
import PostInput from "./PostInput";
import Post from "./Post";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/../firebase";
import { useDispatch } from "react-redux";
import { closeLoadingScreen } from "@/redux/slices/loadingSlice";
import SidebarDrawer from "./SidebarDrawer";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function PostFeed() {
  const [posts, setPosts] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const snapshotDocs = snapshot.docs;

      setPosts(snapshotDocs);

      dispatch(closeLoadingScreen());
    });

    return unsubscribe;
  }, []);

  return (
    <div
      className="flex-grow
    max-w-2xl
    border-x
    border-gray-100
    "
    >
      <div
        className="py-4 px-3 text-lg sm:text-xl sticky top-0 text-gray-500
          z-20 bg-slate-50 bg-opacity-80 backdrop-blur-sm font-bold
          border-b rounded-xl
        "
      >
        <div className="flex w-full items-center justify-between space-x-3">
          <SidebarDrawer />
          <p className="ml-auto">
            <HomeIcon className="h-6" />
          </p>
        </div>
      </div>
      <PostInput />
      <div className="ps-3 ">
        {posts.map((post) => (
          <Post key={post.id} data={post.data()} id={post.id} />
        ))}
      </div>
    </div>
  );
}
