// import { Input } from "antd";
import { Outlet } from "react-router-dom";

export const FilmsManageTemplate = () => {
  return (
    <div className="container pt-[50px]">
      <h1 className="text-center m-30 text-30 font-500">Quản lý phim</h1>
      <Outlet />
    </div>
  );
};
