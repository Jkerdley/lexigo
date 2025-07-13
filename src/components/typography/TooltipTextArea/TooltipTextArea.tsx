import "./tooltip-text-area.scss";
import { Outlet } from "react-router-dom";
import { useCurrentTranslation } from "../../../modules/translation/hooks/useCurrentTranslation.ts";

export const TooltipTextArea = () => {
    const tr = useCurrentTranslation();

    let content: React.ReactNode;

    if (!tr) {
        content = "Выделите текст";
    } else if (tr.loading) {
        content = <>⏳ Переводим…</>;
    } else if (tr.error) {
        content = <span className="tooltip-text-area--error">{tr.error}</span>;
    } else {
        content = tr.translated;
    }

    return (
        <article className="tooltip-text-area">
            {content}
            <Outlet />
        </article>
    );
};

export default TooltipTextArea;
