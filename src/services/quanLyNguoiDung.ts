
import { LoginSchemaType, RegisterSchemaType } from "../schemas";
import { apiInstance } from "../constants";
import { LoginAPIResponse, RegisterAPIResponse } from "../@types";

const api = apiInstance.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung",
});

export const quanLyNguoiDungServices = {
  // dangKy: (payload: RegisterSchemaType ) => {
  //   return axios.post(
  //     "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
  //     payload,
  //     {
  //       headers: {
  //         TokenCybersoft:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2OSIsIkhldEhhblN0cmluZyI6IjAxLzAyLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczODM2ODAwMDAwMCIsIm5iZiI6MTcxMDUyMjAwMCwiZXhwIjoxNzM4NTE1NjAwfQ.ap-iPzMpXDeCuXH0aJnbbSuR3vIW4upk1nOK3h9D-5g",
  //       },
  //     }
  //   );
  // },
  dangKy: (payload: RegisterSchemaType) =>
    api.post<HttpResponse<RegisterAPIResponse>>("/DangKy", payload),

  // dangNhap: (payload: LoginSchemaType) => {
  //   return axios.post(
  //     "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/dangNhap",
  //     payload,
  //     {
  //       headers: {
  //         TokenCybersoft:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2OSIsIkhldEhhblN0cmluZyI6IjAxLzAyLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczODM2ODAwMDAwMCIsIm5iZiI6MTcxMDUyMjAwMCwiZXhwIjoxNzM4NTE1NjAwfQ.ap-iPzMpXDeCuXH0aJnbbSuR3vIW4upk1nOK3h9D-5g",
  //       },
  //     }
  //   );
  // },

  dangNhap: (payload: LoginSchemaType) =>
    api.post<HttpResponse<LoginAPIResponse>>("/dangNhap", payload),
};
