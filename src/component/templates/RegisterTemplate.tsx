import { Button, Input } from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "../../schemas";
// import { Form } from "react-router-dom";
// import { quanLyNguoiDungServices } from "../../services";
import { toast } from "react-toastify";
// import { useState } from "react";
// import { sleep } from "../../utils";
// import { useDispatch, useSelector } from "react-redux";
import { quanLyNguoiDungThunks } from "../../store/quanLyNguoiDung";
import { RootState, useAppDispatch } from "../../store";
import { useQuanLyNguoiDungSelector } from "../../store/quanLyNguoiDung/selector";
// Mutation sử dụng khi thay đổi database (gọi API xóa, sửa, thêm mới)
import { useMutation } from "@tanstack/react-query";
import { quanLyNguoiDungServices } from "../../services";
import { sleep } from "../../utils";
import { useRegisterMutation } from "../../hooks/api";

export const RegisterTemplate = () => {
  // const [isLoading, setIsLoading] = useState(false);

  // const registerMutation = useMutation({
  //   mutationKey: ["Register"],
  //   mutationFn: async (payload: RegisterSchemaType) => {
  //     await sleep(2000);
  //     return quanLyNguoiDungServices.dangKy(payload);
  //   },
  //   onSuccess: () => {
  //     // hàm được gọi khi call API thành công
  //     toast.success("Bạn đã đăng ký thành công");
  //   },
  //   onError: (error: any) => {
  //     // hàm được gọi khi call API thất bại
  //     toast.error(error?.response?.data?.content);
  //   },
  // });
  const registerMutation = useRegisterMutation();

  // tạo dispatch từ useAppDispatch
  const dispatch = useAppDispatch();

  // const { isLoadingRegister } = useSelector(
  //   (state: RootState) => state.quanLyNguoiDungReducer
  // );
  const { isLoadingRegister } = useQuanLyNguoiDungSelector();

  // useForm<RegisterSchemaType>: Định nghĩa kiểu dữ liệu trả về của useForm
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });
  console.log("errors: ", errors);

  // onSubmit chỉ được gọi khi validation không có lỗi
  const onSubmit: SubmitHandler<RegisterSchemaType> = async (values) => {
    // Cách 1: xử lí thuần
    // try {
    //   console.log(values);
    //   setIsLoading(true);

    //   await sleep(2000);

    //   // Gọi API đăng kí user
    //   await quanLyNguoiDungServices.dangKy(values);
    //   toast.success("Bạn đã đăng kí thành công!");
    // } catch (errors: any) {
    //   console.log("errors: ", errors);
    //   toast.error(errors?.response?.data?.content);
    // }
    // Finally: {
    //   // Luôn luôn chạy vào đây
    //   // Chạy sau khi gọi API xong
    //   setIsLoading(false);
    // }

    // // Cách 2: sử dụng redux
    // try {
    //   await dispatch(quanLyNguoiDungThunks.dangKy(values)).unwrap();
    //   toast.success("Bạn đã đăng kí thành công!");
    // } catch (errors: any) {
    //   toast.error(errors?.response?.data?.content || " đăng kí thất bại");
    // }

    // Cách 3: react query
    // try {
    //   await registerMutation.mutateAsync(values);
    //   toast.success("Bạn đã đăng kí thành công!");
    // } catch (error: any) {
    //   console.log("error: ", error);
    //   toast.error(error?.response?.data?.content);
    // }
    registerMutation.mutate(values);
  };

  return (
    <div>
      <h2 className="text-white text-[30px] font-600 !mb-10 mt-0">Đăng ký</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Họ tên */}
        <p className="text-white mb-1 mt-3">
          Họ tên
          <span className="text-red-600">*</span>
        </p>
        <Controller
          name="hoTen"
          control={control}
          render={({ field }) => (
            <Input status={errors.hoTen && "error"} {...field} />
          )}
        />
        {errors.hoTen && <p className="text-red-500">{errors.hoTen.message}</p>}

        {/* Email */}
        <p className="text-white mb-1 mt-3">
          Email
          <span className="text-red-600">*</span>
        </p>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input status={errors.email && "error"} {...field} />
          )}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Số điện thoại */}
        <p className="text-white mb-1 mt-3">
          Số điện thoại
          <span className="text-red-600">*</span>
        </p>
        <Controller
          name="soDt"
          control={control}
          render={({ field }) => (
            <Input status={errors.soDt && "error"} {...field} />
          )}
        />
        {errors.soDt && <p className="text-red-500">{errors.soDt.message}</p>}

        {/* Mã nhóm */}
        <p className="text-white mb-1 mt-3">
          Mã nhóm
          <span className="text-red-600">*</span>
        </p>
        <Controller
          name="maNhom"
          control={control}
          render={({ field }) => (
            <Input status={errors.maNhom && "error"} {...field} />
          )}
        />
        {errors.maNhom && (
          <p className="text-red-500">{errors.maNhom.message}</p>
        )}

        {/* Tài khoản */}
        <p className="text-white mb-1 mt-3">
          Tài khoản
          <span className="text-red-600">*</span>
        </p>
        <Controller
          name="taiKhoan"
          control={control}
          render={({ field }) => (
            <Input status={errors.taiKhoan && "error"} {...field} />
          )}
        />
        {errors.taiKhoan && (
          <p className="text-red-500">{errors.taiKhoan.message}</p>
        )}

        {/* Mật khẩu */}
        <p className="text-white mb-1 mt-3">
          Mật khẩu
          <span className="text-red-600">*</span>
        </p>
        <Controller
          name="matKhau"
          control={control}
          render={({ field }) => (
            <Input.Password status={errors.matKhau && "error"} {...field} />
          )}
        />
        {errors.matKhau && (
          <p className="text-red-500">{errors.matKhau.message}</p>
        )}

        <Button
          // loading={isLoadingRegister}
          loading={registerMutation.isPending}
          htmlType="submit"
          type="primary"
          danger
          className="!w-full mt-30 !h-[50px]"
        >
          Đăng ký
        </Button>
      </form>
    </div>
  );
};
