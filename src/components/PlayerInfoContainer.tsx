import React from 'react';
import { Player } from '../models/model';
import { usePlayer } from '../contexts/PlayerContext';
import './PlayerInfoContainer.css';

const SIDE_JOB_NAMES: Record<string, string> = {
  'elixirist': 'Luyện đan sư',
  'fuluist': 'Phù chú sư',
  'formation-master': 'Trận pháp sư',
  'painter': 'Họa sư',
  'musician': 'Cầm sư',
  'plant-master': 'Linh thực sư',
  'fortune-teller': 'Mệnh lý sư',
};

interface PlayerInfoContainerProps {
  player: Player;
}

const PlayerInfoContainer: React.FC<PlayerInfoContainerProps> = ({ player }) => {
  const { sideJobs } = usePlayer();
  return (
    <div className="player-info-container">
      <div className="player-information">
        <div className="player-info-label-container">
          <img src={`${process.env.PUBLIC_URL}/images/avatars/${player.character}.png`} alt={player.character} className="character-avatar"/>
          <span className="username-label">{player.player_username}</span>
          <span className="player-info-label">Tu vi: {player.cultivation}</span>
          <span className="player-info-label">HP tối đa: {player.health}</span>
          {player.physique? <span className="player-info-label">Thể phách: {player.physique}/{player.maxPhysique}</span> : null}
          <span className="player-info-label">Mệnh nguyên: {player.destiny}</span>
          <span className="player-info-label">Phó nghề: {sideJobs && sideJobs.length > 0 ? sideJobs.map(job => SIDE_JOB_NAMES[job] || job).join(', ') : 'Không rõ'}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfoContainer; 