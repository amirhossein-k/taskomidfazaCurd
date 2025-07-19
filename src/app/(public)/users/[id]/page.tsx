// src/app/(public)/users/[id]/page.tsx

import { FetchUsersSingle } from '@/lib/axios/axiosRequest';
import { notFound } from 'next/navigation';
import Profile from '@/components/user/Profile';
import { SingleUSerResponse } from '@/types/types';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  // params باید به‌درستی دریافت شود و استفاده شود.
  const { id } = params;

  let userData: SingleUSerResponse | null = null;

  try {
    userData = await FetchUsersSingle(id);
  } catch (error) {
    console.error("خطا در دریافت کاربر:", error);
    notFound();  // در صورت بروز خطا به صفحه 404 بروید.
  }

  if (!userData || !userData.data) notFound(); // اگر داده‌ها یافت نشدند، صفحه 404 را نمایش بده

  return <Profile user={userData.data} />;
}
