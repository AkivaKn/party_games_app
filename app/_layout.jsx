import { Stack } from "expo-router";
import React from "react";
import { GameSetupProvider } from '../contexts/GameSetupContext'
import Header from '../components/navigation/Header'

export default function RootLayout() {
  return (
    <GameSetupProvider>
      <Stack >
        <Stack.Screen name="index" options={{
          header: () => <Header screenName='home' />
          }}/>
        <Stack.Screen name="game-setup" options={{
          header: () => <Header screenName='game-setup' />
          }} />
        <Stack.Screen name="game-play" options={{
          header: () => <Header screenName='game-play' />
          }}/>
        <Stack.Screen name="game-over" options={{
          header: () => <Header screenName='game-over' />
          }}/>
        
      </Stack>
    </GameSetupProvider>
  );
}
