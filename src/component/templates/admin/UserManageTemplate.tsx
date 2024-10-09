// import { Input } from "antd";
import { Outlet } from "react-router-dom";

export const UserManageTemplate = () => {
  return (
    <div className="container">
      <h1 className="text-center m-30 text-30 font-500">Quản lý người dùng</h1>
      <Outlet />
    </div>
  );
};
