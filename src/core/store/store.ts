import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
// import someSlice from "./someSlice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        // someData: someSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
