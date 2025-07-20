// src\app\(public)\users\layout.tsx
"use client";

import CurrentPath from "@/components/path/CurrentPath";
import SpinnerLyout from "@/components/spinner/SpinnerLyout";
import { setAuth } from "@/store/authSlice";
import { tokeRead } from "@/types/types";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function UerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch()
  const toastShownRef = useRef(false); // 🔑 کنترل نمایش فقط یک بار toast خوش‌آمد

useEffect(() => {
    const fetchUserFromToken = async () => {
      const res = await fetch("/api/users/readtoken", {
        credentials: "include",
      });

      if (res.ok) {
        const data: { user: tokeRead } = await res.json();
        dispatch(setAuth(data.user.name));

        if (!toastShownRef.current) {
          toast.custom(
            <div className="bg-green-200 px-3 py-2 text-black rounded-md">
              🤭 خوش اومدی {data.user.name}
            </div>,
            { duration: 3000 }
          );
          toastShownRef.current = true;
        }
      } else {
        if (!toastShownRef.current) {
          toast.custom(
            <div className="bg-red-200 px-3 py-2 text-black rounded-md">
              🤭 لطفا وارد حساب کاربری خود شوید
            </div>,
            { duration: 3000 }
          );
          toastShownRef.current = true;
        }
      }
    };

    fetchUserFromToken();
  }, [dispatch]);
  return (
    <>
     <CurrentPath />
      <SpinnerLyout />
      {children}
    </>
  );
}
