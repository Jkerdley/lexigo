import type { RouteProps } from "react-router-dom";
import { TranslationTab } from "../../modules/translation/components/TranslationTab/TranslationTab";
import { HistoryList } from "../../modules/history/components/HistoryList/HistoryList";
import { ManualTranslationTab } from "../../modules/translation/components/ManualTranslationTab/ManualTranslationTab";

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
        element: <TranslationTab /> 
    },
    [AppRoutes.TRANSLATION]: {
        path: RoutePath.translation,
        element: <ManualTranslationTab />,
    },
    [AppRoutes.HISTORY]: {
        path: RoutePath.history,
        element: <HistoryList />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath[AppRoutes.NOT_FOUND],
        element: <div>Страница не найдена</div>
    },
};