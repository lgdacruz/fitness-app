import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ButtonCenter, Input, TextDefault, ViewCenter } from "../style";
import { TrainingUse } from "../contexts/training";

export default function HeaderPage({
  title,
  handleNext,
  handlePrevious,
  editable,
  setTitle,
  actualIndex,
  createNewTraining,
}: {
  title: string;
  handleNext: any;
  handlePrevious: any;
  editable: boolean;
  setTitle?: any;
  actualIndex: number;
  createNewTraining?: any;
}) {
  const { setAllTrainings, allTrainings } = TrainingUse();

  const disabled = allTrainings.length === 0;

  const nextDisabled = actualIndex === allTrainings.length - 1;
  const previousDisabled = actualIndex === 0;

  return (
    <ViewCenter fdir="row" justify="space-between" wd="100%" mg="20px 0px">
      <ButtonCenter
        mg="0px 15px"
        onPress={handlePrevious}
        disabled={previousDisabled}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={30}
          color={previousDisabled ? "#383838" : "#fff"}
        />
      </ButtonCenter>
      {editable ? (
        <Input
          style={!title && { borderColor: "red", borderWidth: 3 }}
          font="20px"
          hg="40px"
          wd="60%"
          radius="10px"
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="A - Peito e Tríceps"
          inputMode="text"
          keyboardType="default"
          multiline
        />
      ) : (
        <TextDefault font="22px" bold>
          {title}
        </TextDefault>
      )}
      {editable && nextDisabled ? (
        <ButtonCenter mg="0px 15px" onPress={createNewTraining}>
          <Ionicons name="create" size={30} color="#fff" />
        </ButtonCenter>
      ) : (
        <ButtonCenter
          mg="0px 15px"
          onPress={handleNext}
          disabled={nextDisabled}
        >
          <MaterialIcons
            name="arrow-forward-ios"
            size={30}
            color={nextDisabled ? "#383838" : "#fff"}
          />
        </ButtonCenter>
      )}
    </ViewCenter>
  );
}
