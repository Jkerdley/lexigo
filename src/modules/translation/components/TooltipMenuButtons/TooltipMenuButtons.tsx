import { TooltipMenuButton } from "../../../../components/buttons";
import "./tooltip-menu-buttons.scss";
import { RoutePath } from "../../../../core/router/routeConfig"
import { useState } from "react";
export const TooltipMenuButtons = () => {

  const [activePage, setActivePage] = useState(RoutePath.main);

    return (
        <article className="tooltip-menu_container">
            <TooltipMenuButton 
              title="Переводчик" 
              isActive 
              pathTo={RoutePath.main}
              isActive={activePage === RoutePath.main}
              onClick={() => setActivePage(RoutePath.main)}
            />
            <TooltipMenuButton 
              title="Перевод текста" 
              pathTo={RoutePath.translation}
              isActive={activePage === RoutePath.translation}
              onClick={() => setActivePage(RoutePath.translation)}
            />
            <TooltipMenuButton 
              title="История" 
              pathTo={RoutePath.history}
              isActive={activePage === RoutePath.history}
              onClick={() => setActivePage(RoutePath.history)}
            />
        </article>
    );
};

export default TooltipMenuButtons;
