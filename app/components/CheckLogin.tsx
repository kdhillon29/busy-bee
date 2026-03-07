"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { openLogInModal } from "@/redux/slices/modalSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckLogin() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user.username) {
      //   router.push("/");
      dispatch(openLogInModal());
    }
  }, [user.username]);

  return null;
}
