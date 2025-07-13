import { createSlice } from '@reduxjs/toolkit';
import { api, type TranslateRequest } from '../api/service';

export interface Current {
    original   : string;
    from       : string;
    to         : string;
    translated : string;
    audio?     : string;
    ts         : number;
}
interface State {
    current: Current | null;
}
const initialState: State = { current: null };

const slice = createSlice({
    name: 'currentTranslation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.translate.matchFulfilled,
            (state, { meta, payload }) => {
                const args = (meta.arg as { originalArgs: TranslateRequest }).originalArgs;
                const { text, source = '', target = 'ru' } = args;

                state.current = {
                    original  : text,
                    from      : source,
                    to        : target,
                    translated: payload.translatedText,
                    audio     : payload.audioContent,
                    ts        : Date.now(),
                };
            },
        );
    },
});

export default slice.reducer;