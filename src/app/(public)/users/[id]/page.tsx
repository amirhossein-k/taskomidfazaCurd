'use server'
import { FetchUsersSingle } from "@/lib/axios/axiosRequest";
import { notFound } from "next/navigation";
import Profile from "@/components/user/Profile";
import { SingleUSerResponse } from "@/types/types";

type PageProps = {
  params: Promise<{ id: string }>;
};


export default async function Page({ params }: PageProps) {
  // به صورت سروری  اطلاعات را میگریم و پاس میدهم به صفحه کلاینت چون باید از کوکی اطلاعات بخونم و این تنها راهه که کوکی امن hhtponly بتوان خواند
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
