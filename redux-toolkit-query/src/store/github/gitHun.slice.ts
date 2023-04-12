import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_FAV_KEY = "rfk";

interface IGitHubState {
  favotites: string[];
}

const initialState: IGitHubState = {
  favotites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

export const gitHubSlice = createSlice({
  name: "github",
  initialState: initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      state.favotites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favotites));
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favotites = state.favotites.filter((f) => f !== action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favotites));
    },
  },
});

export const githubActions = gitHubSlice.actions;
export const githubReduser = gitHubSlice.reducer;
