import { useRef, useState } from "react";
import "./text-area-content.scss";
import { Tooltip } from "../../../modules/translation/components";
import { useTranslate } from "../../../modules/translation/hooks/useTranslation";

export const TextAreaContent = () => {
    const [buttonPosition, setButtonPosition] = useState({
        top: 0,
        left: 0,
        visible: false,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const selectedTextRef = useRef("");

    // const [translate, data, isLoading, isError, error] = useTranslate();

    const handleMouseUp = () => {
        const selection = window.getSelection();
        const selectedText = selection?.toString().trim() || "";

        if (!selectedText) {
            setButtonPosition((prev) => ({ ...prev, visible: false }));
            return;
        }

        selectedTextRef.current = selectedText;

        const range = selection?.getRangeAt(0);
        if (!range || !containerRef.current) return;

        const position = range.getBoundingClientRect();
        const containerPosition = containerRef.current.getBoundingClientRect();

        setButtonPosition({
            top: position.top - containerPosition.top - 36,
            left: position.left - containerPosition.left + position.width / 2,
            visible: true,
        });
    };

    const handleSaveClick = () => {
        localStorage.setItem("selectedText", selectedTextRef.current);
        // translate(selectedTextRef.current);
    };

    return (
        <div className="text-area-content__container" ref={containerRef} onMouseUp={handleMouseUp}>
            Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более
            менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных
            выступлений в домашних условиях. При создании генератора мы использовали небезизвестный
            универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти
            предложений в абзаце, что позволяет сделать текст более привлекательным и живым для
            визуально-слухового восприятия. По своей сути рыбатекст является альтернативой традиционному lorem
            ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст.
            {buttonPosition.visible && (
                <Tooltip
                    style={{
                        position: "absolute",
                        top: `${buttonPosition.top}px`,
                        left: `${buttonPosition.left}px`,
                    }}
                    handleClick={handleSaveClick}
                />
            )}
        </div>
    );
};
