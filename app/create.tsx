import { Link, useRouter } from "expo-router";
import {
  ButtonCenter,
  Input,
  ScrollCenter,
  TextDefault,
  ViewCenter,
} from "../src/style";
import { useEffect, useRef, useState } from "react";
import { ExercisesTypes, TrainingTypes } from "../src/types";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import HeaderTraining from "../src/components/headerTraining";
import ExerciseCreate from "../src/components/sectionExerciseCreate";
import { TrainingUse } from "../src/contexts/training";
import Exercise from "../src/components/sectionExercise";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderPage from "../src/components/headerPage";
import { ScrollView } from "react-native-gesture-handler";

export default function Create() {
  const router = useRouter();
  const { allTrainings, setAllTrainings, GetTrainings } = TrainingUse();

  const [exercise, setExercise] = useState<ExercisesTypes>(
    {} as ExercisesTypes
  );
  const [indexTraining, setIndexTraining] = useState(allTrainings?.length - 1);

  const scrollRef = useRef<ScrollView>();

  // HEADER HANDLERS
  const handleNext = () => {
    setIndexTraining(indexTraining + 1);
  };
  const handlePrevious = () => {
    setIndexTraining(indexTraining - 1);
  };

  // EXERCISES
  const SaveExercise = () => {
    if (
      !exercise.count ||
      !exercise.exercise ||
      !exercise.repeat ||
      !exercise.weight
    )
      return;

    const clone = [...allTrainings];
    const cloneActualTraining = { ...clone[indexTraining] };
    cloneActualTraining.training =
      cloneActualTraining.training?.concat(exercise);
    clone[indexTraining] = cloneActualTraining;

    setAllTrainings(clone);
    setExercise({} as ExercisesTypes);
    scrollRef.current.scrollToEnd();
  };
  const RemoveExercise = (choiceExerciseIndex: number) => {
    const clone = [...allTrainings];
    const cloneActualTraining = { ...clone[indexTraining] };
    cloneActualTraining.training = cloneActualTraining.training?.filter(
      (actualExercise, index) => index !== choiceExerciseIndex
    );
    clone[indexTraining] = cloneActualTraining;
    setAllTrainings(clone);
  };

  // TRAINING
  const SaveTraining = () => {
    if (
      !allTrainings[indexTraining].title ||
      allTrainings[indexTraining].training.length === 0
    )
      return;

    router.back();
  };
  const UpdateTitle = (text: string) => {
    const clone = [...allTrainings];
    const cloneActualTraining = { ...clone[indexTraining] };
    cloneActualTraining.title = text;
    clone[indexTraining] = cloneActualTraining;

    setAllTrainings(clone);
  };
  const CreateTraining = () => {
    const clone = [...allTrainings, { last: true, title: "", training: [] }];
    setAllTrainings(clone);
    setIndexTraining(clone?.length - 1);
  };
  const DeleteTraining = () => {
    const clone = [...allTrainings, { last: true, title: "", training: [] }];
    setAllTrainings(clone);
    setIndexTraining(clone?.length - 1);
  };

  return (
    <ViewCenter hg="100%" justify="flex-start">
      <ButtonCenter
        fdir="row"
        bgcolor="red"
        wd="50%"
        hg="40px"
        style={{ gap: 10 }}
        onPress={DeleteTraining}
      >
        <TextDefault font="22px" bold>
          Deletar Treino
        </TextDefault>
      </ButtonCenter>
      <HeaderPage
        actualIndex={indexTraining}
        title={allTrainings[indexTraining]?.title}
        setTitle={(text: string) => UpdateTitle(text)}
        editable
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        createNewTraining={CreateTraining}
      />
      <HeaderTraining editable />
      <ScrollCenter wd="100%" ref={scrollRef}>
        {allTrainings[indexTraining]?.training?.map((unique, index) => (
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
      <ButtonCenter
        fdir="row"
        bgcolor="green"
        wd="100%"
        hg="50px"
        style={{ gap: 10 }}
        onPress={SaveTraining}
      >
        <AntDesign name="checkcircleo" size={24} color="#fff" />
        <TextDefault font="22px" bold>
          Salvar Treino
        </TextDefault>
      </ButtonCenter>
    </ViewCenter>
  );
}
