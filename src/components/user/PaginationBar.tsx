// src\components\user\PaginationBar.tsx

'use client'

import { setPage ,setPerPage} from '@/store/usesrSlice'
import { useDispatch } from "react-redux"
import { Pagination } from '@skeletonlabs/skeleton-react';
import {
  ArrowLeft as IconArrowLeft,
  ArrowRight as IconArrowRight,
  Ellipsis as IconEllipsis,
  ChevronsLeft as IconFirst,
  ChevronsRight as IconLast
} from 'lucide-react';
import { useMemo, useState,type ChangeEvent } from "react";
import { UserType } from "@/types/types";
import UserGrid from "./UserGrid";

interface PaginationBarProps{
    totalPages:number
    currentPage:number
      onPageChange?: (page: number,per_page:number) => void
       users:UserType[]


}

const PaginationBar:React.FC<PaginationBarProps> = ({currentPage,totalPages,onPageChange,users})=>{

      const [size, setSize] = useState<string | number>("6");
        // state برای نگه‌داشتن شماره صفحه و اندازه فعلی
  const [settings, setSettings] = useState({ page: currentPage || 1, pageSize: 6 });
    // گزینه‌های انتخاب اندازه صفحه
const sizeOptions = useMemo(() => [2, 4, 6], []);
    const dispatch = useDispatch()
  // تابع تغییر صفحه
  const handlePageChange = ({ page, pageSize }: { page: number; pageSize: number }) => {
    
   setSettings({ page, pageSize })
    dispatch(setPage(page))
    dispatch(setPerPage(pageSize))
    onPageChange?.(page, pageSize)
  };

  // تابع تغییر dropdown برای اندازه صفحه
     const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value
    setSize(selected)
      // اگر کاربر "همه" را انتخاب کند، تمام کاربران را در یک صفحه نشان بده
    if (selected === 'All') {
      const allCount = users.length
      setSettings({ page: 1, pageSize: allCount })
      dispatch(setPerPage(-1))
      dispatch(setPage(1))
      onPageChange?.(1, -1)
    } else {
      const numeric = parseInt(selected, 10)
      setSettings({ page: 1, pageSize: numeric })
      dispatch(setPerPage(numeric))
      dispatch(setPage(1))
      onPageChange?.(1, numeric)
    }
  }
    return(
        <div className="w-full">
      
  <UserGrid users={users} />
        <footer className="flex justify-between mt-4">
                  {/* انتخاب تعداد آیتم در هر صفحه */}
    <select
          name="size"
          id="size"
          className="select max-w-[150px] text-black text-center "
          value={size}
         onChange={handleSizeChange}
        >
          {sizeOptions.map((v: number) => (
            <option key={v} value={v}>
              ایتم {v}
            </option>
          ))}
          <option value={'All'}>Show All</option>
        </select>
                {/* فقط در صورتی نمایش داده شود که All انتخاب نشده */}
        {size !== 'All'&& (

            
              <Pagination
              classes="text-black"
          data={users}
          count={totalPages}  // تعداد صفحات
          page={settings.page}   // صفحه فعلی
          pageSize={settings.pageSize} // اندازه صفحه
          onPageChange={handlePageChange}  // تابع تغییر صفحه
          labelEllipsis={<IconEllipsis className="size-4" />}
          labelNext={<IconArrowRight className="size-4" />}
          labelPrevious={<IconArrowLeft className="size-4" />}
          labelFirst={<IconFirst className="size-4" />}
          labelLast={<IconLast className="size-4" />}
        />
        )}
</footer>
        </div>
    )
}


export default PaginationBar