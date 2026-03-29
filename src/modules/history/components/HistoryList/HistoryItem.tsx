import { type Current } from "../../../translation/store/translationSlice";
interface Props {
    item: Current;
    isExpanded: boolean;
    onToggle: () => void;
    onPlayAudio: (audioBase64?: string) => void;
}

export const HistoryItem = ({ item, isExpanded, onToggle, onPlayAudio }: Props) => {
    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleString('ru-RU', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className={`history-card ${isExpanded ? 'expanded' : ''}`}>
            <div className="history-card-header" onClick={onToggle}>
                <div className="header-info">
                    <span className="translation-direction">{item.from || 'AUTO'} → {item.to}</span>
                    <span className="translation-date">{formatDate(item.ts)}</span>
                </div>
                <div className="header-actions">
                    <img 
                        src="/downarrow.svg" 
                        alt="expand" 
                        className={`expand-icon ${isExpanded ? 'rotated' : ''}`} 
                    />
                </div>
            </div>
            
            <div className="history-card-body">
                <div className="text-block">
                    <span className="text-label">Оригинал:</span>
                    <p className="text-content original">{item.original}</p>
                </div>
                <div className="text-block">
                    <span className="text-label">Перевод:</span>
                    <p className="text-content translated">{item.translated}</p>
                </div>
                
                {isExpanded && item.audio && (
                    <div className="history-card-footer">
                        <button 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                onPlayAudio(item.audio); 
                            }}
                            className="audio-btn"
                            title="Прослушать"
                        >
                            🔊 Слушать
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};