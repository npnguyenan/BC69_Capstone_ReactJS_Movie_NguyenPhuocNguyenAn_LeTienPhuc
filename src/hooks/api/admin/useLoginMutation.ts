import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { LoginSchemaType } from "../../../schemas";
import { quanLyNguoiDungServices } from "../../../services";

import { toast } from "react-toastify";
import { PATH } from "../../../constants";
import { useAppDispatch } from "../../../store";
import { quanLyNguoiDungActions } from "../../../store/quanLyNguoiDung";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginMutation = useMutation({
    mutationFn: (payload: LoginSchemaType) =>
      quanLyNguoiDungServices.dangNhap(payload),
    onSuccess: (data, payload: LoginSchemaType) => {
      console.log("payload: ", payload);
      // Lưu thông tin đăng nhập vào redux
      dispatch(quanLyNguoiDungActions.setUser(data.data.content));
      //   Điều hướng đến trang chủ admin
      navigate(PATH.films);
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return loginMutation;
};
