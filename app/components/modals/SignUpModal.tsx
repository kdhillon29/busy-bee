"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeSignUpModal, openSignUpModal } from "@/redux/slices/modalSlice";
import {
  ArrowPathIcon,
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/../firebase";
import { signInUser } from "@/redux/slices/userSlice";

export default function SignUpModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isOpen = useSelector(
    (state: RootState) => state.modals.signUpModalOpen,
  );
  const dispatch: AppDispatch = useDispatch();

  async function handleSignUp(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password) {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(userCredentials.user, {
      displayName: name,
    });
    setLoading(false);
    dispatch(
      signInUser({
        name: userCredentials.user.displayName,
        username: userCredentials.user.email!.split("@")[0],
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
      }),
    );
  }

  async function handleGuestLogIn(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      "guest123@gmail.com",
      "guest123",
    );
    updateProfile(userCredentials.user, {
      displayName: "Guest User",
    });
    setLoading(false);
    dispatch(
      signInUser({
        name: "Guest User",
        username: userCredentials.user.email!.split("@")[0] || "guest123",
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
      }),
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;

      // Handle Redux Actions
      dispatch(
        signInUser({
          name: currentUser.displayName,
          username: currentUser.email!.split("@")[0],
          email: currentUser.email,
          uid: currentUser.uid,
        }),
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <button
        className=" w-full h-[48px] md:w-[88px] md:h-[40px] text-md md:text-sm font-bold bg-white
         rounded-full
        "
        onClick={() => dispatch(openSignUpModal())}
      >
        Sign Up
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignUpModal())}
        className="flex justify-center items-center"
      >
        <div
          className="w-full h-full sm:w-[600px] sm:h-fit bg-white
        sm:rounded-xl outline-none
        "
        >
          {loading && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 font-bold
        flex items-center justify-center z-50"
            >
              {" "}
              loading..
              <ArrowPathIcon className="w-5 h-5 ms-2 animate-spin" />
            </div>
          )}
          <XMarkIcon
            className="w-7 mt-5 mr-5 ml-auto cursor-pointer"
            onClick={() => dispatch(closeSignUpModal())}
          />
          <form className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Create your account</h1>
            <div className="w-full space-y-5 mb-10">
              <input
                className="w-full h-[54px] border border-gray-200
               outline-none pl-3 rounded-[4px] focus:border-[#F4AF01]
               transition"
                placeholder="Name"
                type="text"
                required
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
              <input
                className="w-full h-[54px] border border-gray-200
               outline-none pl-3 rounded-[4px] focus:border-[#F4AF01]
               transition"
                placeholder="Email"
                required
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />

              <div
                className="w-full h-[54px] border border-gray-200
               outline-none rounded-[4px] focus-within:border-[#F4AF01]
               transition flex items-center overflow-hidden pr-3"
              >
                <input
                  placeholder="Password"
                  required
                  type={showPassword ? "text" : "password"}
                  className="w-full h-full ps-3 outline-none"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-7 h-7 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </div>
              </div>
            </div>
            <button
              className="bg-[#F4AF01] text-white h-[48px]
            rounded-full shadow-md mb-5 w-full"
              onClick={(e) => handleSignUp(e)}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <span className="mb-5 text-sm text-center block">Or</span>
            <button
              className="bg-[#F4AF01] text-white h-[48px]
            rounded-full shadow-md w-full"
              onClick={(e) => handleGuestLogIn(e)}
            >
              {loading ? "Logging In..." : "Log In as Guest"}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
