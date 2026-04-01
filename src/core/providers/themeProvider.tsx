import {  useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ThemeContext, type Theme } from "./themeContext";



export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        const systemPrefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
        return savedTheme || (systemPrefersDark ? "dark" : "light");
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};
