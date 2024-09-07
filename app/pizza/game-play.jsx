import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  Button,
  Animated,
  Easing,
  Alert,
  Dimensions,
} from "react-native";
import { GameSetupContext } from "../../contexts/pizza/GameSetupContext";

export default function GamePlay() {
  const { players } = useContext(GameSetupContext);
  const [circles, setCircles] = useState([]); 
  const [coinPosition, setCoinPosition] = useState({ x: 0, y: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [newRule, setNewRule] = useState("");
  const [coinAnimation] = useState(new Animated.ValueXY({ x: 0, y: 0 }));

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const canvasWidth = screenWidth * 0.95;
  const canvasHeight = screenHeight * 0.7;

  const randomPosition = (radius) => {
    return {
      x: Math.random() * (canvasWidth - 2 * radius) + radius,
      y: Math.random() * (canvasHeight - 2 * radius) + radius,
    };
  };

  const circlesDoNotOverlap = (newCircle, circles) => {
    for (let circle of circles) {
      const distance = Math.sqrt(
        (newCircle.x - circle.x) ** 2 + (newCircle.y - circle.y) ** 2
      );
      if (distance < newCircle.radius + circle.radius + 4) {
        let newRadius = distance - circle.radius - 4;
        return newRadius;
      }
    }
    return newCircle.radius;
  };

  useEffect(() => {
    const initialCircles = [];
    players.forEach((player) => {
      let newRadius = false;
      let newCircle = {};
      do {
        let radius = Math.random() * 15 + 25; 
        newCircle = {
          ...randomPosition(radius),
          radius,
          playerName: player,
          type: "player",
        };
        newRadius = circlesDoNotOverlap(newCircle, initialCircles);
      } while (!newRadius);
      newCircle.radius = newRadius;
      initialCircles.push(newCircle);
    });
    setCircles(initialCircles);
  }, [players]);

  const checkCoinLanding = (x, y) => {
    for (let circle of circles) {
      const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
      if (distance <= circle.radius + 13) {
        return circle; 
      }
    }
    return null; 
  };

  const tossCoin = () => {
    const randomX = Math.random() * (canvasWidth -20) +10;
    const randomY = Math.random() * (canvasHeight - 20) +10;

    Animated.sequence([
      Animated.timing(coinAnimation, {
        toValue: { x: randomX - 25, y: randomY - 25 },
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setCoinPosition({ x: randomX, y: randomY });

      const landedCircle = checkCoinLanding(randomX, randomY);
      if (landedCircle) {
        if (landedCircle.type === "player") {
          Alert.alert("Drink!", `${landedCircle.playerName} must drink!`);
        } else if (landedCircle.type === "rule") {
          Alert.alert("Rule!", `${landedCircle.rule}`);
        }
      } else {
        setModalVisible(true);
      }
    });
  };

  const handleAddRule = () => {
    if (newRule.trim().length === 0) {
      Alert.alert("Error", "Rule cannot be empty.");
      return;
    }

    const newCircle = {
      x: coinPosition.x,
      y: coinPosition.y,
      radius: Math.random() * 15 + 25, 
      rule: newRule,
      type: "rule", 
    };
    let newRadius = false;
    do {
      newRadius = circlesDoNotOverlap(newCircle, circles);
    } while (!newRadius);
    newCircle.radius = newRadius;
    setCircles([...circles, newCircle]);
    setModalVisible(false);
    setNewRule("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Play</Text>

      <View
        style={[styles.canvas, { width: canvasWidth, height: canvasHeight }]}
      >
        {circles.map((circle, index) => (
          <View
            key={index}
            style={[
              styles.circle,
              {
                left: circle.x - circle.radius,
                top: circle.y - circle.radius,
                width: circle.radius * 2,
                height: circle.radius * 2,
                borderRadius: circle.radius,
              },
            ]}
          >
            <Text style={styles.circleText}>
              {circle.playerName || circle.rule}
            </Text>
          </View>
        ))}

        <Animated.View
          style={[
            styles.coin,
            {
              transform: [
                { translateX: coinAnimation.x },
                { translateY: coinAnimation.y },
              ],
            },
          ]}
        >
          <Text style={styles.coinText}>🪙</Text>
        </Animated.View>
      </View>

      <Pressable style={styles.button} onPress={tossCoin}>
        <Text style={styles.buttonText}>Toss Coin</Text>
      </Pressable>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              value={newRule}
              onChangeText={setNewRule}
              placeholder="Enter new rule"
              style={styles.input}
            />
            <Button title="Add Rule" onPress={handleAddRule} color="#FF5722" />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              color="#757575"
            />
          </View>
        </View>
      </Modal>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  canvas: {
    backgroundColor: "#E0E0E0",
    position: "relative",
    marginBottom: 20,
  },
  circle: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    justifyContent:'center'
  },
  circleText: {
    fontSize: 10,
    color: "#333",
    textAlign: "center",
  },
  coin: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  coinText: {
    fontSize: 24,
  },
  button: {
    backgroundColor: "#FF5722",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
