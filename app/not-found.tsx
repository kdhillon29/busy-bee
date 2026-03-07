// app/not-found.js
import Link from "next/link";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
export default function NotFound() {
  return (
    <div
      className="text-[#0F1419] min-h-screen max-w-[1400px] mx-auto
       flex justify-center
       "
    >
      <Sidebar />
      <div className=" flex-grow flex  flex-col justify-start items-center py-24 gap-3 max-w-5xl mx-auto border-x border-gray-100">
        <h1 className="text-2xl font-bold"> Not Found</h1>
        <p>Oops Error Loading your Post!Please check Post Id</p>
        <Link
          href="/"
          className=" flex items-center justify-center gap-1  text-lg w-32"
        >
          <ArrowLeftIcon className="w-5 h-5 " /> <strong>Home</strong>
        </Link>
      </div>
      <Widgets />
    </div>
  );
}
