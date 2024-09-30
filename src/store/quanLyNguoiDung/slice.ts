import { createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungThunks } from "./thunk";
import { RegisterSchemaType } from "../../schemas";
import { storage } from "../../utils";
import { localStorageKeys } from "../../constants";
import { LoginAPIResponse } from "../../@types";

type InitialState = {
  isLoadingRegister: boolean;
  userRegister?: RegisterSchemaType;

  // lưu thông tin đăng nhập của user
  user: LoginAPIResponse | null;
};
const initialState: InitialState = {
  isLoadingRegister: false,
  userRegister: undefined,
  user: storage(localStorageKeys.USER),
};

const { dangKy } = quanLyNguoiDungThunks;

export const {
  reducer: quanLyNguoiDungReducer,
  actions: quanLyNguoiDungActions,
} = createSlice({
  name: "quanLyNguoiDung",
  initialState,
  // xử lí action đồng bộ
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;

      // lưu user vào localStorage
      localStorage.setItem(localStorageKeys.USER, JSON.stringify(payload));
    },
    logOut: (state) => {
      // xóa thông tin user ở redux
      state.user = null;

      // xóa thông tin user ở localStorage
      localStorage.removeItem(localStorageKeys.USER)
    },
  },

  //   xử lí các action không đồng bộ (gọi APiI)
  extraReducers(builder) {
    builder
      .addCase(dangKy.pending, (state) => {
        (state.isLoadingRegister = true), console.log("pending");
      })
      // gọi API thành công
      .addCase(dangKy.fulfilled, (state, { payload }) => {
        console.log("payload: ", payload);
        console.log("fulfilled");
        state.isLoadingRegister = false;
        state.userRegister = payload;
      })
      // gọi API thất bại
      .addCase(dangKy.rejected, (state) => {
        console.log("rejected");
        state.isLoadingRegister = false;
      });
  },
});
