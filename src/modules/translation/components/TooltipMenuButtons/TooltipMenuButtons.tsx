import { NavLink } from "react-router-dom";
import "./tooltip-menu-buttons.scss";
import "../../../../components/buttons/styles/tooltip-menu-button.scss"; 
import { RoutePath, AppRoutes } from "../../../../core/router/routeConfig";

export const TooltipMenuButtons = () => {
    const getClassName = (position: string) => ({ isActive }: { isActive: boolean }) => 
        `tooltip-menu_container_button ${position} ${isActive ? 'active' : ''}`;

    return (
        <article className="tooltip-menu_container">
            <NavLink to={`/${RoutePath[AppRoutes.MAIN]}`} className={getClassName('left')}>
                Переводчик
            </NavLink>
            <NavLink to={`/${RoutePath[AppRoutes.TRANSLATION]}`} className={getClassName('center')}>
                Перевод текста
            </NavLink>
            <NavLink to={`/${RoutePath[AppRoutes.HISTORY]}`} className={getClassName('right')}>
                История
            </NavLink>
        </article>
    );
};