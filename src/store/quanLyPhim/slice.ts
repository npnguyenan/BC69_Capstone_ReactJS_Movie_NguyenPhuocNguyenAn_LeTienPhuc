import { createSlice } from "@reduxjs/toolkit";
import { Phim } from "../../@types";
import { InputFilmSchemaType } from "../../schemas";

type InitialState = {
  filmList: Phim[];
  film: InputFilmSchemaType | null;
  reload: boolean;
  imgUrl: string;
};

const initialState: InitialState = {
  filmList: [],
  film: null,
  reload: false,
  imgUrl: "",
};

export const { reducer: quanLyPhimReducer, actions: quanLyPhimActions } =
  createSlice({
    name: "quanLyPhim",
    initialState,

    // Xử lý action đồng bộ
    reducers: {
      setFilmList: (state, { payload }) => {
        state.filmList = payload;
      },
      deleteFilm: (state, { payload }) => {
        const newFilmList = [...state.filmList];
        const index = newFilmList.findIndex(
          (item) => item.maPhim == payload.maPhim
        );
        newFilmList.splice(index, 1);
        state.filmList = newFilmList;
      },
      setFilm: (state, { payload }) => {
        state.film = payload;
      },
      setReload: (state, { payload }) => {
        state.reload = payload;
      },
      setImgUrl: (state, { payload }) => {
        state.imgUrl = payload;
      },
    },
  });
