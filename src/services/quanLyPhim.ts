import { Phim } from "../@types";
import { apiInstance } from "../constants";

const api = apiInstance.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim",
});

export const quanLyPhimServices = {
  getDanhSachPhim: (query = "") =>
    api.get<HttpResponse<Phim[]>>(`/LayDanhSachPhim${query}`),
  getFilmDetailById: (query = "") =>
    api.get<HttpResponse<Phim>>(`/LayThongTinPhim${query}`),
  deletePhimlById: (query = "") =>
    api.delete<HttpResponse<Phim>>(`/XoaPhim${query}`),
  addPhim: (payload: FormData) =>
    api.post<HttpResponse<Phim>>(`/ThemPhimUploadHinh`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  updatePhim: (payload: FormData) =>
    api.post<HttpResponse<Phim>>(`/CapNhatPhimUpload`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
