import { CreateUser, UpdateUser } from "@/lib/axios/axiosRequest";
import { CreateUserType, ResCustom, UpdateUserRes } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "@/store";
import { setModalEdit } from "@/store/usesrSlice";

interface ModalProps {
  setOpenFirst: (value: boolean) => void;
}
const Modal: React.FC<ModalProps> = ({ setOpenFirst }) => {
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [pending, setPending] = useState(false);
  const { modalEdit, users } = useSelector((state: Rootstate) => state.users);

  const createUser = async ({
    name,
    family,
  }: {
    name: string;
    family: string;
  }) => {
    const resUser = await CreateUser(name, family);
    return resUser;
  };
  const updateUser = async ({
    name,
    family,
  }: {
    name: string;
    family: string;
  }) => {
    const id = modalEdit.id
    const resUser = await UpdateUser(name, family,id);
    return resUser;
  };

  const CreateMutation = useMutation({
    mutationFn: createUser,
    // onMutate:()=>setPending(true),

    onSuccess: (data: ResCustom<CreateUserType, null>) => {
      if (data?.status.success) {
        toast.success(
          ` ${data.status.message} در ساعت:${data.data?.createdAt}`
        );
        setOpenFirst(false);
      } else {
        toast.error(data.status.message);
        setErrorMessage(data.status.message);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setErrorMessage(error.message || "خطا درایجد کاربر");
    },
    onSettled: () => {
      setPending(false);
      dispatch(setModalEdit({ id: modalEdit.id, open: false }));
    },
  });
  const UpdateMutation = useMutation({
    mutationFn: updateUser,

    onSuccess: (data: ResCustom<UpdateUserRes, null>) => {
      if (data?.status.success) {
        toast.success(
          ` ${data.status.message} در ساعت:${data.data?.updatedAt}`
        );
        setOpenFirst(false);
      } else {
        toast.error(data.status.message);
        setErrorMessage(data.status.message);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setErrorMessage(error.message || "خطا در اپدیت کردن کاربر");
    },
    onSettled: () => {
      setPending(false);
      dispatch(setModalEdit({ id: modalEdit.id, open: false }));
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataUser = new FormData(e.currentTarget);

    const user_name = formDataUser.get("name") as string;
    const user_family = formDataUser.get("family") as string;
    console.log(user_family, "update");

    if (!user_family || !user_name) {
      setErrorMessage("تمام فیلد ها باید پر شوند");
      toast.error("تمامی فیلد ها اجباری است");
      return;
    }
    setPending(true);
    if (modalEdit.open) {
      UpdateMutation.mutate({ name: user_name, family: user_family });
    } else {
      CreateMutation.mutate({ name: user_name, family: user_family });
    }
  };

  return (
    <div className="fixed inset-0  text-black  bg-[#ffffff71] bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-lg  shadow-lg relative w-[50%] lg:w-[30%]">
        <button
          className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-1"
          onClick={
            modalEdit.open
              ? () => dispatch(setModalEdit({ id: modalEdit.id, open: false }))
              : () => setOpenFirst(false)
          }
        >
          {" "}
          <X />
        </button>
        <h1 className="text-center mt-5 text-xl shadow-md my-2 py-2 ">
          {modalEdit.open ? "فرم ویرایش" : "فرم ثبت کاربر"}
        </h1>
        {errorMessage && (
          <div className="mb-4 text-right text-red-500">{errorMessage}</div>
        )}

        <div className="" dir="rtl">
          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div className="mb-4 p-2 flex flex-col gap-4">
              <label htmlFor="name" id="name">
                نام:
              </label>

              <input
                type="text"
                name="name"
                id="name"
                defaultValue={
                  modalEdit.open
                    ? users.find((item) => item.id === modalEdit.id)
                      ?.first_name || ""
                    : ""
                }
                placeholder="اسم خود را بنویسید"
                className="border-2 p-2 w-full"
              />
            </div>
            <div className="mb-4 p-2 flex flex-col gap-4">
              <label htmlFor="family" id="family">
                فامیلی:
              </label>

              <input
                type="text"
                name="family"
                id="family"
                defaultValue={
                  modalEdit.open
                    ? users.find((item) => item.id === modalEdit.id)
                      ?.last_name || ""
                    : ""
                }
                placeholder="فامیلی خود را بنویسید"
                className="border-2 p-2 w-full"
              />
            </div>
            <button
              className="text-white font-bold text-lg border rounded-lg px-2 py-2 inline w-full bg-blue-500"
              disabled={pending}
              type="submit"
            >
              {pending
                ? "منتظر باشید"
                : modalEdit.open
                  ? " ویرایش"
                  : " ثبت کاربر"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
