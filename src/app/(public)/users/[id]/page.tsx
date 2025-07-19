// ✅ src/app/(public)/users/[id]/page.tsx

import Profile from '@/components/user/Profile';
import { FetchUsersSingle } from '@/lib/axios/axiosRequest';
import { notFound } from 'next/navigation';
import { UserType } from '@/types/types';

type Props = {
  params: {
    id: string;
  };
};


export default async function UserPage({ params }: Props) {
  const { id } = params;

  try {
    const userData = await FetchUsersSingle(id);

    if (!userData || !userData.data) {
      notFound();
    }

    return <Profile user={userData.data as UserType} />;
  } catch (error) {
    console.error('خطا در دریافت کاربر:', error);
    notFound();
  }
}
