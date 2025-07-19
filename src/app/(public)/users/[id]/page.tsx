// src\app\(public)\users\[id]\page.tsx
import Profile from '@/components/user/Profile';
import { FetchUsersSingle } from '@/lib/axios/axiosRequest';
import { notFound } from 'next/navigation';
import { SingleUSerResponse } from '@/types/types';

export default async function Page(props: Promise<{ params: { id: string } }>) {
  const { params } = await props;
  const userData = await FetchUsersSingle(params.id);

  if (!userData?.data) notFound();

  return <Profile user={userData.data} />;
}