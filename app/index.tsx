import { Link } from "expo-router";
import { ImageBG, ScrollCenter, TextDefault, ViewCenter } from "../src/style";
import { TrainingUse } from "../src/contexts/training";
import HeaderTraining from "../src/components/headerTraining";
import Exercise from "../src/components/sectionExercise";
import HeaderPage from "../src/components/headerPage";
import { useEffect, useState } from "react";

export default function Home() {
  const { training, settings } = TrainingUse();
  const [indexTraining, setIndexTraining] = useState(0);

  const handleNext = () => {
    setIndexTraining(indexTraining + 1);
  };
  const handlePrevious = () => {
    setIndexTraining(indexTraining - 1);
  };

  useEffect(() => {
    setIndexTraining(0);
  }, [training.length]);

  if (training?.length < 2 && training[0].training.length === 0) {
    return (
      <ViewCenter hg="100%" wd="100%" justify="space-evenly">
        <TextDefault wd="80%" bold font="20px">
          {settings?.language === "en"
            ? "You don't have training yet"
            : "Você ainda não possui treino"}
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
            width: 130,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <TextDefault color="#000" font="20px" bold>
            {settings?.language === "en" ? "Create" : "Criar"}
          </TextDefault>
        </Link>
      </ViewCenter>
    );
  }

  return (
    <ImageBG source={require("../src/assets/dumbbell.jpg")} hg="100%">
      <HeaderPage
        editable={false}
        actualIndex={indexTraining}
        title={training[indexTraining]?.title}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      <ScrollCenter wd="100%">
        <HeaderTraining />
        {training[indexTraining]?.training?.map((unique, index) => (
          <Exercise
            itens={unique}
            key={`${unique.exercise}+${index}`}
            editable={false}
          />
        ))}
      </ScrollCenter>
    </ImageBG>
  );
}
