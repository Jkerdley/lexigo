import { LanguageSwitchContainer } from "../../../languages/components";
import { TooltipTextArea } from "../../../../components/typography";
import { OptionsBar } from "../../../settings";

export const TranslationTab = () => {
    return (
        <>
            <LanguageSwitchContainer isAbleToSwitch />
            <TooltipTextArea />
            <OptionsBar />
        </>
    );
};