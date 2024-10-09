import { Button, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import { sleep } from "../../../utils";
import { quanLyNguoiDungServices } from "../../../services";
import { User } from "../../../@types";
import { useAppDispatch } from "../../../store";
import {
  quanLyPhimActions,
  useQuanLyPhimSelector,
} from "../../../store/quanLyPhim";

export const ListUserTemplate = () => {
  const dispatch = useAppDispatch();
  const { reload } = useQuanLyPhimSelector();
  {
    if (reload) {
      window.location.reload();
      dispatch(quanLyPhimActions.setReload(false));
    }
  }

  //   Lấy danh sách người dùng
  let { data } = useQuery({
    queryKey: ["DanhSachNguoiDung"],
    queryFn: async () => {
      await sleep(1000 * 1);
      return quanLyNguoiDungServices.getDanhSach("?maNhom=GP04");
    },
    staleTime: 5 * 60 * 1000,
    // true:  gọi API, false: ko gọi
    enabled: true,
  });

  console.log("data: ", data?.data.content);
  const renderUsers = (data: User[] = []) => {
    console.log("render");
    return data.map((user, index = 0) => {
      index++;
      return (
        <tr key={user.taiKhoan}>
          <td className="px-[30px]">{index}</td>
          <td className="px-[50px]">{user.taiKhoan}</td>
          <td className="px-[50px]">{user.matKhau}</td>
          <td className="px-[50px]">{user.hoTen}</td>
          <td className="px-[50px]">{user.email}</td>
          <td className="px-[50px]">{user.soDT}</td>
          <td className="px-[75px]" style={{ width: 300 }}>
            <Button className="text-red-500" onClick={async () => {}}>
              <i className="fa-solid fa-trash"></i>
            </Button>
            <Button className="text-yellow-500" onClick={() => {}}>
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="px-20 container mt-[100px]">
      <h1 className="text-center m-30 text-30 font-500">Quản lý người dùng</h1>
      <Button onClick={() => {}}>
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
            <th>STT</th>
            <th className="mx-[50px]">Tài khoản</th>
            <th className="mx-[50px]">Mật khẩu</th>
            <th className="mx-[20px]">Họ tên</th>
            <th className="mx-[20px]">Email</th>
            <th className="mx-[20px]">Số điện thoại</th>
            <th className="mx-[20px]">Thao tác</th>
          </tr>
        </thead>
        <tbody>{renderUsers(data?.data.content)}</tbody>
      </table>
    </div>
  );
};
