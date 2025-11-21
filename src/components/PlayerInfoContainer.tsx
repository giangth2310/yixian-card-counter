import React from 'react';
import { Player } from '../models/model';
import { usePlayer } from '../contexts/PlayerContext';
import './PlayerInfoContainer.css';

const SIDE_JOB_NAMES: Record<string, string> = {
  'elixirist': 'Elixirist',
  'fuluist': 'Fuluist',
  'formation-master': 'Formation Master',
  'painter': 'Painter',
  'musician': 'Musician',
  'plant-master': 'Plant Master',
  'fortune-teller': 'Fortune Teller',
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
          <span className="player-info-label">Cultivation: {player.cultivation}</span>
          <span className="player-info-label">Max HP: {player.health}</span>
          {player.physique? <span className="player-info-label">Physique: {player.physique}/{player.maxPhysique}</span> : null}
          <span className="player-info-label">Destiny: {player.destiny}</span>
          <span className="player-info-label">Side Jobs: {sideJobs && sideJobs.length > 0 ? sideJobs.map(job => SIDE_JOB_NAMES[job] || job).join(', ') : 'Unknown'}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfoContainer; 