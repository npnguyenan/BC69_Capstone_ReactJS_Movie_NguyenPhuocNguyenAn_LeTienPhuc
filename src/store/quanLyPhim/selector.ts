import { useSelector } from "react-redux";
import { RootState } from "..";

export const useQuanLyPhimSelector = () =>
  useSelector((state: RootState) => state.quanLyPhimReducer);
