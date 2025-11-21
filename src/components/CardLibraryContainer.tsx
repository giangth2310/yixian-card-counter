import React, { useState, useMemo } from 'react';
import { Card as CardType } from '../models/model';
import Card, { TrackButton, RecommendLabel } from './Card';
import cardLibData from '../data/card_lib.json';
import specialCardLibData from '../data/special_card_lib.json';
import { useTracking } from '../contexts/TrackingContext';
import './CardLibraryContainer.css';

interface Tab {
  id: string;
  label: string;
}

const trackingFilters: Tab[] = [
  { id: 'match', label: 'Trận đấu' },
  { id: 'deck', label: 'Bộ bài' }
];

const typeFilters: Tab[] = [
  { id: 'sect', label: 'Môn phái' },
  { id: 'side-jobs', label: 'Phó nghề' },
  { id: 'fortune', label: 'Cơ duyên' },
  { id: 'personal', label: 'Cá nhân' }
];

const categoryFilters = {
  sect: [
    { id: 'cloud-spirit', label: 'Vân Linh Kiếm Tông' },
    { id: 'heptastar', label: 'Thất Tinh Các' },
    { id: 'five-element', label: 'Ngũ Hành Đạo Minh' },
    { id: 'duan-xuan', label: 'Đoán Huyền Tông' }
  ],
  'side-jobs': [
    { id: 'elixirist', label: 'Luyện đan sư' },
    { id: 'fuluist', label: 'Phù chú sư' },
    { id: 'musician', label: 'Cầm sư' },
    { id: 'painter', label: 'Họa sư' },
    { id: 'formation-master', label: 'Trận pháp sư' },
    { id: 'plant-master', label: 'Linh thực sư' },
    { id: 'fortune-teller', label: 'Mệnh lý sư' }
  ],
  fortune: [
    { id: 'talisman', label: 'Pháp bảo' },
    { id: 'spiritual-pet', label: 'Linh sủng' },
    { id: 'cloud-spirit', label: 'Bí thuật Vân Linh Kiếm Tông' },
    { id: 'heptastar', label: 'Bí thuật Thất Tinh Các' },
    { id: 'five-element', label: 'Bí thuật Ngũ Hành Đạo Minh' },
    { id: 'duan-xuan', label: 'Bí thuật Đoán Huyền Tông' }
  ],
  personal: [
    { id: 'cloud-spirit', label: 'Vân Linh Kiếm Tông' },
    { id: 'heptastar', label: 'Thất Tinh Các' },
    { id: 'five-element', label: 'Ngũ Hành Đạo Minh' },
    { id: 'duan-xuan', label: 'Đoán Huyền Tông' }
  ]
};

const personalSectMap: Record<string, string> = {
  'MuYifeng': 'cloud-spirit',
  'YanXue': 'cloud-spirit',
  'LongYao': 'cloud-spirit',
  'LinXiaoyue': 'cloud-spirit',
  'LuJianxin': 'cloud-spirit',
  'LiChengyun': 'cloud-spirit',
  'TanShuyan': 'heptastar',
  'YanChen': 'heptastar',
  'YaoLing': 'heptastar',
  'JiangXiming': 'heptastar',
  'WuCe': 'heptastar',
  'FengXu': 'heptastar',
  'WuXingzhi': 'five-element',
  'DuLingyuan': 'five-element',
  'HuaQinrui': 'five-element',
  'MuHu': 'five-element',
  'NanGongSheng': 'five-element',
  'QiWangyou': 'five-element',
  'XiaoBu': 'duan-xuan',
  'TuKui': 'duan-xuan',
  'YeMingming': 'duan-xuan',
  'JiFangSheng': 'duan-xuan',
  'LiMan': 'duan-xuan'
};

const phaseFilters: Tab[] = [
  { id: 'all', label: 'Tất cả' },
  { id: '1', label: 'Luyện khí' },
  { id: '2', label: 'Trúc Cơ' },
  { id: '3', label: 'Kim Đan' },
  { id: '4', label: 'Nguyên Anh' },
  { id: '5', label: 'Hóa Thần' }
];

const fortunePhaseFilters: Tab[] = [
  { id: 'all', label: 'Tất cả' },
  { id: '1', label: 'Luyện khí' },
  { id: '2', label: 'Trúc Cơ' },
  { id: '3', label: 'Kim Đan' },
  { id: '4', label: 'Nguyên Anh' },
  { id: '5', label: 'Hóa Thần' },
  { id: '6', label: 'Phản Hư' }
];

const characterInfo: Record<string, { name: string; avatar: string }> = {
  'MuYifeng': { name: '牧逸风', avatar: `${process.env.PUBLIC_URL}/images/avatars/牧逸风.png` },
  'YanXue': { name: '炎雪', avatar: `${process.env.PUBLIC_URL}/images/avatars/炎雪.png` },
  'LongYao': { name: '龙瑶', avatar: `${process.env.PUBLIC_URL}/images/avatars/龙瑶.png` },
  'LinXiaoyue': { name: '林小月', avatar: `${process.env.PUBLIC_URL}/images/avatars/林小月.png` },
  'LuJianxin': { name: '陆剑心', avatar: `${process.env.PUBLIC_URL}/images/avatars/陆剑心.png` },
  'LiChengyun': { name: '黎承云', avatar: `${process.env.PUBLIC_URL}/images/avatars/黎承云.png` },
  'TanShuyan': { name: '谭舒雁', avatar: `${process.env.PUBLIC_URL}/images/avatars/谭舒雁.png` },
  'YanChen': { name: '炎尘', avatar: `${process.env.PUBLIC_URL}/images/avatars/炎尘.png` },
  'YaoLing': { name: '曜灵', avatar: `${process.env.PUBLIC_URL}/images/avatars/曜灵.png` },
  'JiangXiming': { name: '姜袭明', avatar: `${process.env.PUBLIC_URL}/images/avatars/姜袭明.png` },
  'WuCe': { name: '吴策', avatar: `${process.env.PUBLIC_URL}/images/avatars/吴策.png` },
  'WuXingzhi': { name: '吾行之', avatar: `${process.env.PUBLIC_URL}/images/avatars/吾行之.png` },
  'DuLingyuan': { name: '杜伶鸳', avatar: `${process.env.PUBLIC_URL}/images/avatars/杜伶鸳.png` },
  'HuaQinrui': { name: '花沁蕊', avatar: `${process.env.PUBLIC_URL}/images/avatars/花沁蕊.png` },
  'MuHu': { name: '慕虎', avatar: `${process.env.PUBLIC_URL}/images/avatars/慕虎.png` },
  'NanGongSheng': { name: '南宫生', avatar: `${process.env.PUBLIC_URL}/images/avatars/南宫生.png` },
  'XiaoBu': { name: '小布', avatar: `${process.env.PUBLIC_URL}/images/avatars/小布.png` },
  'TuKui': { name: '屠馗', avatar: `${process.env.PUBLIC_URL}/images/avatars/屠馗.png` },
  'YeMingming': { name: '叶冥冥', avatar: `${process.env.PUBLIC_URL}/images/avatars/叶冥冥.png` },
  'JiFangSheng': { name: '姬方生', avatar: `${process.env.PUBLIC_URL}/images/avatars/姬方生.png` },
  'LiMan': { name: '李㵘', avatar: `${process.env.PUBLIC_URL}/images/avatars/李㵘.png` },
  'QiWangyou': { name: '祁忘忧', avatar: `${process.env.PUBLIC_URL}/images/avatars/祁忘忧.png` },
  'FengXu': { name: '风绪', avatar: `${process.env.PUBLIC_URL}/images/avatars/风绪.png` }
};

const CardLibraryContainer: React.FC = () => {
  const [activeType, setActiveType] = useState<string>('sect');
  const [activeCategory, setActiveCategory] = useState<string>('cloud-spirit');
  const [activePhase, setActivePhase] = useState<string>('all');
  const [activeTracking, setActiveTracking] = useState<string>('match');
  const { trackingCards, deckTrackingCards, updateTracking, updateDeckTracking } = useTracking();

  const cards = useMemo(() => {
    const allCards: CardType[] = [];
    const currentTrackingCards = activeTracking === 'match' ? trackingCards : deckTrackingCards;
    
    const processCardLibrary = (libData: Record<string, any>) => {
      Object.entries(libData).forEach(([name, card]) => {
        if (activeType === 'personal') {
          if (card.type === 'personal' && personalSectMap[card.category] === activeCategory) {
            allCards.push({
              ...card,
              name,
              level: -1,
              isTracking_match: currentTrackingCards[name] || false
            });
          }
        } else if (
          (activeType === 'side-jobs' ? card.type === 'side-jobs' : card.type === activeType) &&
          card.category === activeCategory &&
          (activePhase === 'all' || card.phase.toString() === activePhase)
        ) {
          allCards.push({
            ...card,
            name,
            level: -1,
            isTracking_match: currentTrackingCards[name] || false
          });
        }
      });
    };

    processCardLibrary(cardLibData);
    processCardLibrary(specialCardLibData);
    
    return allCards;
  }, [activeType, activeCategory, activePhase, activeTracking, trackingCards, deckTrackingCards]);

  return (
    <div className="card-library-container">
      <div className="filters-container">
        <div className="filter-group">
          {trackingFilters.map(filter => (
            <button
              key={filter.id}
              className={`filter-button ${activeTracking === filter.id ? 'active' : ''}`}
              onClick={() => setActiveTracking(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="filter-group">
          {typeFilters.map(filter => (
            <button
              key={filter.id}
              className={`filter-button ${activeType === filter.id ? 'active' : ''}`}
              onClick={() => {
                setActiveType(filter.id);
                setActiveCategory(categoryFilters[filter.id as keyof typeof categoryFilters][0].id);
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="filter-group">
          {categoryFilters[activeType as keyof typeof categoryFilters].map(filter => (
            <button
              key={filter.id}
              className={`filter-button ${activeCategory === filter.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {activeType !== 'personal' && (
          <div className="filter-group">
            {(activeType === 'fortune' ? fortunePhaseFilters : phaseFilters).map(filter => (
              <button
                key={filter.id}
                className={`filter-button ${activePhase === filter.id ? 'active' : ''}`}
                onClick={() => setActivePhase(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="cards-container">
        <div className="cards-grid">
          {activeType === 'personal' ? (
            Object.entries(
              cards.reduce((groups: Record<string, CardType[]>, card) => {
                const characterName = card.category;
                if (!groups[characterName]) {
                  groups[characterName] = [];
                }
                groups[characterName].push(card);
                return groups;
              }, {})
            ).map(([characterName, characterCards]) => (
              <React.Fragment key={characterName}>
                <div className="phase-divider">
                  <div className="character-header">
                    <img 
                      src={characterInfo[characterName]?.avatar || `${process.env.PUBLIC_URL}/images/avatars/default.jpg`} 
                      alt={characterInfo[characterName]?.name || characterName}
                      className="character-avatar"
                    />
                    <span className="character-name">
                      {characterInfo[characterName]?.name || characterName}
                    </span>
                  </div>
                </div>
                {characterCards.map(card => (
                  <Card
                    key={card.name}
                    card={card}
                    inHistory={false}
                    tail={
                      <div className="card-tail">
                        {card["match-recommend"] && <RecommendLabel />}
                        <TrackButton 
                          card={card} 
                          isTracking={activeTracking === 'match' ? (trackingCards[card.name] || false) : (deckTrackingCards[card.name] || false)}
                          onTrackingClick={activeTracking === 'match' ? updateTracking : updateDeckTracking}
                        />
                      </div>
                    }
                  />
                ))}
              </React.Fragment>
            ))
          ) : activePhase === 'all' ? (
            [1, 2, 3, 4, 5, ...(activeType === 'fortune' ? [6] : [])].map(phase => {
              const phaseCards = cards.filter(card => card.phase === phase);
              if (phaseCards.length === 0) return null;
              
              return (
                <React.Fragment key={phase}>
                  <div className="phase-divider" />
                  {phaseCards.map(card => (
                    <Card
                      key={card.name}
                      card={card}
                      inHistory={false}
                      tail={
                        <div className="card-tail">
                          {card["match-recommend"] && <RecommendLabel />}
                          <TrackButton 
                            card={card} 
                            isTracking={activeTracking === 'match' ? (trackingCards[card.name] || false) : (deckTrackingCards[card.name] || false)}
                            onTrackingClick={activeTracking === 'match' ? updateTracking : updateDeckTracking}
                          />
                        </div>
                      }
                    />
                  ))}
                </React.Fragment>
              );
            })
          ) : (
            cards.map(card => (
              <Card
                key={card.name}
                card={card}
                inHistory={false}
                tail={
                  <div className="card-tail">
                    {card["match-recommend"] && <RecommendLabel />}
                    <TrackButton 
                      card={card} 
                      isTracking={activeTracking === 'match' ? (trackingCards[card.name] || false) : (deckTrackingCards[card.name] || false)}
                      onTrackingClick={activeTracking === 'match' ? updateTracking : updateDeckTracking}
                    />
                  </div>
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CardLibraryContainer; 