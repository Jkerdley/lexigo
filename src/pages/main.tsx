import { Outlet } from "react-router-dom";
import { TextAreaContent } from "../components/typography";
import "./main-page.scss";
export const Main = () => {
    return (
        <main className="main-page__container">
            <h1 className="main-title">Welcome</h1>
            <img src="/LexiGo3.svg" alt="logo" />
            <p className="main-logo__text"></p>
            <TextAreaContent />
            <Outlet />
        </main>
    );
};
