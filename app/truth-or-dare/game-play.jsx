import { useContext, useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
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
  const [currentSelection, setCurrentSelection] = useState("");


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
      setCurrentSelection("Truth");
      const index = Math.floor(Math.random() * truthsList.length);
      setCurrentGame({ ...truthsList[index] });
      setShowTruthOrDare(false);
      setTruthsList((currList) => {
        const newList = [...currList];
        newList.splice(index, 1);
        return newList;
      });
    } else if (selection === "dare") {
      setCurrentSelection("Dare");
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
    if (questionNumber === 10) {
      router.push("truth-or-dare/game-over");
    } else {
      setCurrentPlayer((currPlayer) =>
        currPlayer < players.length - 1 ? currPlayer + 1 : 0
      );
      setShowTruthOrDare(true)
    setQuestionNumber((currNumber) => currNumber + 1);
  }
  if (!drinking && completed) {
    setScoreSheet((currScores) => {
      const newScores = { ...currScores };
      newScores[players[currentPlayer]] =
      currScores[players[currentPlayer]] + currentGame.forfeit;
      return newScores;
    });
  }
  setCurrentGame({});
  };

  return (
    <View style={styles.container}>
      {showTruthOrDare ? (
        <View style={styles.gameContainer}>
          <Text style={styles.playerText}>{players[currentPlayer]}</Text>
          <Text style={styles.playerText}>Make your choice</Text>
          <View style={styles.selectionContainer}>
            <View style={[styles.cardWrapper, styles.truthCardWrapper]}>
              {Array.from({ length: 10 }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.card,
                    styles.truthCard,
                    { left: index * 1.5, top: index * 0.75 },
                  ]}
                >
                </View>
              ))}
            <Pressable
                  style={[
                    styles.card,
                    styles.truthCard,
                    { left: 15, top: 7.5 },
                  ]}
                  onPress={() => handleSelection("truth")}
                >
                  <Text style={styles.cardText}>Truth</Text>
                </Pressable>
            </View>
            <Text style={styles.orText}>or</Text>
            <View style={[styles.cardWrapper, styles.dareCardWrapper]}>
              {Array.from({ length: 10 }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.card,
                    styles.dareCard,
                    { right: index * 1.5, top: index * 0.75 },
                  ]}
                >
                  <Text style={styles.cardText}>Dare</Text>
                </View>
              ))}
               <Pressable
                  style={[
                    styles.card,
                    styles.dareCard,
                    { right: 15, top: 7.5 },
                  ]}
                  onPress={() => handleSelection("dare")}
                >
                  <Text style={styles.cardText}>Dare</Text>
                </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.gameContainer}>
          <Text style={styles.playerText}>{players[currentPlayer]}</Text>

          <View style={styles.cardFace}>
            <Text style={styles.cardFaceCornerTextTopLeft}>
              {currentSelection}
            </Text>

            <Text style={styles.cardFaceText}>{currentGame.text}</Text>
            <Text style={styles.cardFaceCornerTextBottomRight}>
              {currentSelection}
            </Text>
          </View>
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

const { width } = Dimensions.get("window");

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
  },
  selectionContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  cardWrapper: {
    width: width * 0.3,
    height: width * 0.43,
    marginHorizontal: 10,
    position: "relative",
  },
  card: {
    width: width * 0.3,
    height: width * 0.43,
    position: "absolute",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  truthCard: {
    backgroundColor: "#4CAF50",
  },
  truthCardWrapper: {
    transform: [{ rotate: "-10deg" }],
  },
  dareCardWrapper: {
    transform: [{ rotate: "10deg" }],
  },
  dareCard: {
    backgroundColor: "#F44336",
  },
  cardText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  orText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 20,
    paddingBottom: 70,
  },
  gameContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 40,
  },
  cardFace: {
    width: 240, // Adjusted width for physical card ratio
    height: 336, // Adjusted height for physical card ratio
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 2, // Outer border
    borderColor: "#DDDDDD",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    padding: 10,
    position: "relative",
    overflow: "hidden",
  },
  cardFaceText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    textShadowColor: "#ccc",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginHorizontal: 10,
  },
  cardFaceCornerTextTopLeft: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardFaceCornerTextBottomRight: {
    position: "absolute",
    bottom: 10,
    right: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    transform: [{ rotate: "180deg" }],
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
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
