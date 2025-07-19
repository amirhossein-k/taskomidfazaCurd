// src\app\users\page.tsx
"use server";

import ClientUserPage from "@/app/components/usersClient";
import { FetchUsers } from "@/lib/axios/axiosRequest";
import { UsersResponse } from "@/types/types";
import { cookies, headers } from "next/headers";
import Link from "next/link";

// for better ceo and load fast  = server component
export default async function UsersPage() {
  const cookieStore = await cookies();
  const tokenUser = cookieStore.get("tokken")?.value;
  console.log(tokenUser, "token");
  const requestHeaders = await headers();
  const url = new URL(requestHeaders.get("x-url") || "http://localhost");
  const pageParam = url.searchParams.get("page") || "1";
  const perPageParam = url.searchParams.get("per_page") || "6";

  const currentPage = parseInt(pageParam, 10);
  const isAll = perPageParam === "All";
  const perPage = isAll ? -1 : parseInt(perPageParam, 10);

  const usersData = await FetchUsers(currentPage, perPage);

  // اگر خطا بود، پیام خطا نمایش بده
  if ("error" in usersData) {
    return (
      <div className="container mx-auto p-4 text-red-600 text-center">
        ❌ {usersData.error}
      </div>
    );
  }

  const users: UsersResponse = usersData;

  return (
    <div className="container mx-auto p-4   shadow-box1">
      <header className="text-center py-4 text-black">
        <h1 className="text-2xl font-bold mb-4">مدیریت کاربران</h1>

        <Link
          href={"/register"}
          className="bg-blue-600 hover:bg-blue-300 px-3 py-2 m-1 rounded-md"
          dir="rtl"
        >
          ثبت نام با api داخلی
        </Link>
        <Link
          href={"/register?api=true"}
          className="bg-blue-600 hover:bg-blue-300 px-3 py-2 m-1 rounded-md"
          dir="rtl"
        >
          ثبت نام با api گفته شده
        </Link>
      </header>

      <ClientUserPage initailProps={users} />
    </div>
  );
}
