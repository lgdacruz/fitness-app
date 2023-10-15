import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { TrainingProvider } from "../src/contexts/training";
import TabBarNavigation from "../src/components/tabBarNavigation";
import { ViewCenter } from "../src/style";
import ModalLoading from "../src/components/modalLoading";

export default function App() {
  return (
    <TrainingProvider>
      <ModalLoading />
      <Tabs
        tabBar={({ state, navigation }) => (
          <TabBarNavigation state={state} navigation={navigation} />
        )}
        screenOptions={{ header: () => <ViewCenter hg="20px" /> }}
      />
      <StatusBar style="light" />
    </TrainingProvider>
  );
}
