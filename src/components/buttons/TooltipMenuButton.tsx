import "./styles/tooltip-menu-button.scss";
import { Link } from "react-router-dom";

type Props = { title: string; isActive?: boolean; pathTo: string };
export const TooltipMenuButton = ({ title, isActive, pathTo }: Props) => {

    return (
        <Link 
            to={pathTo}
            className={`tooltip-menu_container_button ${isActive ? 'active' : 'left'}`}>
           {title}
        </Link>
    );
};

export default TooltipMenuButton;
