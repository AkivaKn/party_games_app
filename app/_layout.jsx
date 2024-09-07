import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack headerShown={false}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="truth-or-dare" options={{ headerShown: false }} />
      <Stack.Screen name="pizza" options={{ headerShown: false }} />
     
    </Stack>
  );
}
