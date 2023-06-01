import { createContext, useContext, useEffect, useState } from "react";
import { ContextTrainingTypes, TrainingTypes } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TrainingContext = createContext<ContextTrainingTypes>(
  {} as ContextTrainingTypes
);

export const TrainingProvider = ({ children }) => {
  const [allTrainings, setAllTrainings] = useState<TrainingTypes[]>([]);

  async function GetTrainings() {
    const localTraining = JSON.parse(await AsyncStorage.getItem("@training"));
    if (localTraining) setAllTrainings(localTraining);
    else
      setAllTrainings([
        { last: true, title: "A", training: [] },
        { last: true, title: "B", training: [] },
        { last: true, title: "C", training: [] },
      ]);
  }
  async function SetTrainings() {
    await AsyncStorage.setItem("@training", JSON.stringify(allTrainings));
  }

  useEffect(() => {
    GetTrainings();
  }, []);

  useEffect(() => {
    SetTrainings();
  }, [allTrainings]);

  return (
    <TrainingContext.Provider
      value={{ allTrainings, setAllTrainings, SetTrainings, GetTrainings }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

export const TrainingUse = () => useContext(TrainingContext);
