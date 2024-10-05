import { Avatar, Button, Divider, Popover } from "antd";
import {
  quanLyNguoiDungActions,
  useQuanLyNguoiDungSelector,
} from "../../store/quanLyNguoiDung";
import { useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useQuanLyNguoiDungSelector();
  console.log("user: ", user);

  return (
    <div>
      (
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="../../../images/images.png"
              className="h-[40px]"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Movie Booking
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ? (
              <div className="flex items-center gap-10">
                <Popover
                  content={
                    <div className="flex flex-col p-3">
                      <Button>Thông tin tài khoản</Button>
                      <div className="text-center">
                        <Divider />
                        <Button
                          danger
                          className="w-full"
                          onClick={() => {
                            dispatch(quanLyNguoiDungActions.logOut());
                          }}
                        >
                          Đăng xuất
                        </Button>
                      </div>
                    </div>
                  }
                >
                  <Avatar
                    size={"large"}
                    className="bg-[#87d068]"
                    icon={<i className="fa-regular fa-user"></i>}
                  />
                </Popover>
                <p className="text-white">Hi, {user?.hoTen}</p>
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => navigate(PATH.login)}
                  type="text"
                  className="text-black bg-white font-900  border-spacing-4 hover:!bg-slate-300 me-2"
                >
                  Đăng nhập
                </Button>

                <Button
                  onClick={() => navigate(PATH.register)}
                  type="text"
                  className="text-black bg-red-600 font-900 hover:!bg-red-700"
                >
                  Đăng ký
                </Button>
              </div>
            )}

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 font-900 text-[20px]"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      )
    </div>
  );
};
