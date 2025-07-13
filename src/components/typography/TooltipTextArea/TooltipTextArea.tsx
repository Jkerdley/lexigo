import "./tooltip-text-area.scss";
import { Outlet } from "react-router-dom";
interface TooltipTextAreaProps {
    value?: string;
}
export const TooltipTextArea = ({ value }: TooltipTextAreaProps) => {
    return <article className="tooltip-text-area">
        {value}
        <Outlet />
    </article>;
};

export default TooltipTextArea;
