import { useState } from "react";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import "./language-switch-container.scss";
import { LANGUAGES } from "../../constants/languages";

import { useAppSelector } from "../../../../core/store/store";

import { useTranslate } from "../../../translation/hooks/useTranslation.ts";


interface Props {
    isAbleToSwitch?: boolean;
}
export const LanguageSwitchContainer = ({ isAbleToSwitch }: Props) => {
    const [sourceLanguage, setSourceLanguage] = useState<string>("EN");
    const [targetLanguage, setTargetLanguage] = useState<string>("RU");
    const currentTranslation = useAppSelector((state) => state.currentTranslation.current);
    const gender = useAppSelector((s) => s.settings.gender);
    const autoPlayVoice = useAppSelector((s) => s.settings.autoPlayVoice);

    const { translate } = useTranslate(autoPlayVoice);


    const switchLanguage = () => {
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);

        if (currentTranslation?.original) {
            translate({
                text: currentTranslation.original,
                target: sourceLanguage,
                source: targetLanguage,
                speak: true,
                gender,
            });
        }
    };

    const handleSourceChange = (newLanguage: string) => {
        if (newLanguage !== targetLanguage) {
            setSourceLanguage(newLanguage);
        }
    };

    const handleTargetChange = (newLanguage: string) => {
        if (newLanguage !== sourceLanguage) {
            setTargetLanguage(newLanguage);

            if (currentTranslation?.original) {
                translate({
                    text: currentTranslation.original,
                    target: newLanguage,
                    source: sourceLanguage,
                    speak: true,
                    gender,
                });
            }
        }
    };

    const disabledSourceLanguage = LANGUAGES.filter((lang) => lang.id !== sourceLanguage).map(
        (lang) => lang.id
    );
    const disabledTargetLanguage = [sourceLanguage];

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
