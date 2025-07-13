import { Routes, Route } from "react-router-dom";
import type { RouteProps } from "react-router-dom";
import { Suspense, useCallback } from "react";
import { routeConfig } from "./routeConfig";
import { Main } from '../../pages/main'

export const AppRouter = () => {

    const renderWithRoutes = useCallback((route: RouteProps) => {
        const element = (
            <Suspense fallback={"...загрузка"}> //сюда можем подкрутить лоадер/спинер
                {route.element}
            </Suspense>
        )
        return (
            <Route
              key={route.path}
              path={route.path}
              element={element}
            >
            </Route>
        )
    }, [])
   
    return  (
      <Routes>
        <Route path='/' element={<Main />}>
            {Object.values(routeConfig).map(renderWithRoutes)}
        </Route>
      </Routes>
    )
};
