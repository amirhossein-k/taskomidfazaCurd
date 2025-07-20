'use client'
import { Rootstate } from '@/store'
import React from 'react'
import { useSelector } from 'react-redux'

const SpinnerLyout = () => {

  // برای اینکه هنگام ناوبری بتوانم پیغام نمایش بدهم

  const { navOpen } = useSelector((state: Rootstate) => state.nav)
  const { name } = useSelector((state: Rootstate) => state.auth)


  return (
    <div dir="rtl" className={`loading ${navOpen ? "flex" : "hidden"} gap-4 text-center rounded-lg z-50 absolute w-[300px] h-[50px] flex justify-center items-center  top-2 right-2   bg-gray-400`}>

      {name ? (
        <>
          <span className="font-bold">

            {name}
          </span>
          <span>جان لطفا کمی صبر کن </span>
        </>
      ) : (
        <span>لطفا کمی صبر کنید</span>
      )}



    </div>
  )
}

export default SpinnerLyout
