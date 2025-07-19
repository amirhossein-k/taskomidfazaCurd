// app/dashboard/page.tsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface User{
  id:string
  name:string
  email:string
  createAt:string
  family:string
}

export default  function ProfilePage() {
  const [user, setUser] = useState<User|null>(null);


  useEffect(()=>{
    const fetchUserFromToken =  async()=>{
        const toastId = toast.loading("درحال خواندن اطلاعات کاربر هستیم");

      const res = await fetch('/api/users/readtoken',{ credentials: 'include' })
        toast.dismiss(toastId); // حذف پیام لودینگ

      if(res.ok){
        const data = await res.json()
        setUser(data.user)
        toast.success("درحال خواندن اطلاعات کاربر هستیم ");
      }else{
         toast.error("دسترسی غیرمجاز");
        router.push("/register?api=true");
      }
    }
    fetchUserFromToken();
  },[])


console.log(user,'usersssssssssssssssss')
const router = useRouter()
  const handleOut = async()=>{

        toast.success("در  حال خروج");

    try {
      const [] = await Promise.all([
        fetch("/api/users/logout", { credentials: "include" }),
      new Promise((res) => setTimeout(res, 2000)),
    ]);
      
    
      toast.success("خروج تکمیل شد");
    } catch {
      toast.error("حطا در خروج");
    } finally {
       router.push('/register?api=true')
    }

  }

  return <div className='flex  text-black flex-col gap-2' dir='rtl'>
    <h1 className='text-center shadow-lg py-2 text-lg font-bold'>صفحه مدیریت</h1>
     {user && (
        <div className="text-center p-2 text-blue-600 font-semibold">
          خوش آمدید {user?.name} {user?.family}
        </div>
      )}
    <div className="flex flex-row justify-around gap-3">
    <Link href={'/'} className='border w-full rounded-md py-2 text-center shadow-md hover:bg-sky-300'>صفحه اصلی</Link>
    <div 
    onClick={handleOut}
    className='border w-full rounded-md py-2 text-center shadow-md hover:bg-sky-300'>خروح </div>
  
    </div>


    
  </div>;
}