import "./text-area-content.scss";
import { Tooltip } from "..";

import { useRef, useState } from "react";
import { useTranslate } from "../../hooks/useTranslation";
import { useAppSelector } from "../../../../core/store/store";
import { useClickOutside } from "../../../../core/hooks/useClickOutside";

export const TextAreaContent = () => {
    const [selection, setSelection] = useState<string>("");
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const textRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const autoPlayVoice = useAppSelector((s) => s.settings.autoPlayVoice);
    const gender = useAppSelector((s) => s.settings.gender);
    const { translate, isLoading } = useTranslate(autoPlayVoice);

    const showTrigger = !!selection;

    useClickOutside(
        [textRef, wrapperRef],
        () => {
            setPopoverOpen(false);
            setSelection("");
        },
        showTrigger || popoverOpen
    );

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
        translate({ text: selection, target: "ru", gender, speak: true});
        setPopoverOpen(true);
    };

    return (
        <section className="text-area-content__container">
            <div ref={textRef} className="text-area-content__container__text" onMouseUp={onTextSelection}>
                Being a frontend developer can often feel like standing at the intersection of design and
                engineering. Unlike many other technical roles, frontend work demands not only deep technical
                expertise but also a strong sense of aesthetics and user experience. You have to turn complex
                ideas and static designs into interactive, dynamic, and accessible interfaces that work
                seamlessly across countless devices and screen sizes. This balance between technical precision
                and visual creativity makes the role both fascinating and incredibly challenging. One of the
                most demanding aspects of frontend development is the need to constantly adapt to new tools
                and frameworks. The frontend ecosystem evolves rapidly; libraries like React, Vue, or Svelte
                can rise to popularity and change best practices overnight. Staying updated requires
                continuous learning, experimenting, and sometimes unlearning old habits to adopt better
                approaches. This constant change can be overwhelming, but it also keeps the work exciting and
                fresh for those who love to learn. Another challenge lies in the sheer complexity of browsers
                and devices. A feature that works perfectly in one browser might break completely in another.
                Supporting different screen resolutions, ensuring accessibility for all users, and optimizing
                for performance add multiple layers of responsibility. Frontend developers must often debug
                unexpected visual glitches, manage intricate CSS behaviors, and make sure that animations or
                interactions remain smooth and intuitive. Despite these difficulties, being a frontend
                developer is incredibly rewarding. There’s a unique satisfaction in seeing your code come
                alive on the screen and knowing that millions of people may interact with it daily. You help
                shape the first impression of a product and directly impact how users feel and behave. For
                those who enjoy merging logic with creativity and constantly pushing the limits of what’s
                possible on the web, frontend development offers a dynamic and fulfilling career path.
            </div>

            {(showTrigger || popoverOpen) && (
                <div ref={wrapperRef}>
                    <Tooltip
                        showTrigger={showTrigger}
                        style={{ position: "absolute", left: coords.x, top: coords.y }}
                        isLoading={isLoading}
                        handleClick={onTriggerClick}
                    >
                    </Tooltip>
                </div>
            )}
        </section>
    );
};