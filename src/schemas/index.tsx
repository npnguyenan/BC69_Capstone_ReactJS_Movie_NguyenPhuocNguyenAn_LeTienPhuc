import { useRoutes } from "react-router-dom";
import { Films, Login } from "../pages";
import { PATH } from "../constants";
import { User } from "../pages/User";
import { MainLayout, AuthLayout } from "../components/layouts";
import {
  AddNewFilmTemplate,
  EditFilmTemplate,
  FilmsManageTemplate,
} from "../components/templates";

export const routers = () =>
  useRoutes([
    {
      element: <AuthLayout />,
      children: [{ path: PATH.login, element: <Login /> }],
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: PATH.films,
          element: <Films />,
        },
        {
          element: <FilmsManageTemplate />,
          children: [
            {
              path: PATH.addNewFilm,
              element: <AddNewFilmTemplate />,
            },
            {
              path: PATH.editFilm,
              element: <EditFilmTemplate />,
            },
          ],
        },
        {
          path: PATH.user,
          element: <User />,
        },
        {},
      ],
    },
  ]);
