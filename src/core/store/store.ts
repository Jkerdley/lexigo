import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
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
