import { SettingsDial } from "../SettingsDial/SettingsDial";
import "./options-bar.scss";
export const OptionsBar = () => {
    return (
        <div className="settings-base">
            <button className="settings-base__option-button">
                <img src="icons/copy.svg" alt="" />
            </button>
            <button className="settings-base__option-button">
                <img src="icons/day.svg" alt="" />
            </button>
            <button className="settings-base__option-button">
                <img src="icons/soundOn.svg" alt="" />
            </button>
            <SettingsDial />
        </div>
    );
};
