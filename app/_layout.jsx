import { Stack } from "expo-router";
import React from "react";
import {GameSetupProvider} from '../contexts/GameSetupContext'
export default function RootLayout() {
  return (
    <GameSetupProvider>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="game-setup" />
      </Stack>
    </GameSetupProvider>
  );
}
