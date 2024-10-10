import { useQuery } from "@tanstack/react-query";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { sleep } from "../../../utils";
import { quanLyPhimServices } from "../../../services";
import { Phim } from "../../../@types";
import { PATH } from "../../../constants";
import { useDeleteMutation } from "../../../hooks";
import {
  quanLyPhimActions,
  useQuanLyPhimSelector,
} from "../../../store/quanLyPhim";
import { useAppDispatch } from "../../../store";

export const ListFilmTemplate = () => {
  const deleteMutation = useDeleteMutation();
  const { reload } = useQuanLyPhimSelector();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  {
    if (reload) {
      window.location.reload();
      dispatch(quanLyPhimActions.setReload(false));
    }
  }
  //   Lấy danh sách phim
  let { data } = useQuery({
    queryKey: ["DanhSachPhim"],
    queryFn: async () => {
      await sleep(1000 * 1);
      return quanLyPhimServices.getDanhSachPhim("?maNhom=GP01");
    },
    staleTime: 5 * 60 * 1000,
    // true:  gọi API, false: ko gọi
    enabled: true,
  });

  const renderFilms = (data: Phim[] = []) => {
    console.log("render");
    return data.map((phim) => {
      return (
        <tr key={phim.maPhim}>
          <td className="px-10">{phim.maPhim}</td>
          <td className="px-10">
            <img src={phim.hinhAnh} alt="" style={{ width: "90%" }} />
          </td>
          <td className="w-[200px]">{phim.tenPhim}</td>
          <td className="px-20">{phim.moTa}</td>
          <td className="px-[75px]" style={{ width: 300 }}>
            <Button
              className="text-red-500"
              onClick={async () => {
                deleteMutation.mutate(phim);
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </Button>
            <Button
              className="text-yellow-500"
              onClick={() => {
                const film = data.find((item) => {
                  return item.maPhim == phim?.maPhim;
                });
                console.log("film: ", film);
                dispatch(quanLyPhimActions.setFilm(film));
                dispatch(quanLyPhimActions.setImgUrl(film?.hinhAnh));
                navigate(PATH.editFilm);
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="px-20 container mt-[50px]">
      <h1 className="text-center m-30 text-30 font-500">Danh sách phim</h1>
      <Button
        onClick={() => {
          navigate(PATH.addNewFilm);
        }}
      >
        <i className="fa-solid fa-plus text-green-700"></i>
      </Button>
      <div className="py-10">
        <Input className="inline-block" style={{ width: "95%" }} />
        <Button className="inline-block mx-10">
          <i className="fa-solid fa-magnifying-glass text-blue-700"></i>
        </Button>
      </div>

      <table className="min table-fixed">
        <thead className="bg-black text-white">
          <tr>
            <th>Mã phim</th>
            <th>Hình ảnh</th>
            <th>Tên phim</th>
            <th>Mô tả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>{renderFilms(data?.data.content)}</tbody>
      </table>
    </div>
  );
};
