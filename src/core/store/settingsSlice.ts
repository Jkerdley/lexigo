import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface SettingsState {
    autoPlayVoice: boolean;
}
const initialState: SettingsState = { autoPlayVoice: false };

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleAutoPlay(state) {
            state.autoPlayVoice = !state.autoPlayVoice;
        },
    },
});

export const { toggleAutoPlay } = settingsSlice.actions;
export default persistReducer({ key: 'settings', storage }, settingsSlice.reducer);
