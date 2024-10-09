import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../../../hooks";

export const LoginTemplate = () => {
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
          // Gọi api đăng nhập
          loginMutation.mutate(values);
        })}
      >
        <h2 className="text-white text-center text-30">Đăng nhập</h2>
        <p className="text-white text-[16px] mb-10">
          Tài khoản <span className="text-red-500">*</span>
        </p>
        {errors?.taiKhoan && (
          <p className="text-red-500">{errors.taiKhoan.message}</p>
        )}
        <Controller
          control={control}
          name="taiKhoan"
          render={({ field }) => <Input {...field} />}
        />
        <p className="text-white text-[16px] mb-10 mt-10">
          Mật khẩu <span className="text-red-500">*</span>
        </p>
        {errors?.matKhau && (
          <p className="text-red-500">{errors.matKhau.message}</p>
        )}
        <Controller
          control={control}
          name="matKhau"
          render={({ field }) => <Input.Password {...field} />}
        />
        <Button
          htmlType="submit"
          className="!w-full mt-30 mb-30 !h-[50px]"
          type="primary"
          danger
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};
