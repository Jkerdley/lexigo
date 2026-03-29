import { useState, useEffect } from "react";
import { useTranslate } from "../../hooks/useTranslation";
import { useAppSelector } from "../../../../core/store/store";
import { LanguageSwitchContainer } from "../../../languages/components";
import { OptionsBar } from "../../../settings";
import "./manual-translation-tab.scss";

export const ManualTranslationTab = () => {
    const [inputText, setInputText] = useState("");
    
    const settings = useAppSelector(s => s.settings);
    const sourceLang = settings.sourceLang || "EN";
    const targetLang = settings.targetLang || "RU";
    const gender = settings.gender;

    const currentTr = useAppSelector(s => s.currentTranslation.current);
    
    const { translate } = useTranslate(false); 

    useEffect(() => {
        if (inputText.trim()) {
            translate({
                text: inputText,
                source: sourceLang,
                target: targetLang,
                gender,
                speak: false
            });
        }
    }, [inputText, sourceLang, targetLang, gender, translate]);

    const renderOutput = () => {
        if (!inputText.trim()) {
            return <span className="placeholder">Здесь появится перевод...</span>;
        }
        if (currentTr?.loading) {
            return <span className="placeholder">⏳ Переводим...</span>;
        }
        if (currentTr?.error) {
            return <span className="error-text" style={{ color: "var(--alt-accent)" }}>❌ {currentTr.error}</span>;
        }
        return <span className="translated-text">{currentTr?.translated}</span>;
    };

    return (
        <>
            <LanguageSwitchContainer isAbleToSwitch />
            
            <div className="text-areas-wrapper">
                <textarea 
                    className="input-textarea"
                    placeholder="Введите текст для перевода..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                
                <div className="output-textarea">
                    {renderOutput()}
                </div>
            </div>

            <OptionsBar />
        </>
    );
};