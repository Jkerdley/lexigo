import * as Popover from "@radix-ui/react-popover";
import "./Tooltip.css";
export const Tooltip = () => (
    <Popover.Root>
        <Popover.Trigger className="your-trigger-style">Открыть</Popover.Trigger>
        <Popover.Content align="center" className="translator-tooltip" sideOffset={5}>
            <div className="tooltip-content">Тут будет мой контент в тултипе</div>
            <Popover.Arrow className="tooltip-arrow" />
        </Popover.Content>
    </Popover.Root>
);
