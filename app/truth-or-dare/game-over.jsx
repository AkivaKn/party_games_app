import { useContext } from "react";
import { GameSetupContext } from "../../contexts/truth-or-dare/GameSetupContext";
import { Text, View, StyleSheet, Pressable, Dimensions } from "react-native";
import { Link } from "expo-router";

export default function GameOver() {
  const { players } = useContext(GameSetupContext);
  const { drinking } = useContext(GameSetupContext);
  const { scoreSheet } = useContext(GameSetupContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over</Text>
      {!drinking && (
        <View style={styles.scoresContainer}>
          <Text style={styles.subtitle}>Scores:</Text>
          {players.map((player) => (
            <Text
              key={player}
              style={styles.scoreText}
            >{`${player}: ${scoreSheet[player]}`}</Text>
          ))}
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <Link replace href="truth-or-dare/" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Home</Text>
          </Pressable>
        </Link>
        <Link replace href="truth-or-dare/game-setup" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>New Game</Text>
          </Pressable>
        </Link>
      </View>
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
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF5722",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  scoresContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#FF5722",
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
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
