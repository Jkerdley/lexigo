import "./styles/tooltip-menu-button.scss";

type Props = { title: string; isActive?: boolean; position: string };
export const TooltipMenuButton = ({ title, isActive, position }: Props) => {
    return (
        <button className={`tooltip-menu_container_button ${isActive ? "active" : position}`}>{title}</button>
    );
};

export default TooltipMenuButton;
