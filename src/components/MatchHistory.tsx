import React from 'react';
import { MatchHistory as MatchHistoryType, Card as CardType } from '../models/model';
import MatchHistoryCard from './MatchHistoryCard';
import Sigil from './Sigil';
import './MatchHistory.css';

interface MatchHistoryItemProps {
  round: string;
  history: MatchHistoryType & { processedCards: CardType[] };
  isExpanded: boolean;
  onRoundClick: (roundNumber: number) => void;
}

const MatchHistory: React.FC<MatchHistoryItemProps> = ({
  round,
  history,
  isExpanded,
  onRoundClick,
}) => {
  const roundNumber = parseInt(round);
  const isWin = history.destiny_diff >= 0;

  return (
    <div key={round} className="match-history-item">
      <div 
        className="match-history-header"
        onClick={() => onRoundClick(roundNumber)}
      >
        <div className="header-info">
          <span className="round-label">Vòng {roundNumber}</span>
          <div className="header-stats">
            <span>Tu vi: {history.cultivation}</span>
            <span>HP: {history.health}</span>
            <span>Mệnh nguyên: {history.destiny}({history.destiny_diff})</span>
            <span>Đối thủ: {history.opponent_username}</span>
          </div>
        </div>
        <span className={`result-label ${isWin ? 'win' : 'lose'}`}>
          {isWin ? 'Thắng' : 'Thua'}
        </span>
      </div>
      
      {isExpanded && (
        <div className="match-history-content">
          {/* seasonal special */}
          {/* <div className="used-cards-container">
            <Sigil sigil={{name: '固防', level: 1, category: 'general'}} />
            <Sigil sigil={{name: '生命', level: 1, category: 'general'}} />
          </div>
          <hr/> */}
          <div className="used-cards-container">
            {history.processedCards.map((card, index) => (
              <MatchHistoryCard
                key={`${card.name}-${index}`}
                card={card}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchHistory; 