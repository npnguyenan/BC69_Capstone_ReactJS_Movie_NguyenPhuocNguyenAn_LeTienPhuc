import { Navigate, Outlet } from "react-router-dom";

import { useQuanLyNguoiDungSelector } from "../../store/quanLyNguoiDung/selector";

export const AuthLayout = () => {
  const { user } = useQuanLyNguoiDungSelector();

  // navigate về home khi user đã đăng nhập nhưng vẫn dùng thanh url để quay lại trang đnhập đký
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="AuthLayout h-full">
      <div className="h-screen w-screen relative ">
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            className="w-full h-full object-cover object-center"
            src="/images/login_background.jpg"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black z-10 opacity-50 "></div>
        <div className="absolute w-[450px] p-[30px] top-1/2 left-1/2 bg-[rgba(0,0,0,.75)] z-20 -translate-x-1/2 -translate-y-1/2 rounded-md">
          <div className="w-full h-full overflow-auto text-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
