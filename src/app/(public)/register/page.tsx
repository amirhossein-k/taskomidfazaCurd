'use client';
import { Register } from "@/lib/axios/axiosRequest";
import {
  InternalRegisterResponse,
  RegisterResponse,
  ResCustom,
} from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type CombinedRegisterResponse =
  | RegisterResponse
  | InternalRegisterResponse
  | ResCustom<RegisterResponse, null>;

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const api = searchParams.get("api");

  const inputField = api ? (
    <>
      <div className="mb-4 p-2 flex flex-col gap-4">
        <label htmlFor="email" id="email">
          ایمیل:
        </label>

        <div className=" relative group">
          <input
            type="email"
            name="email"
            id="email"
            value={"eve.holt@reqres.in"}
            readOnly
            placeholder="ایمیل خود را بنویسید"
            className="border-2 p-2 w-full"
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            براساس داکیومنت سایت api فقط همین مقدار می پذیرد
          </div>
        </div>
      </div>
      <div className="mb-4 p-2 flex flex-col gap-4">
        <label htmlFor="password" id="password">
          پسورد:
        </label>

        <input
          type="password"
          name="password"
          id="password"
          placeholder="پسورد خود را بنویسید"
          className="border-2 p-2 w-full"
        />
      </div>
    </>
  ) : (
    <>
      <div className="mb-4 p-2 flex flex-col gap-4">
        <label htmlFor="name" id="name">
          نام:
        </label>

        <input
          type="text"
          name="name"
          id="name"
          placeholder="اسم خود را بنویسید"
          className="border-2 p-2 w-full"
        />
      </div>
      <div className="mb-4 p-2 flex flex-col gap-4 ">
        <label htmlFor="family" id="family">
          فامیلی:
        </label>

        <input
          type="text"
          name="family"
          id="family"
          placeholder="فامیلی خود را بنویسید"
          className="border-2 p-2 w-full"
        />
      </div>
    </>
  );

  const createUser = async ({
    name,
    family,
    password,
    email,
  }: {
    name?: string;
    family?: string;
    password?: string;
    email?: string;
  }): Promise<CombinedRegisterResponse> => {
    if (api) {
      if (!email || !password) {
        throw new Error("ایمیل و پسورد الزامی هستند");
      }
      const data = await Register(password, email);

      return data;
    } else {
      if (!name || !family) {
        throw new Error("نام و فامیلی الزامی است");
      }
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, family }),
      });

      const data: InternalRegisterResponse = await res.json();
      if (!res.ok) {
        throw new Error(
          (data.error ? data.errorMessage : " خطایی رخ داده") || "ورود ناموفق"
        );
      }
      return data as InternalRegisterResponse;
    }
  };

  const UserMutation = useMutation<
    CombinedRegisterResponse,
    Error,
    { name?: string; family?: string; password?: string; email?: string }
  >({
    mutationFn: createUser,
    onSuccess: (data) => {
      if ("status" in data) {
        // یعنی ResCustom
        if (data.status.success && data.data) {
          toast.success(
            `ثبت نام موفق با ID: ${data.data.id} وساعت ${data.data.createdAt}`
          );
          router.push("/profile?api=true");
        }
      } else if ("token" in data) {
        // یعنی RegisterResponse
        toast.success(`ورود موفق با api خارجی: ${data.createdAt}`);
        router.push("/profile");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setErrorMessage(error.message || "خطا در ورود");
    },
    onSettled: () => {
      setPending(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataUser = new FormData(e.currentTarget);
    setPending(true);

    if (api) {
      const user_email = formDataUser.get("email") as string;
      const user_password = formDataUser.get("password") as string;
      console.log(user_email, "update");

      if (!user_email || !user_password) {
        setErrorMessage("تمام فیلد ها باید پر شوند");
        toast.error("تمامی فیلد ها اجباری است");
        setPending(false);
        return;
      }

      UserMutation.mutate({ email: user_email, password: user_password });
    } else {
      const user_name = formDataUser.get("name") as string;
      const user_family = formDataUser.get("family") as string;
      console.log(user_name, "update");

      if (!user_name || !user_family) {
        setErrorMessage("تمام فیلد ها باید پر شوند");
        toast.error("تمامی فیلد ها اجباری است");
        setPending(false);
        return;
      }

      UserMutation.mutate({ name: user_name, family: user_family });
    }
  };
  return (
    <div className="w-full h-screen lg:w-[50%] mx-auto px-3" dir="rtl">
      <h1 className="text-center text-black text-xl shadow-md my-2 py-2 ">
        فرم ثبت نام
        <span className="px-1 text-blue-500">
          {!api ? "با api داخلی" : " با api گفته شده"}
        </span>
      </h1>
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}

      <div className="" dir="rtl">
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {inputField}
          <button
            className="text-white font-bold text-lg border rounded-lg px-2 py-2 inline w-full bg-blue-500"
            disabled={pending}
            type="submit"
          >
            {pending ? "منتظر باشید" : "ایجاد"}
          </button>
        </form>
      </div>
      <Link
        href={"/"}
        className="text-blue-500 text-lg mt-2 px-2 block hover:text-blue-800"
      >
        صفحه اصلی
      </Link>
    </div>
  );
};

export default RegisterPage;
