import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../../schemas";
// import { useMutation } from "@tanstack/react-query";
// import { quanLyNguoiDungServices } from "../../services";
// import { useDispatch } from "react-redux";
// import { quanLyNguoiDungActions } from "../../store/quanLyNguoiDung";
// import { useNavigate } from "react-router-dom";
// import { PATH } from "../../constants";
// import { toast } from "react-toastify";
import { useLoginMutation } from "../../hooks/api";

export const LoginTemplate = () => {
  // const navigate = useNavigate()
  // const dispatch = useDispatch();
  // const loginMutation = useMutation({
  //   mutationFn: (payload: LoginSchemaType) =>
  //     quanLyNguoiDungServices.dangNhap(payload),
  //   onSuccess: (data) => {
  //     console.log("data: ", data);
  //     // Lưu thông tin đăng nhập của user vào redux
  //     dispatch(quanLyNguoiDungActions.setUser(data.data.content));

  //     // đnhập thành công điều hướng đến HOME
  //     navigate("/")
  //   },

  //   onError: (error: any)=>{
  //     console.log("error: ", error);
  //     toast.error(error?.response?.data?.content)
  //   }
  // });
  const loginMutation = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit((values) => {
          console.log("values: ", values);

          // call API
          loginMutation.mutate(values);
        })}
      >
        <h2 className="text-white text-[30px] font-700 !mb-20">Đăng nhập</h2>

        <p className="text-white mb-1 mt-3">
          Tài khoản
          <span className="text-red-600">*</span>
        </p>
        <Controller
          control={control}
          name="taiKhoan"
          render={({ field }) => <Input {...field} />}
        />
        {errors?.taiKhoan && (
          <p className="text-red-600">{errors.taiKhoan.message}</p>
        )}

        <p className="text-white mb-1 mt-3">
          Mật khẩu
          <span className="text-red-600">*</span>
        </p>
        <Controller
          control={control}
          name="matKhau"
          render={({ field }) => <Input.Password {...field} />}
        />
        {errors?.matKhau && (
          <p className="text-red-600">{errors.matKhau.message}</p>
        )}

        <Button
          htmlType="submit"
          type="primary"
          danger
          className="!w-full mt-30 !h-[50px]"
          loading={loginMutation.isPending}
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};
