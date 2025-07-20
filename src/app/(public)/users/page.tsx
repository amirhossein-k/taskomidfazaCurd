// src\app\users\page.tsx
"use server";

import ClientUserPage from "@/app/components/usersClient";
import CurrentPath from "@/components/path/CurrentPath";
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
    <> 
    
  {/*اطلاعات را سروی میگیرم تا هم امن باشد هم بتوان روی سئو نتیجه بهتری بزارم*/}
     
      <ClientUserPage initailProps={users} />
    </>
  );
}
