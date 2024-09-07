import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import { GameSetupContext } from "../../contexts/truth-or-dare/GameSetupContext";
import truthData from "../../assets/game-assets/truth.json";
import dareData from "../../assets/game-assets/dare.json";
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
    setTruthsList((currList) =>
      currList.filter((truth) => truth.spiceLevel <= spiceLevel)
    );
    setDaresList((currList) =>
      currList.filter((dare) => dare.spiceLevel <= spiceLevel)
    );
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
        newScores[players[currentPlayer]] =
          currScores[players[currentPlayer]] + currentGame.forfeit;
        return newScores;
      });
    }
    if (questionNumber === 10) {
      router.push("truth-or-dare/game-over");
    } else {
      setCurrentPlayer((currPlayer) =>
        currPlayer < players.length - 1 ? currPlayer + 1 : 0
      );
      setQuestionNumber((currNumber) => currNumber + 1);
      setCurrentGame({});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.playerText}>{players[currentPlayer]}</Text>
      {showTruthOrDare ? (
        <View style={styles.selectionContainer}>
          <Pressable
            style={styles.truthButton}
            onPress={() => handleSelection("truth")}
          >
            <Text style={styles.buttonText}>Truth</Text>
          </Pressable>
          <Pressable
            style={styles.dareButton}
            onPress={() => handleSelection("dare")}
          >
            <Text style={styles.buttonText}>Dare</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.gameContainer}>
          <Text style={styles.gameText}>{currentGame.text}</Text>
          <View style={styles.actionsContainer}>
            <Pressable
              style={styles.forfeitButton}
              onPress={() => nextQuestion(false)}
            >
              <Text style={styles.actionButtonText}>
                {drinking
                  ? `Drink ${"🥃".repeat(currentGame.forfeit)}`
                  : "Forfeit"}
              </Text>
            </Pressable>
            <Pressable
              style={styles.doneButton}
              onPress={() => nextQuestion(true)}
            >
              <Text style={styles.actionButtonText}>
                Done{!drinking && ` +${currentGame.forfeit}`}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbe9e7",
    paddingHorizontal: 20,
  },
  playerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF5722",
    marginVertical: 30,
  },
  selectionContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  truthButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    alignItems: "center",
    width: width * 0.7,
  },
  dareButton: {
    backgroundColor: "#F44336",
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    alignItems: "center",
    width: width * 0.7,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  gameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  gameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  forfeitButton: {
    backgroundColor: "#FFC107",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    alignItems: "center",
    width: width * 0.4,
  },
  doneButton: {
    backgroundColor: "#3F51B5",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    alignItems: "center",
    width: width * 0.4,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
