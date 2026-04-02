import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { routeConfig } from "./routeConfig";
import { Main } from "../../pages/MainPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}>
                {Object.values(routeConfig).map((route) => (
                    <Route 
                        key={route.path} 
                        path={route.path} 
                        element={
                            <Suspense fallback={"...загрузка"}>
                                {route.element}
                            </Suspense>
                        } 
                    />
                ))}
            </Route>
        </Routes>
    );
};