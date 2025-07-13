import "./styles/tooltip-menu-button.scss";
import { Link } from "react-router-dom";

type Props = { title: string; isActive?: boolean; pathTo: string, onClick: () => void };
export const TooltipMenuButton = ({ title, isActive, pathTo, onClick }: Props) => {

    return (
        <Link 
            to={pathTo}
            className={`tooltip-menu_container_button ${isActive ? 'active' : 'left'}`}
            onClick={onClick}
        >
           {title}
        </Link>
    );
};

export default TooltipMenuButton;
