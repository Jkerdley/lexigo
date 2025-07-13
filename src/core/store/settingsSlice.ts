import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface SettingsState {
    autoPlayVoice: boolean;
    gender: 'FEMALE' | 'MALE' | 'NEUTRAL';
}
const initialState: SettingsState = {
    autoPlayVoice: false,
    gender: 'FEMALE',
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleAutoPlay(state) {
            state.autoPlayVoice = !state.autoPlayVoice;
        },
        setGender(state, action: PayloadAction<SettingsState['gender']>) {
            state.gender = action.payload;
        },
    },
});

export const { toggleAutoPlay, setGender } = settingsSlice.actions;
export default persistReducer({ key: 'settings', storage }, settingsSlice.reducer);
