import { createSlice } from "@reduxjs/toolkit";

const initialState = { historyItems: [] };

export const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addHistoryItem: (state, action) => {
            const currentTranslation = action.payload;
            const isDuplicate = state.historyItems.some(
                item => item.original === currentTranslation.original
            );

            if (!isDuplicate) {
                state.historyItems.push(currentTranslation);
            }
        },
        clearHistory: (state) => {
            state.historyItems = [];
        }
    }
});

export const { addHistoryItem, clearHistory } = historySlice.actions;