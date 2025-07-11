import * as Popover from "@radix-ui/react-popover";
import "./Tooltip.scss";
import TooltipMenuButtons from "../TooltipMenuButtons/TooltipMenuButtons";
import { LanguageSwitchContainer } from "../../../languages/components";
import { TooltipTextArea } from "../../../../components/typography";
export const Tooltip = () => (
    <Popover.Root>
        <Popover.Trigger className="popover-trigger">Открыть</Popover.Trigger>
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
