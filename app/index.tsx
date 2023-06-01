import { Link } from "expo-router";
import {
  ButtonCenter,
  ScrollCenter,
  TextDefault,
  ViewCenter,
} from "../src/style";
import { TrainingUse } from "../src/contexts/training";
import HeaderTraining from "../src/components/headerTraining";
import Exercise from "../src/components/sectionExercise";
import HeaderPage from "../src/components/headerPage";
import { useState } from "react";

export default function Home() {
  const { allTrainings, setAllTrainings } = TrainingUse();
  const [indexTraining, setIndexTraining] = useState(0);

  const handleNext = () => {
    setIndexTraining(indexTraining + 1);
  };
  const handlePrevious = () => {
    setIndexTraining(indexTraining - 1);
  };

  if (allTrainings.length < 2 && !allTrainings[0]?.title) {
    return (
      <ViewCenter hg="100%" wd="100%" justify="space-around">
        <TextDefault wd="80%" bold>
          Você ainda não possui nenhum treino cadastrado
        </TextDefault>
        <Link
          href="/create"
          style={{
            backgroundColor: "#bbbaba",
            padding: 5,
            shadowColor: "#fff",
            shadowOpacity: 1,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 0 },
          }}
        >
          <TextDefault color="#000" font="20px" bold>
            Criar treino
          </TextDefault>
        </Link>
      </ViewCenter>
    );
  }

  return (
    <ViewCenter hg="100%">
      <HeaderPage
        editable={false}
        actualIndex={indexTraining}
        title={allTrainings[indexTraining]?.title}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      <ScrollCenter wd="100%">
        <HeaderTraining />
        {allTrainings[indexTraining]?.training.map((exercise) => (
          <Exercise itens={exercise} key={exercise.exercise} editable={false} />
        ))}
      </ScrollCenter>
    </ViewCenter>
  );
}
