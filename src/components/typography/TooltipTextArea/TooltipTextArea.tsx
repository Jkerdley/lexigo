import "./tooltip-text-area.scss";
import {useCurrentTranslation} from "../../../modules/translation/hooks/useCurrentTranslation.ts";

export const TooltipTextArea = () => {
    const tr = useCurrentTranslation();

    return <article className="tooltip-text-area">{tr?.translated}</article>;
};

export default TooltipTextArea;
