import { useState } from "react";
import { useAppSelector } from "../../../../core/store/store";
import { clearHistory } from "../../store/historySlice";
import { useDispatch } from "react-redux";
import { HistoryItem } from "./HistoryItem";
import './HistoryList.scss';

export const HistoryList = () => {
    const history = useAppSelector((state) => state.history.historyItems);
    const dispatch = useDispatch();
    
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const handlePlayAudio = (audioBase64?: string) => {
        if (!audioBase64) return;
        new Audio(`data:audio/mp3;base64,${audioBase64}`).play().catch(console.error);
    };

    const toggleExpand = (id: number) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    return (
        <div className="history-container">
            <div className="history-header">
                <h2>История</h2>
                {history.length > 0 && (
                    <button className="clear-btn" onClick={() => dispatch(clearHistory())}>
                        Очистить
                    </button>
                )}
            </div>
            
            <div className="history-list">
                {history.length === 0 ? (
                    <div className="history-empty">История пуста</div>
                ) : (
                    history.map((item) => (
                        <HistoryItem 
                            key={item.ts} 
                            item={item} 
                            isExpanded={expandedId === item.ts}
                            onToggle={() => toggleExpand(item.ts)}
                            onPlayAudio={handlePlayAudio} 
                        />
                    ))
                )}
            </div>
        </div>
    );
};
