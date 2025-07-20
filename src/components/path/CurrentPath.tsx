

'use client';
import React, {  useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from '@/store';
import { setNavOpen } from '@/store/navSlice';
import { flushSync } from 'react-dom';


export default function CurrentPath(
) {

  // مسیر طی شده را با این صفحه نمایش میدهم
  
  const pathname = usePathname() || "/";

    const dispatch = useDispatch()
    const {userShow} = useSelector((state:Rootstate)=>state.users)

      const [isPending,startTransition] = useTransition()  
      const router = useRouter()
    
    const handlePush = (url:string) => {
       flushSync(() => {
          dispatch(setNavOpen(true)); // فوراً مقدار را در store ذخیره کن
        });
        setTimeout(() => {
          startTransition(() => {
            router.push(url); // رفتن به صفحه
          });},2000)
      
      };
      console.log(pathname,'path')
      
  return (
    <div className="flex shadow-card  gap-3 text-md mb-6" dir='rtl'>
      <button 
      onClick={()=>handlePush('/')}
      className="hover:text-black text-blue-400">
        خانه
      </button>
      
      {userShow.id!==0 && (
        <>
        <div className='text-black'>--</div>
      <button 
      onClick={()=>handlePush( `/users/${userShow.id}`)}
      className="hover:text-black text-blue-400">
        {userShow.id}
      </button>
        </>

      )}
     

    </div>
  );
}
