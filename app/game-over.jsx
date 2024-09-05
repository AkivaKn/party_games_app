import { useContext } from "react";
import { GameSetupContext } from "../contexts/GameSetupContext";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function GameOver() {
  const { players } = useContext(GameSetupContext);
  const { drinking } = useContext(GameSetupContext);
  const { scoreSheet } = useContext(GameSetupContext);
  return (
    <View>
      {!drinking && (
        <>
          <Text>Scores:</Text>
          {players.map((player) => {
            return <Text>{`${player}: ${scoreSheet[player]}`}</Text>;
          })}
        </>
      )}
      <Link href={"/"}>Home</Link>
      <Link href={"game-setup"}>New Game</Link>
    </View>
  );
}
