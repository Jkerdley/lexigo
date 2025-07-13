import { useEffect } from "react";
import { useAppSelector } from "../../../../core/store/store";
import { useCurrentTranslation } from "../../../translation/hooks/useCurrentTranslation";
import { addHistoryItem, clearHistory } from "../../store/historySlice";
import { useDispatch } from "react-redux";
import "./HistoryList.scss";

export const HistoryList = () => {
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    const history = useAppSelector((state) => state.history.historyItems);
    const dispatch = useDispatch();
    const data = useCurrentTranslation();
    useEffect(() => {
        dispatch(addHistoryItem(data));
    }, [data]);

    return (
        <>
            <div className="history-container">
                <h2>История переводов</h2>
                <button onClick={() => dispatch(clearHistory())}>Очистить историю</button>

                <div className="history-grid">
                    {history.map((item, index) => (
                        <div key={index} className="history-card">
                            <div className="history-card-header">
                                <div className="translation-direction">
                                    {item.from} → {item.to}
                                </div>
                                <div className="translation-date">{formatDate(item.ts)}</div>
                            </div>

                            <div className="history-card-content">
                                <div className="original-text">
                                    <strong>Оригинал:</strong> {item.original}
                                </div>
                                <div className="translated-text">
                                    <strong>Перевод:</strong> {item.translated}
                                </div>
                            </div>

                            <div className="history-card-actions">
                                {item.audio && (
                                    <button
                                        onClick={() => {
                                            /* логика воспроизведения аудио */
                                        }}
                                        className="audio-btn"
                                        title="Прослушать"
                                    >
                                        🔊
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
