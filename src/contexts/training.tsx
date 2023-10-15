import { createContext, useContext, useEffect, useState } from "react";
import { ContextTrainingTypes, SettingsTypes, TrainingTypes } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MobileAds } from "react-native-google-mobile-ads";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

export const TrainingContext = createContext<ContextTrainingTypes>(
  {} as ContextTrainingTypes
);

const mockTraining: TrainingTypes[] = [
  {
    title: "Série A",
    training: [
      { count: "10", exercise: "Rosca", repeat: "4", weight: "80" },
      { count: "10", exercise: "Tríceps", repeat: "4", weight: "80" },
    ],
  },
  {
    title: "Série B",
    training: [
      { count: "12", exercise: "Costa", repeat: "4", weight: "80" },
      { count: "10", exercise: "Peito", repeat: "4", weight: "80" },
    ],
  },
  {
    title: "Série C",
    training: [
      { count: "12", exercise: "Ombro", repeat: "4", weight: "80" },
      { count: "10", exercise: "Perna", repeat: "4", weight: "80" },
    ],
  },
];

export const TrainingProvider = ({ children }) => {
  const [training, setTraining] = useState<TrainingTypes[]>([
    { title: "Série A", training: [] },
  ]);
  const [settings, setSettings] = useState<SettingsTypes>();
  const [nonPersonalizedAd, setNonPersonalizedAd] = useState(false);
  const [loading, setLoading] = useState(false);

  async function InitiAd() {
    const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    setNonPersonalizedAd(result !== RESULTS.GRANTED);
    if (result === RESULTS.DENIED) {
      // The permission has not been requested, so request it.
      const requestResult = await request(
        PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY
      );
      setNonPersonalizedAd(requestResult !== RESULTS.GRANTED);
    }
    await MobileAds().initialize();
  }

  async function GetSettings() {
    const localsettings = await AsyncStorage.multiGet([
      "@language",
      "@measure",
    ]);
    const [language, measure] = localsettings;
    const [, valueLanguage] = language;
    const [, valueMeasure] = measure;
    setSettings({
      language: valueLanguage ? valueLanguage : "en",
      measure: valueMeasure ? valueMeasure : "kg",
    });
  }

  async function GetTraining() {
    try {
      const localtrainings = await AsyncStorage.getItem("@trainings");
      if (localtrainings) {
        const trainingParsed = JSON.parse(localtrainings);
        setTraining(trainingParsed);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function SetCurrentTraining() {
    const trainingStr = JSON.stringify(training);
    await AsyncStorage.setItem("@trainings", trainingStr);
  }

  const removeStorage = async () => {
    await AsyncStorage.multiRemove(["@trainings", "@language", "@measure"]);
  };

  useEffect(() => {
    InitiAd();
  }, []);

  useEffect(() => {
    GetTraining();
    GetSettings();
  }, []);

  return (
    <TrainingContext.Provider
      value={{
        nonPersonalizedAd,
        training,
        setTraining,
        GetTraining,
        GetSettings,
        settings,
        removeStorage,
        loading,
        setLoading,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

export const TrainingUse = () => useContext(TrainingContext);
