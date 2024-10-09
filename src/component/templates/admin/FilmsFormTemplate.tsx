import { Button, DatePicker, Input, Switch } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InputFilmSchema, InputFilmSchemaType } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";

import { useAddFilmMutation } from "../../../hooks/api/useAddFilmMutation";

import { useEffect, useState } from "react";
import { useQuanLyPhimSelector } from "../../../store/quanLyPhim";
import { useUpdateFilmMutation } from "../../../hooks";

type Props = {
  value?: InputFilmSchemaType | null;
};
export const FilmsFormTemplate = (props: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputFilmSchemaType>({
    mode: "onChange",
    resolver: zodResolver(InputFilmSchema),
    defaultValues: props.value || {},
  });

  const { imgUrl } = useQuanLyPhimSelector();
  const [fileHinhAnh, setFileHinhAnh] = useState<File | null>(null);
  let formData = new FormData();

  const addFilmMutation = useAddFilmMutation();
  const updateFilmMutation = useUpdateFilmMutation();

  let onSubmit: SubmitHandler<InputFilmSchemaType> = async (values) => {
    formData.append("maPhim", values.maPhim.toString());
    formData.append("tenPhim", values.tenPhim);
    formData.append("moTa", values.moTa);
    formData.append("trailer", values.trailer);
    formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
    formData.append("sapChieu", String(values.sapChieu));
    formData.append("dangChieu", String(values.dangChieu));
    formData.append("hot", String(values.hot));
    formData.append("danhGia", values.danhGia.toString());
    formData.append("maNhom", values.maNhom);

    if (!props.value) {
      formData.append("hinhAnh", values.hinhAnh);
      console.log("values.hinhAnh: ", values.hinhAnh);
      addFilmMutation.mutate(formData);
    } else {
      if (fileHinhAnh) formData.append("hinhAnh", fileHinhAnh);
      else formData.append("hinhAnh", values.hinhAnh);
      updateFilmMutation.mutate(formData);
      console.log("edit");
    }
  };
  console.log("fileHinhAnh: ", fileHinhAnh);
  console.log("imgUrl : " + imgUrl);
  console.log("name: " + getFileNameFromUrl(imgUrl));
  function getFileNameFromUrl(url: String) {
    // Tách tên file từ URL bằng cách cắt chuỗi theo dấu '/'
    const parts = url.split("/");
    // Phần tử cuối cùng trong mảng sẽ là tên file
    return parts[parts.length - 1];
  }

  console.log("urlToFile: ", urlToFile(imgUrl, getFileNameFromUrl(imgUrl)));
  async function urlToFile(
    url: string,
    fileName: string,
    mimeType = "image/jpeg"
  ) {
    // Tải dữ liệu từ URL dưới dạng blob
    const response = await fetch(url);
    const blob = await response.blob();

    // Chuyển blob thành file
    const filePromise = new File([blob], fileName, {
      type: mimeType,
    });

    const file: File = await filePromise;
    return file;
  }

  const fillData = useEffect(() => {
    if (props.value) {
      Object.entries(props.value).forEach(async ([key, value]) => {
        if (key == "hinhAnh" && value) {
          const imagePreview = document.getElementById(
            "imagePreview"
          ) as HTMLImageElement;
          imagePreview.src = String(value);
          const fileHinhAnh: File = await urlToFile(
            imgUrl,
            getFileNameFromUrl(imgUrl)
          );
          setFileHinhAnh(fileHinhAnh);
          // setValue(key, fileHinhAnh);
          setValue("hinhAnh", fileHinhAnh);
          console.log("fileHinhAnh filldata: ", fileHinhAnh);
        } else {
          setValue(key as keyof InputFilmSchemaType, value);
        }
      });
    }
  }, [props.value, setValue]);

  fillData;
  return (
    <div className="container ms-[200px] w-[100vh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-[16px] mb-10">
          Tên phim <span className="text-red-500">*</span>
        </p>
        <Controller
          name="tenPhim"
          control={control}
          render={({ field }) => (
            <Input
              className="mb-20"
              status={errors.tenPhim && "error"}
              {...field}
            />
          )}
        />
        {errors.tenPhim && (
          <p className="text-red-500">{errors.tenPhim.message}</p>
        )}
        <p className="text-[16px] mb-10 ">
          Trailer <span className="text-red-500 ">*</span>
        </p>
        <Controller
          name="trailer"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className="mb-20"
              status={errors.trailer && "error"}
            />
          )}
        />
        {errors.trailer && (
          <p className="text-red-500">{errors.trailer.message}</p>
        )}
        <p className="text-[16px] mb-10">
          Mô tả <span className="text-red-500">*</span>
        </p>
        <Controller
          name="moTa"
          control={control}
          render={({ field }) => (
            <Input
              className="mb-20 h-[100px]"
              status={errors.moTa && "error"}
              {...field}
            />
          )}
        />
        {errors.moTa && <p className="text-red-500">{errors.moTa.message}</p>}
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <p className="text-[16px] mb-10">
              Ngày khởi chiếu <span className="text-red-500">*</span>
            </p>

            <Controller
              name="ngayKhoiChieu"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="mb-20"
                  {...field}
                  status={errors.ngayKhoiChieu && "error"} // Hiển thị lỗi nếu có
                  value={field.value ? moment(field.value, "YYYY-MM-DD") : null} // Chuyển string thành moment để hiển thị
                  onChange={(date, dateString) => {
                    console.log("date: ", date);
                    // Lưu giá trị string vào field
                    field.onChange(dateString);
                    console.log("Date string: ", dateString);
                  }}
                  format="DD/MM/YYYY" // Định dạng ngày thành chuỗi
                />
              )}
            />
          </div>
          <div className="col-span-1 mt-30">
            <div className="grid grid-cols-3">
              <div className="col-span-1">
                <p className="text-[16px]">
                  Đang chiếu
                  <Controller
                    name="dangChieu"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        className="ms-[5px]"
                        {...field}
                        checked={field.value}
                        onChange={(checked) => {
                          field.onChange(checked);
                        }}
                      />
                    )}
                  />
                  {errors.ngayKhoiChieu && (
                    <p className="text-red-500">
                      {errors.ngayKhoiChieu.message}
                    </p>
                  )}
                </p>
              </div>
              <div className="col-span-1">
                <p className="text-[16px]">
                  Sắp chiếu
                  <Controller
                    name="sapChieu"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        className="ms-[5px]"
                        {...field}
                        checked={field.value}
                        onChange={(checked) => {
                          field.onChange(checked);
                        }}
                      />
                    )}
                  />
                </p>
              </div>
              <div className="col-span-1">
                <p className="text-[16px]">
                  Hot
                  <Controller
                    name="hot"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        className="ms-[5px]"
                        {...field}
                        // defaultValue={field.value == undefined ? false : true}
                        checked={field.value}
                        onChange={(checked) => {
                          field.onChange(checked);
                          console.log("field: ", field);
                        }}
                      />
                    )}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-[16px] mb-10 inline">Đánh giá</p>
        {errors.danhGia && (
          <p className="text-red-500">{errors.danhGia.message}</p>
        )}
        <Controller
          name="danhGia"
          control={control}
          render={({ field }) => (
            <Input
              className="w-[200px] ms-[15px] mb-30"
              type="number"
              status={errors.danhGia && "error"}
              {...field}
              onChange={(e) => {
                field.onChange(Number(e.target.value));
              }}
            />
          )}
        />
        <br />
        <p className="text-[16px] mb-10 inline-block">
          Hình ảnh<span className="text-red-500">*</span>
        </p>
        {errors.hinhAnh && (
          <p className="text-red-500">{errors.hinhAnh.message}</p>
        )}
        <Controller
          name="hinhAnh"
          control={control}
          render={({ field }) => (
            <Input
              status={errors.hinhAnh && "error"}
              className="mx-10 w-80 mb-20"
              type="file"
              id="fileInput"
              accept="image/*"
              // {...field}
              onChange={(event) => {
                const imagePreview = document.getElementById(
                  "imagePreview"
                ) as HTMLImageElement;
                const target = event.target as HTMLInputElement;

                // Kiểm tra nếu người dùng đã chọn tệp
                if (target.files && target.files.length > 0) {
                  let file = target.files[0];
                  console.log("file: ", file);

                  // Sử dụng URL.createObjectURL để tạo đường dẫn tạm thời cho tệp
                  const fileURL = URL.createObjectURL(file);

                  //   field.onChange(URL.createObjectURL(file));
                  // Hiển thị hình ảnh xem trước
                  imagePreview.src = fileURL;
                  field.onChange(file);
                  setFileHinhAnh(null);
                  console.log("fileHinhAnh: ", fileHinhAnh);
                }
              }}
            />
          )}
        />

        <img
          className="mb-[15px]"
          id="imagePreview"
          alt="Image Preview"
          width="300"
        />
        {!props.value ? (
          <>
            <Button
              htmlType="submit"
              className="!w-[100px] mt-30 me-10 !h-[40px] bg-green-400"
              type="primary"
            >
              Thêm phim
            </Button>
          </>
        ) : (
          <>
            <Button
              htmlType="submit"
              className="!w-[100px] mt-30 mb-30 !h-[40px]"
              type="primary"
            >
              Cập nhật
            </Button>
          </>
        )}
        {/* <Button
          htmlType="submit"
          className="!w-[100px] mt-30 mb-30 !h-[40px]"
          type="primary"
        >
          Cập nhật
        </Button> */}
      </form>
    </div>
  );
};
