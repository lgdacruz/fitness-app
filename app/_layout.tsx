import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Header from "../src/components/header";
import { TrainingProvider } from "../src/contexts/training";

export default function App() {
  return (
    <TrainingProvider>
      <Stack
        screenOptions={{
          header: () => <Header />,
          contentStyle: { backgroundColor: "#131313" },
        }}
      />
      <StatusBar style="light" />
    </TrainingProvider>
  );
}
