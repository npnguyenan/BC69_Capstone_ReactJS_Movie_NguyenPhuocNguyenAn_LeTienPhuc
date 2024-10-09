import { useRoutes } from "react-router-dom";
import { PATH } from "../constants";
import { FilmDetail, Films, Home, Login, Register, User } from "../pages";
import { AuthLayout, MainLayout } from "../component";
import { AdminAuthLayout, AdminMainLayout } from "../component/layouts/admin";
import { AdminLogin } from "../pages/admin";
import {
  AddNewFilmTemplate,
  EditFilmTemplate,
  FilmsManageTemplate,
} from "../component/templates/admin";

export const routers = () =>
  useRoutes([
    {
      element: <AuthLayout />,
      children: [
        {
          path: PATH.register,
          element: <Register />,
        },
        {
          path: PATH.login,
          element: <Login />,
        },
      ],
    },
    // {
    //   element: <AdminAuthLayout />,
    //   children: [
    //     {
    //       element: <AdminLogin />,
    //       path: PATH.adminLogin,
    //     },
    //   ],
    // },
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: PATH.filmDetail,
          element: <FilmDetail />,
        },
      ],
    },
    {
      element: <AdminMainLayout />,
      children: [
        {
          path: PATH.films,
          element: <Films />,
        },
        {
          element: <FilmsManageTemplate />,
          children: [
            {
              element: <AddNewFilmTemplate />,
              path: PATH.addNewFilm,
            },
            {
              element: <EditFilmTemplate />,
              path: PATH.editFilm,
            },
          ],
        },
        {
          element: <User />,
          path: PATH.user,
        },
      ],
    },
  ]);
