import { useParams } from "react-router-dom";
import { useFilmDetailById, useGetShowtimesById } from "../../hooks/api";

export const FilmDetailTemplate = () => {
  const { id = "" } = useParams();
  console.log("id: ", id);

  //  lấy chi tiết phim
  const { data } = useFilmDetailById({ id });

  // lấy lịch chiếu phim
  const { data: showtimes } = useGetShowtimesById({ id });
  console.log("showtimes: ", showtimes);

  return (
    <div className="container">
      <div className="grid grid-cols-2">
        <div>
          <img src={data?.hinhAnh} alt="..." />
        </div>
        <div>
          <p>{data?.tenPhim}</p>
          <p>{data?.moTa}</p>
        </div>
      </div>
    </div>
  );
};
