# YiXianPai Card Counter

A companion app for the YiXianPai card game that helps track cards during matches and manage your deck.

## Features

- **Real-time Card Tracking**: Automatically monitors game logs and tracks card usage
- **Card Deck Manager**: View remaining cards in the deck with filtering options
- **Match History**: Track your match records and performance across rounds
- **Card Library**: Browse and manage tracked cards by sect, side jobs, and cultivation phases
- **Floating Window**: Overlay window that displays important card information during gameplay (in development)

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run in development mode: `npm run electron:dev` (or `npm run mac:dev` on macOS)
4. Build for production: `npm run deploy`

## User Guide

### Getting Started

1. **Launch the App**: Start the app using `npm run mac:dev` (macOS) or `npm run electron:dev` (Windows/Linux)
2. **Start YiXianPai Game**: The app automatically detects the game's data folder:
   - **macOS**: `~/Library/Containers/com.darksun.yixianpai/` or `~/Library/Application Support/com.darksun.yixianpai/`
   - **Windows**: `%USERPROFILE%\AppData\LocalLow\DarkSunStudio\YiXianPai`
3. **Enter a Match**: Once you're in a game match, the app will start tracking automatically

### Main Interface

The app has three main tabs at the bottom:

#### 1. Match Record Tab

This is your main view during gameplay showing real-time match information.

**Player Information Panel** (Top):
- **Avatar & Username**: Current selected player
- **Cultivation**: Your current cultivation level (experience)
- **Max HP**: Maximum health points
- **Physique**: Physical stat (for Duan Xuan sect characters)
- **Destiny**: Your life/destiny points
- **Side Jobs**: Detected side jobs based on cards used

**Tracked Cards Section** (Middle):
- Shows cards you've marked for tracking in the current match
- Filter tabs: **All**, **Sect**, **Side Jobs**, **Fortune**
- Click **Track/Tracking** button to add/remove cards from tracking
- Cards with "Recommended" label are suggested for tracking

**Match History Section** (Bottom):
- Lists all previous rounds in descending order
- Click a round to expand and see details:
  - Round number, cultivation, HP, destiny change
  - Opponent username
  - **Win/Loss** indicator
  - All cards used in that round
- Click **Track** button on any card to add it to your tracking list

#### 2. Card Deck Tab

View remaining cards in the deck with powerful filtering options.

**Filter Controls**:

*Row 1 - Sect Selection*:
- **Cloud Spirit / Heptastar / Five Element / Duan Xuan**: Select sect
- **Sect Cards Only**: Show only sect cards (hide side jobs)

*Row 2 - Side Job Selection*:
- **Elixirist / Fuluist / Musician / Painter / Formation Master / Plant Master / Fortune Teller**
- **Multi-Select**: Enable to select multiple side jobs simultaneously
- **Side Job Cards Only**: Show only side job cards (hide sect cards)

*Row 3 - Cultivation Phase*:
- **All / Qi Refining / Foundation / Golden Core / Nascent Soul / Soul Formation**
- **Multi-Select**: Enable to select multiple phases

*Row 4 - Display Options*:
- **Hide Empty Cards**: Don't show cards with 0 remaining
- **Show Cards ≤1 Only**: Only display critical low-count cards
- **Show Tracked Only**: Filter to show only cards you're tracking

**Card Display**:
- Each card shows its **name** and **remaining count**
- Remaining count is calculated as: `MaxCount - UsedCount`
- **Deck size rules**:
  - Most cards: 8 copies per deck
  - Soul Formation (Phase 5) cards: 6 copies
  - Special elixirs (锻体丹, 还魂丹, 锻体玄丹): 4 copies

#### 3. Manage Tracking Tab

Configure which cards to track for different purposes.

**Tracking Mode Selection**:
- **Match**: Cards to track during match history
- **Deck**: Cards to track in the deck view

**Card Type Filters**:
- **Sect / Side Jobs / Fortune / Personal**: Choose card category

**Category Filters**: 
- Changes based on card type selected
- For **Sect**: Choose your sect
- For **Side Jobs**: Choose your side jobs
- For **Fortune**: Talisman, Spiritual Pet, or Secret Arts by sect
- For **Personal**: Character-specific cards by sect

**Phase Filters**:
- Filter by cultivation phase (includes Void Return for fortune cards)

**Card Grid**:
- Browse all cards matching your filters
- Click **Track/Tracking** button to toggle tracking
- Cards marked "Recommended" are suggested for tracking
- Tracked cards will appear in the respective tracking view

### Tips & Best Practices

1. **Start Tracking Early**: Add cards to tracking before they become critical
2. **Use "Show Cards ≤1 Only"**: Focus on cards that are almost depleted
3. **Track Key Cards**: Focus on high-impact cards like powerful attacks or essential elixirs
4. **Multi-Select Phases**: Track multiple phases if you're in a long match
5. **Check Match History**: Review previous rounds to understand opponent's strategy
6. **Floating Window** (when available): Keep important info visible over the game

### Troubleshooting

**"Waiting for battle data..." message**:
- Make sure YiXianPai is running
- Ensure you're in an active match (not main menu)
- Check that game data files exist in the correct location

**Cards not updating**:
- The app polls game logs every 1 second
- Make sure YiXianPai has write permissions to its data folder

**App not detecting game**:
- Verify game is installed in the standard location
- Check that `BattleLog.json` exists in the game data folder

## Upcoming Features (by priority)

- ~~Show only cards with count < 1 in deck view~~ ✅
- ~~Show only side job cards~~ ✅
- ~~Multi-select side jobs~~ ✅
- ~~Show only sect cards~~ ✅
- Game overlay floating window (in development)
    - Client-side click coordination
    - Remaining card display
    - Track match records
    - Highlight low-count cards
- Manual card count adjustment
- One-click apply recommended tracked cards
- Character-specific card tracking configurations

## Known Issues

- Physique stat not showing for Duan Xuan sect characters (fixing)
- Intel chip Mac support (temporarily resolved based on user feedback)
- Match refresh affecting deck counts
- Network disconnection affecting data writes

## Development

Built with:
- React + TypeScript
- Electron
- Chokidar (file watching)
- node-window-manager (window overlay)

