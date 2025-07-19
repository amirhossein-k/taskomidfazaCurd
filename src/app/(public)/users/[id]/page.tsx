import Profile from '@/components/user/Profile';
import { FetchUsersSingle } from '@/lib/axios/axiosRequest';
import { notFound } from 'next/navigation';
import { SingleUSerResponse } from '@/types/types';

interface UserPageParams {
  params: {
    id: string;
  };
}

export default async function UserPage({ params }: UserPageParams) {
  const { id } = params;

  let userData: SingleUSerResponse | null = null;

  try {
    userData = await FetchUsersSingle(id);
  } catch (error) {
    console.error("خطا در دریافت کاربر:", error);
    notFound();
  }

  if (!userData?.data) notFound();

  return <Profile user={userData.data} />;
}
