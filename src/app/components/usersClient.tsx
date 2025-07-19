// src\app\components\usersClient.tsx
"use client";
import PaginationBar from "@/components/user/PaginationBar";
import { Rootstate } from "@/store";
import { UsersResponse } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setLoading,
  setPage,
  setPerPage,
  setUsers,
  setModalEdit,
} from "@/store/usesrSlice";
import { FetchUsers } from "@/lib/axios/axiosRequest";
import toast from "react-hot-toast";
import Modal from "@/components/modal/Modal";
import LoadingUser from "../(public)/users/loading";

const ClientUserPage = ({ initailProps }: { initailProps: UsersResponse }) => {
  const dispatch = useDispatch();

    // کنترل لودینگ داخلی هنگام دریافت اطلاعات
  const [localLoading, setLocalLoading] = useState(false);

    // فقط یکبار هنگام بارگذاری اولیه صفحه تنظیم می‌شود
  const [firstLoadDone, setFirstLoadDone] = useState(false);

    // کنترل باز یا بسته بودن مودال ساخت کاربر
  const [openFirst, setOpenFirst] = useState(false);
  const { page, users, perPage, modalEdit } = useSelector(
    (state: Rootstate) => state.users
  );

  // بارگذاری اولیه اطلاعات (فقط یک بار اجرا می‌شود)
  useEffect(() => {
    if (!firstLoadDone) {
      dispatch(setUsers(initailProps));
      dispatch(setPage(initailProps.page));
      dispatch(setPerPage(initailProps.per_page));
      setFirstLoadDone(true);
      dispatch(setModalEdit({ id: 1, open: false }));
    }
  }, [dispatch, initailProps, firstLoadDone]);


  // هر بار که page یا perPage تغییر کند، اطلاعات جدید از API گرفته می‌شود

  useEffect(() => {
    if (!firstLoadDone) return;

    const fetch = async () => {
      dispatch(setLoading(true));
      try {
        const data = await FetchUsers(page, perPage);
        if ("error" in data) {
          dispatch(setError(data.error));
          toast.error(data.error);
        } else {
          dispatch(setUsers(data));
          dispatch(setError(null));
        }
      } catch (err) {
        console.log(err, "userClient error");
        dispatch(setError(`خطا در دریافت اطلاعات کاربران`));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetch();
  }, [page, dispatch, perPage, firstLoadDone]);
// اگر کاربران از redux موجود بودند، آن‌ها را نمایش بده، در غیر این صورت داده‌ی اولیه را
  const displayedUsers = users.length > 0 ? users : initailProps.data;
// تغییر صفحه یا تعداد نمایش در هر صفحه
  const handlePageChange = useCallback(
    (newPage: number, newPer: number) => {
      dispatch(setPage(newPage));
      dispatch(setPerPage(newPer));
    },
    [dispatch]
  );
// دکمه دریافت مجدد اطلاعات کاربران 
  const handleReload = async () => {
    if (localLoading) return;
    setLocalLoading(true);
    toast.success("در حال دریافت");

    try {
      // // شبیه‌سازی تاخیر ۲ ثانیه‌ای
      const [data] = await Promise.all([
        FetchUsers(1, perPage),
        new Promise((res) => setTimeout(res, 2000)),
      ]);

      if ("error" in data) {
        toast.error(data.error);
      } else {
        dispatch(setPage(1));// بازگشت به صفحه اول
        dispatch(setUsers(data));
        toast.success("اطلاعات دریافت شد");
      }
    } catch {
      toast.error("خطا در دریافت اطلاعات");
    } finally {
      setLocalLoading(false);
    }
  };
//  نمایش لودینگ هنگام دریافت مجدد
  if (localLoading) {
    return <LoadingUser />;
  }

  return (
    <div>
      <div className="flex justify-between p-3  mb-3 bg-[#b0d5ff]">
        <button
          className="bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-400"
          onClick={handleReload}
        >
          دریافت مجدد اطلاعات
        </button>

        <button
          className="bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-400"
          onClick={() => setOpenFirst(true)}
        >
          ایجاد کاربر جدید
        </button>
      </div>
      {(openFirst || modalEdit.open) && <Modal setOpenFirst={setOpenFirst} />}

      <PaginationBar
        users={displayedUsers}
        currentPage={page}
        totalPages={initailProps.total}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
export default ClientUserPage;
