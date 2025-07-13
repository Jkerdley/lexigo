import { SettingsDial } from "../SettingsDial/SettingsDial";
import "./options-bar.scss";
import {useCurrentTranslation} from "../../../translation/hooks/useCurrentTranslation";
import {useTranslateMutation} from "../../../translation/api/service";
import {useAppSelector} from "../../../../core/store/store.ts";
import {useRef} from "react";

export const OptionsBar = () => {
    const { gender } = useAppSelector(s => s.settings);
    const tr = useCurrentTranslation();
    const [translate] = useTranslateMutation();

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playDataUrl = (dataUrl: string) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        const a = new Audio(dataUrl);
        a.play().catch(console.error);
        audioRef.current = a;
    };

    const handlePlay = () => {
        if (tr?.audio && tr.gender === gender) {
            playDataUrl(`data:audio/mp3;base64,${tr.audio}`);
            return;
        }

        if (tr?.original) {
            translate({
                text  : tr.original,
                source: tr.from,
                target: tr.to,
                speak : true,
                gender,
            })
                .unwrap()
                .then(res => {
                    if (res.audioContent) {
                        playDataUrl(`data:audio/mp3;base64,${res.audioContent}`);
                    }
                })
                .catch(console.error);
        }
    };

    return (
        <div className="settings-base">
            <button className="settings-base__option-button">
                <img src="icons/copy.svg" alt="" />
            </button>
            <button className="settings-base__option-button">
                <img src="icons/day.svg" alt="" />
            </button>
            <button
                className="settings-base__option-button"
                onClick={handlePlay}
            >
                <img src="icons/soundOn.svg" alt="" />
            </button>
            <SettingsDial />
        </div>
    );
};
