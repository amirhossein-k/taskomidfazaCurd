import { UsersResponse, UserType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modal {
  id: number;
  open: boolean;
}
interface userShow {
  id: number;

}
interface userState {
  users: UserType[];
  page: number;
  totalpage: number;
  loading: boolean;
  error: string | null;
  perPage: number;
  modalEdit: modal;
   userShow:userShow
}

const initialState: userState = {
  users: [],
  error: null,
  loading: false,
  page: 1,
  totalpage: 1,
  perPage: 6,
  modalEdit: { id: 1, open: false },
  userShow:{id:0}
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UsersResponse>) => {
      state.users = action.payload.data;
      state.totalpage = action.payload.total_pages;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setModalEdit: (state, action: PayloadAction<modal>) => {
      state.modalEdit = action.payload;
    },
    setUserShow: (state, action: PayloadAction<userShow>) => {
      state.userShow = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setError,
  setLoading,
  setPage,
  setUsers,
  setPerPage,
  setModalEdit,
  setUserShow
} = userSlice.actions;

export default userSlice.reducer;
