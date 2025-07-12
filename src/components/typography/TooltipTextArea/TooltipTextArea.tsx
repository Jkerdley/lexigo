import "./tooltip-text-area.scss";
interface TooltipTextAreaProps {
    value?: string;
}
export const TooltipTextArea = ({ value }: TooltipTextAreaProps) => {
    return (
        <article className="tooltip-text-area">
            {value}
        </article>
    );
};

export default TooltipTextArea;
