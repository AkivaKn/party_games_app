import { createContext, useState } from "react";

export const GameSetupContext = createContext();
export const GameSetupProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);
    const [drinking, setDrinking] = useState(false);
    const [spiceLevel, setSpiceLevel] = useState(0);
    const [scoreSheet,setScoreSheet] = useState({})

    return (
        <GameSetupContext.Provider value={{ players, setPlayers,drinking,setDrinking,spiceLevel,setSpiceLevel,scoreSheet,setScoreSheet }}>
            {children}
        </GameSetupContext.Provider>
    )
}