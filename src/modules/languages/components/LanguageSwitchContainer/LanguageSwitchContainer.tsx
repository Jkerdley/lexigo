import { useState } from "react";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import "./language-switch-container.scss";
import { LANGUAGES } from "../../constants/languages";

interface Props {
    isAbleToSwitch?: boolean;
}
export const LanguageSwitchContainer = ({ isAbleToSwitch }: Props) => {
    const [sourceLanguage, setSourceLanguage] = useState<string>("EN");
    const [targetLanguage, setTargetLanguage] = useState<string>("RU");

    const switchLanguage = () => {
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);
    };

    const handleSourceChange = (newLanguage: string) => {
        if (newLanguage !== targetLanguage) {
            setSourceLanguage(newLanguage);
        }
    };

    const handleTargetChange = (newLanguage: string) => {
        if (newLanguage !== sourceLanguage) {
            setTargetLanguage(newLanguage);
        }
    };
    const disabledSourceLanguage = LANGUAGES.filter((lang) => lang.id !== sourceLanguage).map(
        (lang) => lang.id
    );
    const disabledTargetLanguage = [sourceLanguage];

    console.log("langs", sourceLanguage, targetLanguage);

    return (
        <article className="language-switch-container">
            <img className="language-switch-container__logo" src="/LexiGo3.svg" alt="logo" />
            <div className="languages-container">
                <LanguageSelector
                    language={sourceLanguage}
                    callback={handleSourceChange}
                    disabledLanguages={disabledSourceLanguage}
                />
                {isAbleToSwitch && (
                    <img
                        className="swap-button"
                        src="/Arrow 1.svg"
                        alt="Поменять языки местами"
                        onClick={switchLanguage}
                    />
                )}

                <LanguageSelector
                    language={targetLanguage}
                    callback={handleTargetChange}
                    disabledLanguages={disabledTargetLanguage}
                />
            </div>
        </article>
    );
};

export default LanguageSwitchContainer;
