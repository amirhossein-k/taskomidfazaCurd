"use client";

import { UserType } from "@/types/types";
import Image from "next/image";

type Props = {
  user: UserType;
};

const Profile = ({ user }: Props) => {


  return (
    <div className="mainn px-4 py-6 max-w-md sm:max-w-xl mx-auto text-black">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">مشخصات کاربر</h2>
      <div className="card shadow-lg rounded-xl bg-white overflow-hidden">
        <div className="card-body px-4 sm:px-6 py-6 relative">
          <i className="fa fa-pen fa-xs edit absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-blue-500"></i>

          <div className="flex justify-center mb-4">
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          </div>

          <table className="table-auto w-full text-right text-sm sm:text-base">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2 font-semibold w-1/3">نام</td>
                <td className="py-2 w-1">:</td>
                <td className="py-2">{user.first_name} {user.last_name}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 font-semibold">ایمیل</td>
                <td className="py-2">:</td>
                <td className="py-2 break-all">{user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
