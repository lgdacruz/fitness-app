import { useState } from "react";
import { ButtonCenter, Input, TextDefault } from "../style";
import { ViewCenter } from "../style";
import { ExercisesTypes, TrainingTypes } from "../types";
import { TrainingUse } from "../contexts/training";

export default function ExerciseCreate({ exercise, handle, saveExercise }) {
  return (
    <ViewCenter wd="100%">
      <ViewCenter wd="100%" fdir="row" style={{ gap: 1 }}>
        <Input
          style={!exercise.exercise && { borderColor: "red", borderWidth: 2 }}
          hg="50px"
          wd="40%"
          value={exercise.exercise}
          onChangeText={(text) => handle({ ...exercise, exercise: text })}
          placeholder="Ex: Rosca bíceps"
          inputMode="text"
          keyboardType="default"
          multiline
        />
        <Input
          style={!exercise.repeat && { borderColor: "red", borderWidth: 2 }}
          hg="50px"
          wd="20%"
          value={exercise.repeat}
          onChangeText={(text) => handle({ ...exercise, repeat: text })}
          placeholder="Ex: 3"
          inputMode="numeric"
          keyboardType="numbers-and-punctuation"
        />
        <Input
          style={!exercise.count && { borderColor: "red", borderWidth: 2 }}
          hg="50px"
          wd="20%"
          value={exercise.count}
          onChangeText={(text) => handle({ ...exercise, count: text })}
          placeholder="Ex: 10"
          inputMode="numeric"
          keyboardType="numbers-and-punctuation"
        />
        <Input
          style={!exercise.weight && { borderColor: "red", borderWidth: 2 }}
          hg="50px"
          wd="20%"
          value={exercise.weight}
          onChangeText={(text) => handle({ ...exercise, weight: text })}
          placeholder="Ex: 80"
          inputMode="numeric"
          keyboardType="numbers-and-punctuation"
        />
      </ViewCenter>
      <ButtonCenter
        wd="100%"
        hg="40px"
        bgcolor="#9b9b9b"
        onPress={saveExercise}
      >
        <TextDefault font="22px" bold color="#000">
          Salvar Exercício
        </TextDefault>
      </ButtonCenter>
    </ViewCenter>
  );
}
