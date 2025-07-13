import "./text-area-content.scss";
import { Tooltip } from "../../../modules/translation/components";

import { useEffect, useRef, useState } from "react";
import { useTranslate } from "../../../modules/translation/hooks/useTranslation";
import { useAppSelector } from "../../../core/store/store";
import { useClickOutside } from "../../../core/hooks/useClickOutside";

export const TextAreaContent = () => {
    const [selection, setSelection] = useState<string>("");
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [translatedText, setTranslatedText] = useState<string>("");

    const textRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const autoPlayVoice = useAppSelector((s) => s.settings.autoPlayVoice);
    const { translate, data, isLoading } = useTranslate(autoPlayVoice);

    const showTrigger = !!selection;

    useClickOutside(
        [textRef, wrapperRef],
        () => {
            setPopoverOpen(false);
            setSelection("");
        },
        showTrigger || popoverOpen
    );

    useEffect(() => {
        if (!isLoading && data?.translatedText) {
            setTranslatedText(data.translatedText);
        }
    }, [isLoading, data]);

    const onTextSelection = () => {
        const sel = window.getSelection()?.toString().trim() || "";
        if (!sel) {
            setSelection("");
            return;
        }
        const range = window.getSelection()!.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const parentRect = textRef.current!.getBoundingClientRect();

        setCoords({
            x: rect.left - parentRect.left + rect.width / 2,
            y: rect.top - parentRect.top - 10,
        });
        setSelection(sel);
    };

    const onTriggerClick = () => {
        translate({ text: selection, target: "en" });
        setPopoverOpen(true);
    };

    return (
        <section className="text-area-content__container">
            <div ref={textRef} className="text-area-content__container__text" onMouseUp={onTextSelection}>
                Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев
                более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык
                публичных выступлений в домашних условиях. При создании генератора мы использовали
                небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух
                до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для
                визуально-слухового восприятия. По своей сути рыбатекст является альтернативой традиционному
                lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст.
                Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев
                более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык
                публичных выступлений в домашних условиях. При создании генератора мы использовали
                небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух
                до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для
                визуально-слухового восприятия. По своей сути рыбатекст является альтернативой традиционному
                lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст.
            </div>

            {(showTrigger || popoverOpen) && (
                <div ref={wrapperRef}>
                    <Tooltip
                        showTrigger={showTrigger}
                        style={{ position: "absolute", left: coords.x, top: coords.y }}
                        translatedText={translatedText}
                        isLoading={isLoading}
                        handleClick={onTriggerClick}
                    />
                </div>
            )}
        </section>
    );
};
