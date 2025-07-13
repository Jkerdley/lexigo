import type { RouteProps } from "react-router-dom";

import { TranslatePage } from "../../pages/translatePage";
import { HistoryList } from "../../modules/history/components/HistoryList/HistoryList";


export enum AppRoutes {
    MAIN = "main",
    TRANSLATION = "translation",
    HISTORY = "history",
    NOT_FOUND = "not-found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "translate",
    [AppRoutes.TRANSLATION]: "text_translation",
    [AppRoutes.HISTORY]: "history",
    [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <TranslatePage />
    },
    [AppRoutes.TRANSLATION]: {
        path: RoutePath.translation,
        element: "",
    },
    [AppRoutes.HISTORY]: {
        path: RoutePath.history,
        element: <HistoryList />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath["not-found"],
        element: ""
    },
};
