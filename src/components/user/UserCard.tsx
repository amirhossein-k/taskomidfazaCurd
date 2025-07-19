// src\components\user\UserGrid.tsx
"use client";

import { UserType } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { Accordion } from "@skeletonlabs/skeleton-react";
import { useMutation } from "@tanstack/react-query";
import { DeleteUser } from "@/lib/axios/axiosRequest";
import toast from "react-hot-toast";
import { setModalEdit } from "@/store/usesrSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user, index }: { user: UserType; index: number }) => {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
// ارسال کاربر به صفحه پروفایل خاص خودش
  const handlePush = () => {
    startTransition(() => {
      router.push(`/users/${user.id}`);
    });
  };
// باز کردن مودال ویرایش برای این کاربر
  const handleEdit = () => {
    dispatch(setModalEdit({ id: user.id, open: true }));
  };

  const [value, setValue] = useState<string[]>([]); // انتخاب کاربری که باید نمایش داده شود
  // ترتیب نمایش فیلدها در جدول
  const fieldOrder = ["first_name", "last_name", "email"];

  console.log(user.avatar, "acatar");
//  تابع حذف کاربر از سرور
  const deleteUser = async (id: number) => {
    const resDelete = await DeleteUser(id);

    return resDelete;
  };

  const mutationDeleteUser = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      if (data.status.error) {
        toast.error(data.status.message || "خطایی رخ داده است");
      } else {
        toast.success(`${data.status.message} 
           ساعت:${data.data?.createat}`);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطا در ارتباط با سرور");
    },
  });

  const handleDelete = (id: number) => {
    console.log(id, "client");
    mutationDeleteUser.mutate(id);
  };

  return (
    <Accordion value={value} onValueChange={(e) => setValue(e.value)} multiple>
      <Accordion.Item value={user.id.toString()}>
        <div className=" relative ">
          <Accordion.Control classes="bg-[#68aaec] flex-1 w-full  hover:bg-[#4682A9]">
            <div className="w-full flex  items-center gap-4 p-3 cursor-pointer  bg-[#749BC2] hover:bg-[#4682A9] rounded-md">
              <Image
                src={user.avatar}
                alt={`${user.first_name}-avatar`}
                width={0}
                height={0}
                sizes="50px"
                className="w-12 h-auto object-cover rounded-full"
              />
              <span className="text-[16px]">
                {index + 1}. {user.first_name} {user.last_name}
              </span>
            </div>
          </Accordion.Control>

          <button
            onClick={() => handleDelete(user.id)}
            className="absolute right-13 top-7 bg-red-700 hover:bg-red-500 text-white px-3 py-1 rounded z-10"
          >
            حذف
          </button>
        </div>

        <Accordion.Panel>
          <div className="overflow-x-auto mt-2">
            <table className="min-w-[640px] text-sm text-left text-white border border-slate-600 w-[100%]">
              <thead className="bg-[#e2eaf1] text-[#00063f]  ">
                <tr>
                   {/* نمایش تیترها براساس ترتیب */}
                  {fieldOrder.map((key) => (
                    <th className="p-2  text-center" key={key}>
                      {" "}
                      {key.replace(/_/g, " ")}
                    </th>
                  ))}
                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-slate-900 border-t border-slate-700">
                  {fieldOrder.map((key) => (
                    <td key={key} className="p-2 text-center">
                      {user[key as keyof UserType]}
                    </td>
                  ))}
                  <td className="p-2 text-center flex gap-3">
                    <button
                      onClick={handlePush}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                      مشاهده
                    </button>
                    <button
                      onClick={handleEdit}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                      ویرایش
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default UserCard;
