import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import "./language-switch-container.scss";
export const LanguageSwitchContainer = () => {
    return (
        <article className="language-switch-container">
            <img className="language-switch-container__logo" src="/public/LexiGo3.svg" alt="logo" />
            <LanguageSelector />
            <LanguageSelector />
        </article>
    );
};

export default LanguageSwitchContainer;
