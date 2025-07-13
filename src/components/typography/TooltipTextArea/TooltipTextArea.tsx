import "./tooltip-text-area.scss";
import { useCurrentTranslation } from "../../../modules/translation/hooks/useCurrentTranslation.ts";
import { Outlet } from "react-router-dom";

export const TooltipTextArea = () => {
    const tr = useCurrentTranslation();
    return (
        <article className="tooltip-text-area">
            {tr?.translated} <Outlet />
        </article>
    );
};

export default TooltipTextArea;
