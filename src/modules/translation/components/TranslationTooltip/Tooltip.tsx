import * as Popover from "@radix-ui/react-popover";
import "./Tooltip.scss";
import TooltipMenuButtons from "../TooltipMenuButtons/TooltipMenuButtons";
import { LanguageSwitchContainer } from "../../../languages/components";
import { TooltipTextArea } from "../../../../components/typography";

interface TooltipProps {
    handleClick: () => void;
    style?: React.CSSProperties;
}
export const Tooltip = ({ handleClick, style }: TooltipProps) => (
    <Popover.Root>
        <Popover.Trigger style={style} onClick={handleClick} className="popover-trigger">
            <img className="popover-trigger__logo" src="/heart.svg" alt="logo" />
        </Popover.Trigger>
        <Popover.Content align="center" className="translator-tooltip" sideOffset={5}>
            <TooltipMenuButtons />
            <div className="translator-main-content_container">
                <LanguageSwitchContainer />
                <TooltipTextArea />
            </div>
            <Popover.Arrow className="tooltip-arrow" />
        </Popover.Content>
    </Popover.Root>
);
