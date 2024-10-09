import z from "zod";

export const InputUserSchema = z.object({
  taiKhoan: z
    .string({ message: "Vui lòng nhập tài khoản" })
    .min(6, "Tài khoản phải tối thiếu 6 ký tự")
    .max(10, "Tài khoản tối đa chỉ 10 ký tự"),
  matKhau: z.string({ message: "Vui lòng nhập mật khẩu" }),
  hoTen: z.string({ message: "Vui lòng nhập họ tên" }),
  email: z
    .string({ message: "Vui lòng nhập họ tên" })
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không đúng"),
  soDt: z
    .string({ message: "Vui lòng nhập họ tên" })
    .regex(
      /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
      "Số điện thoại không đúng"
    ),
  maNhom: z.string().default("GP04"),
});

export type InputUserSchemaType = z.infer<typeof InputUserSchema>;
