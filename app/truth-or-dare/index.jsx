import { Link } from "expo-router";
import { View, StyleSheet, Text, Pressable } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Welcome to Truth or Dare! 🎉</Text>
      <Text style={styles.subtitle}>Ready to have some fun? Let’s get started!</Text>
      <Link href="truth-or-dare/game-setup" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Start New Game</Text>
        </Pressable>
      </Link>
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF5722", 
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#757575", 
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF5722", 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8, 
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF", 
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
