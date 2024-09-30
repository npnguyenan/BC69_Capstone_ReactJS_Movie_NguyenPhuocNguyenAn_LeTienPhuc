import z from "zod";

// validation và quy định kiểu dữ liệu trả về của Form tương ứng với Schema
export const RegisterSchema = z.object({
  taiKhoan: z.string({ message: "Vui lòng nhập thông tin tài khoản" }),
  matKhau: z.string({ message: "Vui lòng nhập thông tin mật khẩu" }),
  email: z
    .string({ message: "Vui lòng nhập thông tin tài khoản" })
    .email({ message: "Vui lòng nhập đúng định dạng email" }),
  soDt: z.string({ message: "Vui lòng nhập số điện thoại" }),
  maNhom: z.string({ message: "Vui lòng nhập mã nhóm" }),
  hoTen: z.string({ message: "Vui lòng nhập họ tên" }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
