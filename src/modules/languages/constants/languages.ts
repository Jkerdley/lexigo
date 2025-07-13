export const LANGUAGES: Language[] = [
    {
        id: "EN",
        title: "Английский",
        img: "/languages/eng.svg",
        imgRounded: "/languages/engr.svg",
    },
    { id: "RU", title: "Русский", img: "/languages/ru.svg", imgRounded: "/languages/rur.svg" },
    { id: "DE", title: "Немецкий", img: "/languages/de.svg", imgRounded: "/languages/der.svg" },
    {
        id: "FR",
        title: "Французский",
        img: "/languages/fran.svg",
        imgRounded: "/languages/franr.svg",
    },
];

export type Language = {
    id: string;
    title: string;
    img: string;
    imgRounded: string;
};
