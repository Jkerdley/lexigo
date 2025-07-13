import { useTheme } from "../../../../core/hooks/useTheme";
import { SettingsDial } from "../SettingsDial/SettingsDial";
import "./options-bar.scss";
import { useCurrentTranslation } from "../../../translation/hooks/useCurrentTranslation";
import { useTranslateMutation } from "../../../translation/api/service";
import { useAppSelector } from "../../../../core/store/store.ts";
import { useEffect } from "react";

export const OptionsBar = () => {
    const { gender } = useAppSelector((s) => s.settings);
    const tr = useCurrentTranslation(); // последний перевод
    const [translate, result] = useTranslateMutation();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        if (result.isSuccess && result.data?.audioContent) {
            new Audio(`data:audio/mp3;base64,${result.data.audioContent}`).play().catch(console.error);
        }
    }, [result]);

    const handlePlay = () => {
        if (tr?.audio && tr.gender === gender) {
            new Audio(`data:audio/mp3;base64,${tr.audio}`).play().catch(console.error);
            return;
        }
        if (tr?.original) {
            translate({
                text: tr.original,
                source: tr.from,
                target: tr.to,
                speak: true,
                gender,
            });
        }
    };

    return (
        <div className="settings-base">
            <button className="settings-base__option-button">
                <img src="icons/copy.svg" alt="скопировать текст" />
            </button>
            <button
                onClick={toggleTheme}
                className="settings-base__option-button"
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
                {theme === "light" ? (
                    <img src="icons/night.svg" alt="Сменить тему" />
                ) : (
                    <img src="icons/day.svg" alt="Сменить тему" />
                )}
            </button>
            <button className="settings-base__option-button" onClick={handlePlay}>
                <img src="icons/soundOn.svg" alt="" />
            </button>
            <SettingsDial />
        </div>
    );
};
