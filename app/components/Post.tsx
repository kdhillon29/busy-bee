import Image from "next/image";
import React from "react";
import Moment from "react-moment";
import { Timestamp } from "firebase/firestore";

interface PostHeaderProps {
  username?: string;
  name?: string;
  timestamp?: Timestamp;
  text?: string;
  replyTo?: string;
}

export default function PostHeader({
  username,
  name,
  timestamp,
  text,
  replyTo,
}: PostHeaderProps) {
  return (
    <div className="flex p-3 space-x-5">
      <Image
        src="/assets/profile-pic.png"
        width={44}
        height={44}
        alt="Profile Picture"
        className="w-11 h-11 z-10 bg-white"
      />

      <div className="text-[15px] flex flex-col space-y-1.5">
        <div className="flex space-x-1.5 text-[#707E89]">
          <span
            className="font-bold text-[#0F1419]
          inline-block whitespace-nowrap overflow-hidden text-ellipsis
          max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px]
          sm:max-w-[160px]
          "
          >
            {name}
          </span>
          <span
            className="
            inline-block whitespace-nowrap overflow-hidden text-ellipsis 
            max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px]
            sm:max-w-[160px]
           "
          >
            @{username}
          </span>
          {timestamp && (
            <>
              <span>·</span>
              <Moment fromNow>{timestamp.toDate()}</Moment>
            </>
          )}
        </div>

        <span>{text}</span>

        {replyTo && (
          <span className="text-[15px] text-[#707E89]">
            Replying to <span className="text-[#F4AF01]">@{replyTo}</span>
          </span>
        )}
      </div>
    </div>
  );
}
