// src\lib\axios\axiosRequest.ts

import {
  CreateUserType,
  RegisterResponse,
  ResCustom,
  SingleUSerResponse,
  UpdateUserRes,
  UsersResponse,
  UserType,
} from "@/types/types";
import axios from "axios";

const axiosOrder = axios.create({
  baseURL:
    typeof window !== "undefined"
      ? "https://reqres.in/api/users"
      : process.env.baseUrl!, // سرور
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  },
});

const axiosAuthUser = axios.create({
  baseURL: "https://reqres.in/api/register",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  },
});

function getTimeFrom(time: string): string {
  const date = new Date(time);
  return date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export const Register = async (
  password: string,
  email: string
): Promise<ResCustom<RegisterResponse, null>> => {
  const res = await axiosAuthUser.post<RegisterResponse>(
    "",
    { password, email },
    { headers: { "Cache-Control": "no-store" } }
  );

  if (res.status === 200) {
    await fetch("/api/users/settoken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tokken: res.data.token,
        email,
        password,
        createAt: res.data.createdAt,
        name: `name-${res.data.id}`,
        family: `family-${res.data.id}`,
      }),
    });

    return {
      data: {
        id: res.data.id,
        token: res.data.token,
        createdAt: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      },
      status: {
        error: false,
        message: `کاربر با ایدی :${res.data.id}  ذخیره شد. `,
        success: true,
      },
    };
  } else {
    return {
      data: null,
      status: {
        error: true,
        message: "در ایجاد کاربر مشکلی رخ داده است",
        success: false,
      },
    };
  }
};
export const FetchUsersSingle = async (
  id: string
): Promise<SingleUSerResponse> => {

  const res = await axiosOrder.get<SingleUSerResponse>(`/${id}`, {
    headers: { "Cache-Control": "no-store" },
  });
  console.log(res, "res fetch");
  return res.data;
};

export const FetchUsers = async (
  page: number = 1,
  perPage: number
): Promise<UsersResponse | { error: string }> => {
  try {
    const res = await axiosOrder.get<UsersResponse>(
      `?page=${page}&per_page=${perPage}`,
      { headers: { "Cache-Control": "no-store" } }
    );
    console.log(res, "res fetch");
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "ENOTFOUND" || error.message?.includes("getaddrinfo")) {
      console.error("خطا: اتصال به اینترنت برقرار نیست");
      return { error: "اتصال به اینترنت برقرار نیست. لطفاً بررسی کنید." };
    }

    console.error("خطای ناشناخته در گرفتن کاربران", error);
    return { error: "خطای ناشناخته‌ای رخ داده است" };
  }
};

export const CreateUser = async (
  name: string,
  family: string
): Promise<ResCustom<CreateUserType, null>> => {
  const res = await axiosOrder.post<CreateUserType>(
    ``,
    { name, family },
    { headers: { "Cache-Control": "no-store" } }
  );
  console.log(`${name} ${family} axios`);
  console.log(res, "axios res ");
  console.log(res.data, "axios create");
  if (res.status === 201) {
    return {
      data: {
        createdAt: getTimeFrom(res.data.createdAt.toString()),
        id: res.data.id,
      },
      status: {
        error: false,
        message: `کاربر با ایدی :${res.data.id}  ذخیره شد. `,
        success: true,
      },
    };
  } else {
    return {
      data: null,
      status: {
        error: true,
        message: "در ایجاد کاربر مشکلی رخ داده است",
        success: false,
      },
    };
  }
};

export const UpdateUser = async (
  name: string,
  family: string,
  id:number
): Promise<ResCustom<UpdateUserRes, null>> => {
  const res = await axiosOrder.put<UpdateUserRes>(
    `/${id}`,
    { name, family },
    { headers: { "Cache-Control": "no-store" } }
  );
  console.log(`${name} ${family} axios`);
  console.log(res, "axios res ");
  console.log(res.data, "axios create");
  if (res.status === 200) {
    return {
      data: {
        updatedAt: getTimeFrom(res.data.updatedAt.toString()),
        id:id,
        name:res.data.name,
        family:res.data.family
      },
      status: {
        error: false,
        message: `کاربر با ایدی :${id}  اپدیت شد.`,
        success: true,
      },
    };
  } else {
    return {
      data: null,
      status: {
        error: true,
        message: "در اپدیت کاربر مشکلی رخ داده است",
        success: false,
      },
    };
  }
};

export const DeleteUser = async (
  id: number
): Promise<ResCustom<{ createat: string }, null>> => {
  const res = await axiosOrder.delete(`/${id}`);
  console.log(id, "delete id asxis");
  console.log(res.data, "axios delete");
  console.log(res, "res  axios delte");
  if (res.status === 204) {
    return {
      data: {
        createat: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      },
      status: {
        message: "حذف شد",
        error: false,
        success: true,
      },
    };
  } else {
    return {
      data: null,
      status: {
        message: "حذف ناموفق",
        error: true,
        success: false,
      },
    };
  }
};
