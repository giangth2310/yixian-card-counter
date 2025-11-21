# YiXianPai Card Counter - Project Summary

## Project Overview

**Name:** YiXianPai Card Counter (弈仙牌记牌器)  
**Type:** Electron + React Desktop Application  
**Purpose:** Companion app for the YiXianPai card game that tracks cards during matches and manages deck information  
**Repository:** https://github.com/giangth2310/yixian-card-counter  

## What This App Does

A real-time card tracking tool for YiXianPai (弈仙牌) that helps players:
- Track which cards have been played in matches
- View remaining card counts in the deck
- Monitor match history and player statistics
- Manage tracked cards for strategic gameplay

## Technical Architecture

### Stack
- **Frontend:** React 18 + TypeScript
- **Desktop Framework:** Electron 29
- **Build Tool:** Electron Forge + React Scripts
- **File Watching:** Chokidar (monitors game log files)
- **Window Management:** node-window-manager (for overlay windows)

### How It Works

1. **Data Source:**
   - Monitors game data folder:
     - macOS: `~/Library/Containers/com.darksun.yixianpai/` or `~/Library/Application Support/com.darksun.yixianpai/`
     - Windows: `%USERPROFILE%\AppData\LocalLow\DarkSunStudio\YiXianPai`
   - Watches two key files:
     - `BattleLog.json` - Match/round information (players, health, cards used)
     - `CardOperationLog.json` - Card draw and upgrade operations

2. **Real-time Monitoring:**
   - Polls game log files every 1 second (setInterval in `battleLogConverter.ts` and `cardOperationLogConverter.ts`)
   - Converts raw game data to usable format
   - Writes converted data to:
     - `ConvertedBattleLog.json`
     - `ConvertedCardOperationLog.json`
   - Notifies React app via Electron IPC events

3. **Card Tracking:**
   - Tracks card operations (draws, upgrades)
   - Calculates remaining cards: `MaxCount - UsedCount`
   - Deck rules:
     - Most cards: 8 copies per deck
     - Soul Formation (Phase 5) cards: 6 copies
     - Special elixirs (锻体丹, 还魂丹, 锻体玄丹): 4 copies

## Key Files & Structure

### Electron Main Process
- `electron/main.ts` - Main Electron process, creates windows, handles IPC
- `electron/battleLogConverter.ts` - Converts battle log to app format
- `electron/cardOperationLogConverter.ts` - Converts card operation log
- `electron/preload.ts` - Bridge between main and renderer processes
- `electron/utils.ts` - Utility functions (game path detection)

### React Components
- `App.tsx` - Main application container
- `Card.tsx` - Card display component with translation
- `CardDeck.tsx` - Remaining cards view with filters
- `CardLibraryContainer.tsx` - Card library management
- `MatchRecord.tsx` - Main match view container
- `MatchHistory.tsx` - Individual match history display
- `MatchHistoryContainer.tsx` - Match history list
- `MatchHistoryCard.tsx` - Card in match history
- `MenuTabContainer.tsx` - Bottom navigation tabs
- `PlayerInfoContainer.tsx` - Player stats display
- `TrackingCardContainer.tsx` - Tracked cards view

### Data & Context
- `src/contexts/TrackingContext.tsx` - Manages tracked cards state
- `src/contexts/PlayerContext.tsx` - Manages player state
- `src/data/card_lib.json` - Card library definitions
- `src/data/special_card_lib.json` - Special/personal cards
- `src/data/terms.json` - Translation mapping (305,147 lines)
- `src/models/model.ts` - TypeScript interfaces and types

### Utilities
- `src/utils/translateCardName.ts` - Card name translation utility
  - Loads terms.json mapping
  - Normalizes different dot characters (•·●・)
  - Translates Chinese card names to Vietnamese

## Game Terminology

### Sects (门派)
- Cloud Spirit (云灵剑宗) - Vân Linh Kiếm Tông
- Heptastar (七星阁) - Thất Tinh Các
- Five Element (五行道盟) - Ngũ Hành Đạo Minh
- Duan Xuan (锻玄宗) - Đoán Huyền Tông

### Side Jobs (副职)
- Elixirist (炼丹师) - Luyện đan sư
- Fuluist (符咒师) - Phù chú sư
- Musician (琴师) - Cầm sư
- Painter (画师) - Họa sư
- Formation Master (阵法师) - Trận pháp sư
- Plant Master (灵植师) - Linh thực sư
- Fortune Teller (命理师) - Mệnh lý sư

### Cultivation Phases (境界)
- Phase 1: Qi Refining (炼气) - Luyện khí
- Phase 2: Foundation (筑基) - Trúc Cơ
- Phase 3: Golden Core (金丹) - Kim Đan
- Phase 4: Nascent Soul (元婴) - Nguyên Anh
- Phase 5: Soul Formation (化神) - Hóa Thần
- Phase 6: Void Return (返虚) - Phản Hư (fortune cards only)

### Player Stats
- Cultivation (修为) - Tu vi
- Max HP (生命上限) - HP tối đa
- Physique (体魄) - Thể phách
- Destiny (命元) - Mệnh nguyên
- Side Jobs (副职) - Phó nghề

## UI Structure

### Three Main Tabs

1. **Match Record (对战记录 / Lịch sử đấu)**
   - Player info panel (top)
   - Tracked cards section (middle)
   - Match history (bottom - expandable)
   - Resizable divider between tracked cards and history

2. **Card Deck (剩余牌库 / Bộ bài còn lại)**
   - Filters: Sect, Side Jobs (multi-select), Phases (multi-select)
   - Display options: Hide empty, Show ≤1 only, Show tracked only
   - Shows remaining card count for each card
   - Cards grouped by phase with dividers

3. **Manage Tracking (管理追踪卡牌 / Quản lý theo dõi)**
   - Two modes: Match tracking / Deck tracking
   - Filters: Card type, Category, Phase
   - Browse and toggle tracking for cards
   - Cards marked as "Recommended" (推荐 / Đề xuất)

### Additional Features
- **Floating Window (悬浮窗 / Cửa sổ nổi)** - In development
  - Overlay window on top of game
  - Auto-detects YiXianPai window (fullscreen or windowed)
  - Shows/hides based on game focus
  - Uses node-window-manager for detection

## Translation Work Completed

### Branches
1. **main** - Original Chinese version
2. **giangth2310/english** - Full English translation
3. **giangth2310/vietnamese** - Full Vietnamese translation

### Vietnamese Translation Details

**Files Translated (12 total):**
1. README.md - Full user guide in Vietnamese
2. All UI components (11 files)
3. Card names - Auto-translated using terms.json

**Key Implementation:**
- Created `translateCardName.ts` utility
- Uses terms.json (official game translation file) for consistency
- Handles different dot character variants: •·●・
- Normalizes card names before lookup to handle variations like:
  - 天命•重现 (with • bullet)
  - 天命·重现 (with · middle dot)

**CSS Fixes:**
- Card images maintain fixed size (25x25px) regardless of name length
- Long Vietnamese names truncated with ellipsis (...)
- Used `flex-shrink: 0` on images, levels, and buttons
- Used `min-width: 0` on card names for proper text overflow

**Commits:**
1. Main UI and README translation
2. Card name translation feature
3. Fixed terms.json import path (moved to src/data/)
4. Fixed dot character normalization
5. Fixed card image scaling with long names

## Data Flow

```
YiXianPai Game
    ↓ writes
BattleLog.json / CardOperationLog.json
    ↓ polled every 1s
Converter Scripts (Electron Main)
    ↓ converts & writes
ConvertedBattleLog.json / ConvertedCardOperationLog.json
    ↓ IPC event
React App (loads files)
    ↓
State Update → UI Re-render
```

## Build & Deployment

### Development
```bash
npm install
npm run mac:dev      # macOS
npm run electron:dev # Windows/Linux
```

### Production Build
```bash
npm run deploy
```

**Output Locations:**
- macOS: `out/make/zip/darwin/x64/`
- Windows: `out/make/squirrel.windows/x64/yixian-card-counter-setup.exe`
- Linux: `out/make/deb/x64/` and `out/make/rpm/x64/`

### Configuration
- `forge.config.js` - Electron Forge configuration
- Icons: `public/favicon.ico` (Windows), `public/favicon.icns` (macOS)
- Maker: Squirrel for Windows (creates setup.exe)

## Important Notes

### File Storage
**Tracked cards saved to:**
- `{GamePath}/match_tracking_cards.json` - Cards tracked in match view
- `{GamePath}/deck_tracking_cards.json` - Cards tracked in deck view

### Known Issues
1. Physique stat not showing for Duan Xuan sect characters (fixing)
2. Intel chip Mac support (temporarily resolved)
3. Match refresh affecting deck counts
4. Network disconnection affecting data writes

### Future Features (Planned)
- Hot update system (on hold - firewall issues in China)
- Manual card count adjustment
- One-click apply recommended tracked cards
- Character-specific tracking configurations
- Floating window completion

## Development Tips

### Testing Translation
The app has hot reload, so changes to translation files will update immediately.

### Adding New Translations
1. Update terms.json or create new translation utility
2. Import in component: `import translateCardName from '../utils/translateCardName'`
3. Use in JSX: `{translateCardName(card.name)}`

### Debugging
- Main process logs: Check terminal where `npm run mac:dev` is running
- Renderer logs: Open DevTools (View → Toggle Developer Tools)
- File locations: Check `electron/utils.ts` for game path logic

## Package Dependencies

**Key Dependencies:**
- `electron`: ^29.4.6
- `react`: ^18.2.0
- `chokidar`: ^4.0.3 (file watching)
- `node-window-manager`: ^2.2.4 (window detection)
- `electron-is-dev`: ^2.0.0

**Dev Dependencies:**
- `@electron-forge/*`: Build and packaging
- `typescript`: ^4.9.5
- `concurrently`: ^8.2.2 (run multiple commands)
- `wait-on`: ^7.2.0 (wait for dev server)

## Git Repository Structure

```
main branch (Chinese)
├── giangth2310/english (English translation)
└── giangth2310/vietnamese (Vietnamese translation)
```

All translations maintain the same functionality, only UI text differs.

## Contact & Attribution
- Original Author: Cookie (jiangy10)
- Fork Maintainer: giangth2310
- Built for YiXianPai game by DarkSun Studio

