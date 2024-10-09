import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "../../../constants";
import { Header, SideBar } from "../../ui";
import { useQuanLyNguoiDungSelector } from "../../../store/quanLyNguoiDung";

export const AdminMainLayout = () => {
  const { user } = useQuanLyNguoiDungSelector();

  if (!user) return <Navigate to={PATH.login} />;
  return (
    <div>
      <div>
        <Header />
      </div>
      <main className="">
        <div className="grid grid-cols-10">
          <div className="col-span-2 bg-gray-600 min-h-[100vh]">
            <SideBar />
          </div>
          <div className="col-span-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
