import { createSlice } from "@reduxjs/toolkit";
import { api, type TranslateRequest } from "../../translation/api/service";
import { type Current } from "../../translation/store/translationSlice";

interface HistoryState {
  historyItems: Current[];
}

const initialState: HistoryState = { historyItems: [] };

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    clearHistory: (state) => {
      state.historyItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.translate.matchFulfilled, (state, { meta, payload }) => {
      const args = (meta.arg as { originalArgs: TranslateRequest }).originalArgs;
      const newHistoryItem: Current = {
        original: args.text,
        from: args.source ?? "",
        to: args.target ?? "ru",
        gender: args.gender ?? "FEMALE",
        translated: payload.translatedText,
        audio: payload.audioContent,
        loading: false,
        ts: Date.now(),
      };

      const isDuplicate = state.historyItems.some((item) => item.original === newHistoryItem.original);

      if (!isDuplicate) {
        state.historyItems.unshift(newHistoryItem);
      }
    });
  },
});

export const { clearHistory } = historySlice.actions;
