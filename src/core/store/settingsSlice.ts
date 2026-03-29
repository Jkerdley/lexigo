import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface SettingsState {
  autoPlayVoice: boolean;
  gender: "FEMALE" | "MALE" | "NEUTRAL";
  sourceLang: string;
  targetLang: string;
}

const initialState: SettingsState = {
  autoPlayVoice: false,
  gender: "FEMALE",
  sourceLang: "EN",
  targetLang: "RU",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleAutoPlay(state) {
      state.autoPlayVoice = !state.autoPlayVoice;
    },
    setGender(state, action: PayloadAction<SettingsState["gender"]>) {
      state.gender = action.payload;
    },
    setSourceLang(state, action: PayloadAction<string>) {
      state.sourceLang = action.payload;
    },
    setTargetLang(state, action: PayloadAction<string>) {
      state.targetLang = action.payload;
    },
    swapLangs(state) {
      const temp = state.sourceLang;
      state.sourceLang = state.targetLang;
      state.targetLang = temp;
    },
  },
});

export const { toggleAutoPlay, setGender, setSourceLang, setTargetLang, swapLangs } = settingsSlice.actions;
export default persistReducer({ key: "settings", storage }, settingsSlice.reducer);
