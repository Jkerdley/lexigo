import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { persistReducer, persistStore  } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import settingsReducer from '../store/settingsSlice';

const persistConfig = {
    key: "root",
    storage
}


const persistedSettings = settingsReducer;

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    settings: persistedSettings,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(api.middleware),
    devTools: true,
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
