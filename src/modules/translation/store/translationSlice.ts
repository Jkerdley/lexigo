import { createSlice } from "@reduxjs/toolkit";
import { api, type TranslateRequest } from "../api/service";

export interface Current {
    original: string;
    from: string;
    to: string;
    gender?: "FEMALE" | "MALE" | "NEUTRAL";
    translated?: string;
    audio?: string;
    loading: boolean;
    error?: string;
    ts: number;
}
interface State { current: Current | null }
const initialState: State = { current: null };

const slice = createSlice({
    name: 'currentTranslation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.translate.matchPending,
            (state, { meta }) => {
                const args = (meta.arg as { originalArgs: TranslateRequest }).originalArgs;
                state.current = {
                    original: args.text,
                    from: args.source ?? '',
                    to: args.target ?? 'ru',
                    gender: args.gender ?? 'FEMALE',
                    loading: true,
                    ts: Date.now(),
                };
            },
        );
        builder.addMatcher(
            api.endpoints.translate.matchFulfilled,
            (state, { meta, payload }) => {
                const args = (meta.arg as { originalArgs: TranslateRequest }).originalArgs;
                const { text, source = '', target = 'ru', gender = 'FEMALE' } = args;

                state.current = {
                    original: text,
                    from: source,
                    to: target,
                    gender,
                    translated: payload.translatedText,
                    audio: payload.audioContent,
                    loading: false,
                    ts: Date.now(),
                };
            },
        );
        builder.addMatcher(
            api.endpoints.translate.matchRejected,
            (state, { error, meta }) => {
                const args = (meta.arg as { originalArgs: TranslateRequest }).originalArgs;
                state.current = {
                    original : args.text,
                    from: args.source ?? '',
                    to: args.target ?? 'ru',
                    gender: args.gender ?? 'FEMALE',
                    loading: false,
                    error: error?.message ?? 'Ошибка перевода',
                    ts: Date.now(),
                };
            },
        );
    },
});

export default slice.reducer;