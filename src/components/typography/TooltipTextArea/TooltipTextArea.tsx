import "./tooltip-text-area.scss";
interface TooltipTextAreaProps {
    value?: string;
}
export const TooltipTextArea = ({ value }: TooltipTextAreaProps) => {
    return (
        <article className="tooltip-text-area">
            Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более
            {value}
        </article>
    );
};

export default TooltipTextArea;
