import * as Popover from "@radix-ui/react-popover";
import "./Tooltip.scss";
import TooltipMenuButtons from "../TooltipMenuButtons/TooltipMenuButtons";
import { LanguageSwitchContainer } from "../../../languages/components";
import { TooltipTextArea } from "../../../../components/typography";
import { Outlet } from "react-router-dom";

interface TooltipProps {
    handleClick: () => void;
    isLoading?: boolean;
    style?: React.CSSProperties;
    showTrigger?: boolean;
    children?: React.ReactNode;
}
export const Tooltip = (props: TooltipProps) => {
    const { handleClick, isLoading, style, showTrigger, children } = props;
    return (
        <Popover.Root>
            {showTrigger && (
                <Popover.Trigger style={style} onClick={handleClick} className="popover-trigger">
                    <img className="popover-trigger__logo" src="/heart.svg" alt="logo" />
                </Popover.Trigger>
            )}

            <Popover.Content align="center" className="translator-tooltip" sideOffset={5}>
                <TooltipMenuButtons />
                <div className="translator-main-content_container">
                    <LanguageSwitchContainer />
                    <TooltipTextArea
                        value={
                            isLoading
                                ? "Переводим…"
                                : children
                                ? children.toString()
                                : "Ошибка: Выделите текст"
                        }
                    />
                    <Outlet />
                </div>
                <Popover.Arrow className="tooltip-arrow" />
            </Popover.Content>
        </Popover.Root>
    );
};
