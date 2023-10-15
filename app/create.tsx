import { useRouter } from "expo-router";
import {
  ButtonCenter,
  ScrollCenter,
  TextDefault,
  ViewCenter,
} from "../src/style";
import { useRef, useState } from "react";
import { ExercisesTypes } from "../src/types";

import HeaderTraining from "../src/components/headerTraining";
import ExerciseCreate from "../src/components/sectionExerciseCreate";
import { TrainingUse } from "../src/contexts/training";
import Exercise from "../src/components/sectionExercise";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderPage from "../src/components/headerPage";
import { ScrollView } from "react-native-gesture-handler";

export default function Create() {
  const router = useRouter();
  const { training, setTraining, settings, removeStorage, GetTraining } =
    TrainingUse();

  const [exercise, setExercise] = useState<ExercisesTypes>(
    {} as ExercisesTypes
  );
  const [indexTraining, setIndexTraining] = useState(0);

  const scrollRef = useRef<ScrollView>();

  // HEADER HANDLERS
  const handleNext = () => {
    setIndexTraining(indexTraining + 1);
  };
  const handlePrevious = () => {
    setIndexTraining(indexTraining - 1);
  };

  // EXERCISES
  const SaveExercise = async () => {
    if (
      !exercise.count ||
      !exercise.exercise ||
      !exercise.repeat ||
      !exercise.weight
    )
      return;

    let allTrainings = training;
    allTrainings[indexTraining].training.push(exercise);

    setTraining(allTrainings);
    const trainingStr = JSON.stringify(training);
    await AsyncStorage.setItem("@trainings", trainingStr);
    GetTraining();
    setExercise({} as ExercisesTypes);
    scrollRef.current.scrollToEnd();
  };
  const RemoveExercise = async (choiceExerciseIndex: number) => {
    let allTrainings = training;
    allTrainings[indexTraining].training.splice(choiceExerciseIndex, 1);

    setTraining(allTrainings);
    const trainingStr = JSON.stringify(training);
    await AsyncStorage.setItem("@trainings", trainingStr);
    GetTraining();
  };

  // TRAINING
  const CreateTraining = async () => {
    let allTrainings = training;
    allTrainings.push({ title: "", training: [] });

    setTraining(allTrainings);
    const trainingStr = JSON.stringify(training);
    await AsyncStorage.setItem("@trainings", trainingStr);
    await new Promise(() => GetTraining());
    setIndexTraining(indexTraining + 1);
  };
  const DeleteTraining = async () => {
    let allTrainings = training;
    allTrainings.splice(indexTraining, 1);

    setTraining(allTrainings);
    const trainingStr = JSON.stringify(training);
    await AsyncStorage.setItem("@trainings", trainingStr);
    await new Promise(() => GetTraining());
    setIndexTraining(indexTraining - 1);
    // removeStorage();
  };

  return (
    <ViewCenter hg="100%" justify="flex-start">
      <HeaderPage
        actualIndex={indexTraining}
        title={training[indexTraining]?.title}
        editable
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        createNewTraining={CreateTraining}
      />
      <ButtonCenter
        fdir="row"
        bgcolor="red"
        wd="50%"
        hg="30px"
        mg="10px"
        onPress={DeleteTraining}
        disabled={training?.length < 2}
      >
        <TextDefault font="20px" bold>
          {settings?.language === "en" ? "Delete training" : "Deletar Treino"}
        </TextDefault>
      </ButtonCenter>
      <HeaderTraining editable />
      <ScrollCenter wd="100%" ref={scrollRef}>
        {training[indexTraining]?.training?.map((unique, index) => (
          <Exercise
            itens={unique}
            key={`${unique.exercise}+${index}`}
            editable
            removeItem={() => RemoveExercise(index)}
          />
        ))}
        <ExerciseCreate
          exercise={exercise}
          handle={setExercise}
          saveExercise={SaveExercise}
        />
      </ScrollCenter>
    </ViewCenter>
  );
}
