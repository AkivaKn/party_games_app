import { AntDesign } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GameSetupContext } from "../../contexts/pizza/GameSetupContext";
import { router } from "expo-router";

export default function GameSetup() {
  const { players, setPlayers } = useContext(GameSetupContext);
  const [newPlayer, setNewPlayer] = useState("");
  const [playerError, setPlayerError] = useState("");

  const handleNewPlayerChange = (text) => {
    setNewPlayer(text);
  };
  const addPlayer = () => {
    if (newPlayer.length == 0) return;
    if (players.includes(newPlayer)) {
      setPlayerError("Player already exists.");
      return;
    }
    setPlayers((currPlayers) => [...currPlayers, newPlayer]);
    setNewPlayer("");
    setPlayerError("");
  };
  const deletePlayer = (index) => {
    setPlayers((currPlayers) => {
      const filteredPlayers = [...currPlayers];
      filteredPlayers.splice(index, 1);
      return filteredPlayers;
    });
  };

  const startGame = () => {
    if (players.length >= 2) {
      setPlayerError("");
      router.push("pizza/game-play");
    } else {
      setPlayerError("Please add at least 2 players.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Setup</Text>
      <Text style={styles.subtitle}>Add Players</Text>
      <TextInput
        value={newPlayer}
        onChangeText={handleNewPlayerChange}
        placeholder="Enter name"
        style={styles.input}
        cursorColor={"black"}
        editable={players.length < 5}
      />
      {playerError && <Text style={styles.errorText}>{playerError}</Text>}
      <Pressable style={styles.addButton} onPress={addPlayer}>
        <Text style={styles.addButtonText}>Add Player</Text>
      </Pressable>
      {players.map((player, index) => {
        return (
          <View key={index} style={styles.playerCard}>
            <Text style={styles.playerText}>{player}</Text>
            <AntDesign.Button
              onPress={() => deletePlayer(index)}
              name="closecircleo"
              size={20}
              color="#ff1744"
              backgroundColor="transparent"
              iconStyle={{ marginRight: 0 }}
            />
          </View>
        );
      })}
      <Pressable style={styles.startButton} onPress={startGame}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbe9e7",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF5722",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#757575",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    width: 200,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 17,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#FF5722",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  playerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 10,
    marginBottom: 10,
    width: 200,
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  playerText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff1744",
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: "#FF5722",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
