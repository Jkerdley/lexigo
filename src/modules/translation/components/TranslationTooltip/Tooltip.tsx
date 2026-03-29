import * as Popover from "@radix-ui/react-popover";
import "./Tooltip.scss";
import { TooltipMenuButtons } from "../TooltipMenuButtons/TooltipMenuButtons";
import { Outlet } from "react-router-dom";
interface TooltipProps {
    handleClick?: () => void;
    isLoading?: boolean;
    style?: React.CSSProperties;
    showTrigger?: boolean;
    isOpen?: boolean;                         
    setIsOpen?: (open: boolean) => void;       
}

export const Tooltip = (props: TooltipProps) => {
    const { handleClick, style, showTrigger, isOpen, setIsOpen } = props;
    
    return (
        <Popover.Root open={isOpen} onOpenChange={setIsOpen}> 
            {showTrigger && (
                <Popover.Trigger asChild>
                    <button style={style} onClick={handleClick} className="popover-trigger">
                        <img className="popover-trigger__logo" src="/heart.svg" alt="logo" />
                    </button>
                </Popover.Trigger>
            )}

            <Popover.Content align="center" className="translator-tooltip" sideOffset={5}>
                <TooltipMenuButtons />
                <div className="translator-main-content_container">
                    <Outlet /> 
                </div>
                <Popover.Arrow className="tooltip-arrow" />
            </Popover.Content>
        </Popover.Root>
    );
};
