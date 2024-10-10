import z from "zod";

export const InputFilmSchema = z.object({
  maPhim: z.number().default(0),
  tenPhim: z.string({ message: "Vui lòng nhập tên phim" }),
  trailer: z.string({ message: "Vui lòng nhập trailer" }),
  biDanh: z.string().optional().default(""),
  hinhAnh: z
    .any()
    .optional()
    .refine((file) => file instanceof File, {
      message: "Vui lòng chọn hình ảnh hợp lệ",
    }),
  moTa: z.string({ message: "Vui lòng nhập mô tả" }),
  ngayKhoiChieu: z.string({ message: "Vui lòng nhập ngày khởi chiếu" }),
  danhGia: z
    .number()
    .min(0, "Ít nhất là 0 điểm")
    .max(10, "Cao nhất là 10 điểm"),

  hot: z.boolean().default(false),
  dangChieu: z.boolean().default(false),
  sapChieu: z.boolean().default(false),
  maNhom: z.string().default("GP01"),
});

export type InputFilmSchemaType = z.infer<typeof InputFilmSchema>;
