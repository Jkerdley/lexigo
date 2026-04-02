import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import "./LanguageSwitchContainer.scss";
import { LANGUAGES } from "../../constants/languages";
import { useAppSelector, useAppDispatch } from "../../../../core/store/store";
import { useTranslate } from "../../../translation/hooks/useTranslation";
import { setSourceLang, setTargetLang, swapLangs } from "../../../../core/store/settingsSlice";
interface Props {
    isAbleToSwitch?: boolean;
}

export const LanguageSwitchContainer = ({ isAbleToSwitch }: Props) => {
    const dispatch = useAppDispatch();
    
    const settings = useAppSelector((s) => s.settings);
    const sourceLang = settings.sourceLang || "EN";
    const targetLang = settings.targetLang || "RU";
    const { gender, autoPlayVoice } = settings;

    const currentTranslation = useAppSelector((state) => state.currentTranslation.current);
    const { translate } = useTranslate(autoPlayVoice);

    const switchLanguage = () => {
        dispatch(swapLangs());
        if (currentTranslation?.original) {
            translate({
                text: currentTranslation.original,
                target: sourceLang, 
                source: targetLang, 
                speak: true,
                gender,
            });
        }
    };

    const handleSourceChange = (newLanguage: string) => {
        if (newLanguage !== targetLang) {
            dispatch(setSourceLang(newLanguage));
        }
    };

    const handleTargetChange = (newLanguage: string) => {
        if (newLanguage !== sourceLang) {
            dispatch(setTargetLang(newLanguage));
            if (currentTranslation?.original) {
                translate({
                    text: currentTranslation.original,
                    target: newLanguage,
                    source: sourceLang,
                    speak: true,
                    gender,
                });
            }
        }
    };

    const disabledSourceLanguage = LANGUAGES.filter((lang) => lang.id !== sourceLang).map((lang) => lang.id);
    const disabledTargetLanguage = [sourceLang];

    return (
        <article className="language-switch-container">
            <img className="language-switch-container__logo" src="/LexiGo3.svg" alt="logo" />
            <div className="languages-container">
                <LanguageSelector
                    language={sourceLang}
                    callback={handleSourceChange}
                    disabledLanguages={disabledSourceLanguage}
                />
                {isAbleToSwitch && (
                    <img className="swap-button" src="/Arrow 1.svg" alt="Swap" onClick={switchLanguage} />
                )}
                <LanguageSelector
                    language={targetLang}
                    callback={handleTargetChange}
                    disabledLanguages={disabledTargetLanguage}
                />
            </div>
        </article>
    );
};