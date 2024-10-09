import { useMutation } from "@tanstack/react-query";
import { Phim } from "../../@types";
import { quanLyPhimServices } from "../../services";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store";
import { quanLyPhimActions } from "../../store/quanLyPhim";
import { sleep } from "../../utils";

export const useDeleteMutation = () => {
  const dispatch = useAppDispatch();
  const deleteMutation = useMutation({
    mutationFn: (payload: Phim) =>
      quanLyPhimServices.deletePhimlById(`?maPhim=${payload.maPhim}`),
    onSuccess: async (payload) => {
      dispatch(quanLyPhimActions.deleteFilm(payload));
      toast.success("Xóa phim thành công");
      await sleep(3000);
      dispatch(quanLyPhimActions.setReload(true));
    },
    onError: (error: any) => {
      toast.error(error.response.data.content);
    },
  });
  return deleteMutation;
};
