import { NavLink } from "react-router-dom";
import { PATH } from "../../constants";

// import cn from "classnames";
export const SideBar = () => {
  return (
    <div className="p-20 bg-gray-500 pt-[50px]">
      <NavLink to={PATH.films}>
        <h2 className="text-20 font-bold text-white hover:text-blue-400 py-10">
          Quản lý phim
        </h2>
      </NavLink>
      <hr />
      <NavLink to={PATH.user}>
        <h2 className="text-20 font-bold text-white hover:text-blue-400 py-10">
          Quản lý người dùng
        </h2>
      </NavLink>
    </div>
  );
};
