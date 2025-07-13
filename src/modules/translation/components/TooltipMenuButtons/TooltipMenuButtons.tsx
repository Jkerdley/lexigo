import { TooltipMenuButton } from "../../../../components/buttons";
import "./tooltip-menu-buttons.scss";
import { RoutePath } from "../../../../core/router/routeConfig"
export const TooltipMenuButtons = () => {

    return (
        <article className="tooltip-menu_container">
            <TooltipMenuButton 
              title="Переводчик" 
              isActive 
              pathTo={RoutePath.main}
            />
            <TooltipMenuButton 
              title="Перевод текста" 
              pathTo={RoutePath.translation}
            />
            <TooltipMenuButton 
              title="История" 
              pathTo={RoutePath.history}
            />
        </article>
    );
};

export default TooltipMenuButtons;
