import { useParams } from "react-router-dom";
import { useFilmDetailById, useGetShowtimesById } from "../../hooks/api";
import { Button, Collapse, Modal, Tabs } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { quanLyDatVe } from "../../services";
import { objectToQueryString } from "../../utils";
import cn from "classnames";
import styled from "styled-components";
import { LoaiGhe } from "../../@types";

export const FilmDetailTemplate = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [maLichChieu, setMaLichChieu] = useState<string | undefined>();

  const { id = "" } = useParams();
  const { data } = useFilmDetailById({ id });
  const { data: showtimes } = useGetShowtimesById({ id });

  const { data: danhSachPhongVe } = useQuery({
    queryKey: ["DanhSachPhongVe", maLichChieu],
    queryFn: () =>
      quanLyDatVe.layDanhSachDatVe(
        objectToQueryString({
          maLichChieu,
        })
      ),
    enabled: !!maLichChieu,
  });

  return (
    <Container>
      <div className="grid grid-cols-2 gap-8">
        <ImageContainer>
          <img
            src={data?.hinhAnh}
            alt={data?.tenPhim}
            className="rounded-lg shadow-lg object-cover"
          />
        </ImageContainer>
        <FilmInfo>
          <h1 className="font-bold text-4xl mb-4 text-gray-800">
            {data?.tenPhim}
          </h1>
          <p className="text-lg text-gray-700">{data?.moTa}</p>
        </FilmInfo>
      </div>

      <ShowtimeTabs>
        <Tabs
          items={showtimes?.heThongRapChieu.map((item) => ({
            key: item?.maHeThongRap,
            label: (
              <div className="uppercase font-semibold text-gray-800">
                {item?.tenHeThongRap}
              </div>
            ),
            children: (
              <div className="space-y-6">
                {item?.cumRapChieu.map((cumRapChieu) => (
                  <Collapse
                    key={cumRapChieu.maCumRap}
                    className="shadow-md rounded-lg"
                    items={[
                      {
                        key: cumRapChieu.maCumRap,
                        label: (
                          <div>
                            <p className="font-semibold text-xl text-gray-900">
                              {cumRapChieu.tenCumRap}
                            </p>
                            <p className="text-gray-500">
                              {cumRapChieu.diaChi}
                            </p>
                          </div>
                        ),
                        children: (
                          <div className="flex flex-wrap gap-4">
                            {cumRapChieu.lichChieuPhim.map((lichChieuPhim) => (
                              <Button
                                key={lichChieuPhim.maLichChieu}
                                type="primary"
                                className="px-4 py-2 shadow-md rounded-lg hover:shadow-xl"
                                onClick={() => {
                                  setIsOpenModal(true);
                                  setMaLichChieu(lichChieuPhim.maLichChieu);
                                }}
                              >
                                {dayjs(lichChieuPhim.ngayChieuGioChieu).format(
                                  "DD-MM-YYYY, hh:mm A"
                                )}{" "}
                                -{" "}
                                {dayjs(lichChieuPhim.ngayChieuGioChieu)
                                  .add(lichChieuPhim.thoiLuong, "minutes")
                                  .format("hh:mm A")}
                              </Button>
                            ))}
                          </div>
                        ),
                      },
                    ]}
                  />
                ))}
              </div>
            ),
          }))}
        />
      </ShowtimeTabs>

      <Modal
        width={800}
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
          setMaLichChieu(undefined);
        }}
        footer={null}
        centered
        className="rounded-lg"
      >
        <div className="text-center mb-8">
          <Screen className="w-full h-10 bg-orange-500 mx-auto rounded-lg text-lg text-white flex items-center justify-center">
            Màn Hình
          </Screen>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-6">
          {danhSachPhongVe?.data.content.danhSachGhe?.map((ghe) => (
            <Ghe
              key={ghe.maGhe}
              className={cn({
                daDat: ghe.daDat,
                gheThuong: ghe.loaiGhe === LoaiGhe.THUONG,
                gheVip: ghe.loaiGhe === LoaiGhe.VIP,
              })}
            >
              {ghe.tenGhe}
            </Ghe>
          ))}
        </div>

        <Legend className="flex items-center justify-center gap-6 mt-8">
          <LegendItem>
            <div className="bg-black w-6 h-6 rounded"></div>
            <p className="text-sm">: Ghế Đã Đặt</p>
          </LegendItem>
          <LegendItem>
            <div className="bg-green-600 w-6 h-6 rounded"></div>
            <p className="text-sm">: Ghế Thường</p>
          </LegendItem>
          <LegendItem>
            <div className="bg-red-500 w-6 h-6 rounded"></div>
            <p className="text-sm">: Ghế VIP</p>
          </LegendItem>
        </Legend>
        <div className="flex justify-end">
          <Button className="flex items-center" type="primary">Đặt Vé</Button>
        </div>
      </Modal>
    </Container>
  );
};

// --------styled components---------
const Container = styled.div`
  padding: 20px;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  img {
    transition: transform 0.3s ease;
  }
  &:hover img {
    transform: scale(1.05);
  }
`;

const FilmInfo = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ShowtimeTabs = styled.div`
  margin-top: 20px;
`;

const Ghe = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fff;
  border-radius: 6px;
  transition: transform 0.2s;

  &.gheThuong {
    background-color: green;
  }
  &.gheVip {
    background-color: red;
  }
  &.daDat {
    background-color: #000000c4;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const Screen = styled.div`
  padding: 10px 0;
  font-weight: bold;
`;

const Legend = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  p {
    margin: 0;
  }
`;
