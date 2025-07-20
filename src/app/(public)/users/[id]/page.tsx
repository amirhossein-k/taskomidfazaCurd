'use server'
import { FetchUsersSingle } from "@/lib/axios/axiosRequest";
import { notFound } from "next/navigation";
import Profile from "@/components/user/Profile";
import { SingleUSerResponse } from "@/types/types";

type PageProps = {
  params: Promise<{ id: string }>;
};


export default async function Page({ params }: PageProps) {
    // asynchronous access of `params.id`.
 const { id } = await params
  let userData: SingleUSerResponse | null = null;

  try {
    userData = await FetchUsersSingle(id);
  } catch (error) {
    console.error("خطا در دریافت کاربر:", error);
    notFound();
  }

  if (!userData || !userData.data) {
    notFound();
  }

  return <Profile user={userData.data} />;
}
