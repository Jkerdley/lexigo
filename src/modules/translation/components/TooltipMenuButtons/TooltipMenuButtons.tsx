import { TooltipMenuButton } from "../../../../components/buttons";
import "./tooltip-menu-buttons.scss";
export const TooltipMenuButtons = () => {
    return (
        <article className="tooltip-menu_container">
            <TooltipMenuButton title="Переводчик" isActive position="left" />
            <TooltipMenuButton title="Перевод текста" position="center" />
            <TooltipMenuButton title="История" position="right" />
        </article>
    );
};

export default TooltipMenuButtons;
