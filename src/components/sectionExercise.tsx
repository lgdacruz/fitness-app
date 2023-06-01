import { useState } from "react";
import { ButtonCenter, Input, TextDefault } from "../style";
import { ViewCenter } from "../style";
import { ExercisesTypes, TrainingTypes } from "../types";
import { TrainingUse } from "../contexts/training";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  Layout,
  LightSpeedInLeft,
  LightSpeedInRight,
} from "react-native-reanimated";

export default function Exercise({
  itens,
  editable,
  removeItem,
}: {
  itens: ExercisesTypes;
  editable: boolean;
  removeItem?: () => void;
}) {
  const [done, setDone] = useState(false);

  const handlePress = () => setDone(!done);

  return (
    <Animated.View
      entering={LightSpeedInLeft}
      style={{
        display: "flex",
        flexDirection: "row",
        borderColor: "rgba(288,288,288, 0.5)",
        borderBottomWidth: 0.7,
      }}
    >
      <ButtonCenter onPress={handlePress} wd={editable ? "90%" : "100%"}>
        <ViewCenter fdir="row" wd="100%" mg="10px 0px" pd="5px 0px">
          <TextDefault
            align="left"
            wd="40%"
            color={done && "red"}
            style={{
              textDecorationLine: done ? "line-through" : "none",
            }}
          >
            {itens.exercise}
          </TextDefault>
          <TextDefault
            wd="20%"
            color={done && "red"}
            style={{
              textDecorationLine: done ? "line-through" : "none",
            }}
          >
            {itens.repeat}
          </TextDefault>
          <TextDefault
            wd="20%"
            color={done && "red"}
            style={{
              textDecorationLine: done ? "line-through" : "none",
            }}
          >
            {itens.count}
          </TextDefault>
          <TextDefault
            wd="20%"
            color={done && "red"}
            style={{
              textDecorationLine: done ? "line-through" : "none",
            }}
          >
            {itens.weight}
          </TextDefault>
        </ViewCenter>
      </ButtonCenter>
      {editable && (
        <ButtonCenter pd="5px" onPress={removeItem}>
          <AntDesign name="delete" size={24} color="red" />
        </ButtonCenter>
      )}
    </Animated.View>
  );
}
