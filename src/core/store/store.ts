import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { api } from "./api/api";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import settingsReducer from '../store/settingsSlice';
// import someSlice from "./someSlice";


const persistedSettings = settingsReducer;

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        settings: persistedSettings,
        // someData: someSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(api.middleware),
    devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
