import { Navigate } from "react-router-dom";
import { FilmsFormTemplate } from "./FilmsFormTemplate";
import { PATH } from "../../../constants";
import { useQuanLyPhimSelector } from "../../../store/quanLyPhim";

export const EditFilmTemplate = () => {
  const { film } = useQuanLyPhimSelector();
  if (!film) return <Navigate to={PATH.films} />;
  return (
    <>
      <FilmsFormTemplate value={film} />
    </>
  );
};
