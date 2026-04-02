import * as Popover from "@radix-ui/react-popover";
import { Outlet, useNavigate } from "react-router-dom";
import { TooltipMenuButtons } from "../TooltipMenuButtons/TooltipMenuButtons";
import { RoutePath, AppRoutes } from "../../../../core/router/routeConfig";
import "./Tooltip.scss";

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
    const navigate = useNavigate();

    const handleOpenChange = (open: boolean) => {
        if (open) {
            navigate(`/${RoutePath[AppRoutes.MAIN]}`);
        }
        setIsOpen?.(open);
    };

    return (
        <Popover.Root open={isOpen} onOpenChange={handleOpenChange}>
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