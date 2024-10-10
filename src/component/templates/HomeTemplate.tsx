import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { quanLyPhimServices } from "../../services";
import { Card, Button, Skeleton } from "antd";
import { sleep } from "../../utils";
import { generatePath, useNavigate } from "react-router-dom";
import { PATH } from "../../constants";

export const HomeTemplate = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  /* Lấy danh sách phim */
  const { data, isFetching } = useQuery({
    queryKey: ["DanhSachPhim"],
    queryFn: async () => {
      await sleep(1000);
      return quanLyPhimServices.getDanhSachPhim("?maNhom=GP01");
    },
    staleTime: 5 * 60 * 1000,
    enabled: true,
  });

  if (isFetching) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col space-y-3 p-4 bg-white shadow-lg rounded-lg"
            >
              <Skeleton.Input
                active
                className="!w-[240px] !h-[320px] rounded-md"
              />
              <Skeleton.Input active className="!w-[180px] " />
              <Skeleton.Input active className="!w-[120px] " />
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-gray-500">Loading........</p>
      </div>
    );
  }

  const danhSachPhim = data?.data.content || [];
  const phimHienThi = showMore ? danhSachPhim : danhSachPhim.slice(0, 12);

  return (
    <div className="relative">
      <h1 className="font-900 text-slate-800 text-center text-30">
        Danh Sách Phim
      </h1>

      <div className="relative overflow-hidden">
        <img
          src="/images/img_dsPhim.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-[90vh] object-cover z-0 !rounded-2xl"
        />
        <div className="container mx-auto relative z-10 h-[70vh] overflow-y-scroll scroll-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 justify-center">
            {phimHienThi.map((phim) => (
              <div key={phim.maPhim} className="flex justify-center mt-4 mb-2">
                <Card
                  hoverable
                  className="w-56 bg-zinc-900 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                  cover={
                    <img
                      alt="example"
                      src={phim.hinhAnh}
                      className="w-full h-[220px] object-cover rounded-lg p-2 border-r-2"
                    />
                  }
                >
                  <Card.Meta
                    title={
                      <div
                        style={{
                          color: "white",
                          wordWrap: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {phim.tenPhim}
                      </div>
                    }
                  />
                  <Button
                    className="mt-10"
                    onClick={() => {
                      const path = generatePath(PATH.filmDetail, {
                        id: phim.maPhim,
                      });
                      navigate(path);
                    }}
                  >
                    Đặt vé
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 z-20">
        {danhSachPhim.length > 12 && (
          <Button
            type="text"
            className="bg-black hover:!bg-slate-800 !text-white font-semibold py-2 px-4 rounded-md"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Thu gọn" : "Xem thêm"}
          </Button>
        )}
      </div>

      <p className="font-900 text-30 mt-30 text-center text-slate-800 ">
        Phim đang Chiếu
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {" "}
        {data?.data.content
          ?.filter((item) => !item.dangChieu)
          .slice(0, 4)
          .map((phim) => {
            return (
              <div key={phim.maPhim} className="flex justify-center mt-4 mb-2">
                <Card
                  hoverable
                  className="w-72 bg-gradient-to-r from-gray-800 to-black shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                  cover={
                    <img
                      alt="example"
                      src={phim.hinhAnh}
                      className="w-full h-[300px] object-cover rounded-lg p-2 border-r-2"
                    />
                  }
                >
                  <Card.Meta
                    title={
                      <div
                        style={{
                          color: "white",
                          wordWrap: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {phim.tenPhim}
                      </div>
                    }
                  />
                  <Button
                    className="mt-10"
                    onClick={() => {
                      const path = generatePath(PATH.filmDetail, {
                        id: phim.maPhim,
                      });
                      navigate(path);
                    }}
                  >
                    Đặt vé
                  </Button>
                </Card>
              </div>
            );
          })}
      </div>

      <p className="font-900 text-30 mt-30 text-center text-slate-800 ">
        Phim sắp Chiếu
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {" "}
        {data?.data.content
          ?.filter((item) => item.dangChieu)
          .slice(0, 4)
          .map((phim) => {
            return (
              <div>
                <div
                  key={phim.maPhim}
                  className="flex justify-center mt-4 mb-2"
                >
                  <Card
                    hoverable
                    className="w-72 bg-gradient-to-r from-gray-800 to-black shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                    cover={
                      <img
                        alt="example"
                        src={phim.hinhAnh}
                        className="w-full h-[300px] object-cover rounded-lg p-2 border-r-2"
                      />
                    }
                  >
                    <Card.Meta
                      title={
                        <div
                          style={{
                            color: "white",
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          {phim.tenPhim}
                        </div>
                      }
                    />
                    <Button
                      className="mt-10"
                      onClick={() => {
                        const path = generatePath(PATH.filmDetail, {
                          id: phim.maPhim,
                        });
                        navigate(path);
                      }}
                    >
                      Đặt vé
                    </Button>
                  </Card>
                </div>
              </div>
            );
          })}
      </div>
      <h1 className="text-red-900 font-900 text-[30px] text-center m-9">
        __Thanks And See You Again__
      </h1>
    </div>
  );
};
