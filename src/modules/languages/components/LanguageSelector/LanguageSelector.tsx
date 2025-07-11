import { useState, useRef, useEffect } from "react";
import { LANGUAGES } from "../../constants/languages";
import "./language-selector.scss";

export const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>("RU");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    const selectedLang = LANGUAGES.find((lang) => lang.id === selectedLanguage);

    return (
        <div className="custom-select-container" ref={dropdownRef}>
            <div className="custom-select-header" onClick={() => setIsOpen(!isOpen)}>
                {selectedLang && (
                    <>
                        <img
                            src={selectedLang.imgRounded}
                            alt={selectedLang.title}
                            className="language-flag"
                        />
                        <span className="language-title">{selectedLang.title}</span>
                    </>
                )}
                <img className="arrow" src="/downarrow.svg" alt="Выбрать язык" />
            </div>

            {isOpen && (
                <div className="custom-select-options">
                    {LANGUAGES.map((language) => (
                        <div
                            key={language.id}
                            className="custom-option"
                            onClick={() => {
                                setSelectedLanguage(language.id);
                                setIsOpen(false);
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
