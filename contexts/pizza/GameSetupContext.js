import { createContext, useState } from "react";

export const GameSetupContext = createContext();
export const GameSetupProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);

    return (
        <GameSetupContext.Provider value={{ players, setPlayers }}>
            {children}
        </GameSetupContext.Provider>
    )
}