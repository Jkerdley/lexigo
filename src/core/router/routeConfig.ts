import type { RouteProps } from "react-router-dom";

import { TranslatePage } from "../../pages/translatePage";

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
        element: "<div>translate goes here</div>",
    },
    [AppRoutes.TRANSLATION]: {
        path: RoutePath.translation,
        element: "<div>translate goes here</div>",
    },
    [AppRoutes.HISTORY]: {
        path: RoutePath.history,
        element: "<div>history goes here</div>",
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath["not-found"],
        element: "",
    },
};
