import { useMutation } from "@tanstack/react-query";

import { quanLyPhimServices } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { sleep } from "../../utils";
import { PATH } from "../../constants";
import { useAppDispatch } from "../../store";
import { quanLyPhimActions } from "../../store/quanLyPhim";

export const useAddFilmMutation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const addFilmMutation = useMutation({
    mutationFn: (payload: FormData) => quanLyPhimServices.addPhim(payload),
    onSuccess: async (data: any, payload: FormData) => {
      console.log("payload: ", payload);
      console.log("data: ", data);
      toast.success("Thêm phim thành công");
      dispatch(quanLyPhimActions.setReload(true));
      await sleep(3000);
      navigate(PATH.films);
    },
    onError: (error: any) => {
      console.log("error: ", error);
      toast.error(error.response.data.content);
    },
  });
  return addFilmMutation;
};
