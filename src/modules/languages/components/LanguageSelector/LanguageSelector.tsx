import { useState, useRef, useEffect } from "react";
import { LANGUAGES } from "../../constants/languages";
import "./language-selector.scss";

interface Props {
    language: string;
    callback: (newLanguage: string) => void;
    disabledLanguages?: string[];
}
export const LanguageSelector = ({ language, callback, disabledLanguages = [] }: Props) => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>(language);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedLanguage(language);
    }, [language]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="custom-select-container" ref={dropdownRef}>
            <div className="custom-select-header" onClick={() => setIsOpen(!isOpen)}>
                <img
                    src={LANGUAGES.find((l) => l.id === selectedLanguage)?.imgRounded}
                    alt={selectedLanguage}
                    className="language-flag"
                />
                <span className="language-title">
                    {LANGUAGES.find((l) => l.id === selectedLanguage)?.title}
                </span>
                <img className="arrow" src="/downarrow.svg" alt="Выбрать язык" />
            </div>

            {isOpen && (
                <div className="custom-select-options">
                    {LANGUAGES.map((language) => (
                        <div
                            key={language.id}
                            className={`custom-option ${
                                disabledLanguages.includes(language.id) ? "disabled" : ""
                            }`}
                            onClick={() => {
                                if (!disabledLanguages.includes(language.id)) {
                                    setSelectedLanguage(language.id);
                                    callback(language.id);
                                    setIsOpen(false);
                                }
                            }}
                        >
                            <img src={language.imgRounded} alt={language.title} className="language-flag" />
                            <span>{language.title}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
