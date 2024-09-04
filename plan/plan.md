# MVP

## User stories

- User can open the app and select new game
- User can add players to the game
- User can choose drinking or no drinking
- User can select the spice rating of the game 
- User can start a game
- User can select truth or dare
- User can see a truth/dare
- User can see a forfeit drink amount if it's a drinking game
- User can forfeit and lose points if it's not a drinking game
- User can see a points tally for each player
- User can see the final scores after a game
- User can see a home button in the navbar
- User can see a quit game button in the navbar when in playing mode
- User can see an info button in navbar
- User can see an instructions button in navbar

## Components

- Home screen
    - Welcome message
    - New game button

- Game Setup screen
    - Add players
    - Select drinking / no drinking
    - Select spice level
    - Start game

- Game screen
    - Current players name
    - Truth or dare buttons
    - Once selected render random truth or dare from JSON file
    - Buttons for forfeit and completed

- Game over screen
    - Score tally where applicable
    - New game and home buttons
    - New game redirects to Game Setup screen with autofilled players and options

- Navbar
    - Instructions button
    - Info button
    - Home button 
    - Quit game button when in game screen
