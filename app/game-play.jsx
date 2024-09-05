import { useContext, useEffect, useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { GameSetupContext } from "../contexts/GameSetupContext";
import truthData from "../assets/game-assets/truth.json";
import dareData from "../assets/game-assets/dare.json";
import { router } from "expo-router";

export default function GamePlay() {
  const { players } = useContext(GameSetupContext);
  const { drinking } = useContext(GameSetupContext);
  const { spiceLevel } = useContext(GameSetupContext);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [showTruthOrDare, setShowTruthOrDare] = useState(true);
  const [currentGame, setCurrentGame] = useState({});
  const [truthsList, setTruthsList] = useState(truthData.truths);
  const [daresList, setDaresList] = useState(dareData.dares);
  const [currentPlayer, setCurrentPlayer] = useState(0);
    const { setScoreSheet } = useContext(GameSetupContext);

  useEffect(() => {
    setShowTruthOrDare(true);
  }, [questionNumber]);

  useEffect(() => {
    setTruthsList((currList) => {
      return currList.filter((truth) => truth.spiceLevel <= spiceLevel);
    });
    setDaresList((currList) => {
      return currList.filter((dare) => dare.spiceLevel <= spiceLevel);
    });
  }, []);

  const handleSelection = (selection) => {
    if (selection === "truth") {
      const index = Math.floor(Math.random() * truthsList.length);
      setCurrentGame({ ...truthsList[index] });
      setShowTruthOrDare(false);
      setTruthsList((currList) => {
        const newList = [...currList];
        newList.splice(index, 1);
        return newList;
      });
    } else if (selection === "dare") {
      const index = Math.floor(Math.random() * daresList.length);
      setCurrentGame({ ...daresList[index] });
      setShowTruthOrDare(false);
      setDaresList((currList) => {
        const newList = [...currList];
        newList.splice(index, 1);
        return newList;
      });
    }
  };

    const nextQuestion = (completed) => {
        if (!drinking && completed) {
            setScoreSheet((currScores) => {
                const newScores = { ...currScores };
                newScores[players[currentPlayer]] = currScores[players[currentPlayer]] + currentGame.forfeit;
                return newScores;
          })
        }
        if (questionNumber === 10) {
            router.push('/game-over')
        }
    setCurrentPlayer((currPlayer) => {
      if (currPlayer < players.length - 1) {
        return currPlayer + 1;
      } else {
        return 0;
      }
    });
    setQuestionNumber((currNumber) => currNumber + 1);
    setCurrentGame({});
  };

  return showTruthOrDare ? (
    <View>
      <Text>{players[currentPlayer]}</Text>
      <Button title="Truth" onPress={() => handleSelection("truth")} />
      <Button title="Dare" onPress={() => handleSelection("dare")} />
    </View>
  ) : (
    <View>
      <Text>{players[currentPlayer]}</Text>
      <Text>{currentGame.text}</Text>
      <Pressable onPress={()=> nextQuestion(false)}>
        <Text>
          {drinking ? `Drink ${"🥃".repeat(currentGame.forfeit)}` : "Forfeit"}
        </Text>
      </Pressable>
      <Pressable onPress={()=> nextQuestion(true)}>
                  <Text>Done{ !drinking && ` +${currentGame.forfeit}`}</Text>
      </Pressable>
    </View>
  );
}
