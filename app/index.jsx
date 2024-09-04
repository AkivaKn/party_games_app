import { Link } from "expo-router";
import { View, StyleSheet, Text, Pressable } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Truth or Dare. Let's get started.</Text>
      <Link href="/game-setup" asChild>
        <Pressable>
          <Text>New Game</Text>
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
