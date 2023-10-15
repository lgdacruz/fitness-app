import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { ButtonCenter, Input, TextDefault, ViewCenter } from "../style";
import { TrainingUse } from "../contexts/training";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native";
import BannerAdSense from "./bannerAdSense";

export default function HeaderPage({
  title,
  handleNext,
  handlePrevious,
  editable,
  actualIndex,
  createNewTraining,
}: {
  title: string;
  handleNext: any;
  handlePrevious: any;
  editable: boolean;
  actualIndex: number;
  createNewTraining?: any;
}) {
  const { training, setTraining, GetTraining } = TrainingUse();

  const [titleEdit, setTitleEdit] = useState({ edit: false, title: "" });

  const inputRef = useRef<TextInput>();

  const nextDisabled = actualIndex === training.length - 1;
  const previousDisabled = actualIndex === 0;

  async function SaveTitle() {
    if (titleEdit.title === "") return;

    let allTrainings = training || [];
    allTrainings[actualIndex].title = titleEdit.title;
    setTraining(allTrainings);
    const trainingStr = JSON.stringify(training);
    try {
      await AsyncStorage.setItem("@trainings", trainingStr);
      GetTraining();
      setTitleEdit({ title: "", edit: false });
    } catch (error) {
      console.log(error);
    }
  }
  function TitleEdit() {
    setTitleEdit({ ...titleEdit, edit: true });
  }

  useEffect(() => {
    setTitleEdit({ ...titleEdit, title: training[actualIndex]?.title });
  }, [actualIndex]);

  return (
    <ViewCenter>
      <ViewCenter fdir="row" justify="space-between" wd="100%" mg="20px 0px">
        {/* BUTTON PREVIOUS */}
        <ButtonCenter
          mg="0px 15px"
          onPress={handlePrevious}
          disabled={previousDisabled}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={35}
            color={previousDisabled ? "#383838" : "#fff"}
          />
        </ButtonCenter>
        {editable && titleEdit.edit ? (
          <ViewCenter fdir="row" wd="65%" justify="space-between">
            <Input
              ref={inputRef}
              style={!title && { borderColor: "red", borderWidth: 3 }}
              font="20px"
              hg="40px"
              wd="85%"
              radius="10px"
              value={titleEdit.title}
              maxLength={100}
              onChangeText={(text) =>
                setTitleEdit({ ...titleEdit, title: text })
              }
              placeholder="Nome da série"
              inputMode="text"
              keyboardType="default"
              multiline
            />

            <AntDesign
              name="checkcircle"
              size={25}
              color="#1eff00"
              onPress={SaveTitle}
            />
          </ViewCenter>
        ) : (
          <ViewCenter fdir="row" wd="65%">
            <TextDefault font="22px" bold wd="60%">
              {title}
            </TextDefault>
            <Entypo
              style={{ display: editable ? "flex" : "none" }}
              name="edit"
              size={25}
              color="#fff"
              onPress={TitleEdit}
            />
          </ViewCenter>
        )}
        {editable && nextDisabled ? (
          <ButtonCenter mg="0px 15px" onPress={createNewTraining}>
            <AntDesign name="pluscircle" size={35} color="#fff" />
          </ButtonCenter>
        ) : (
          <ButtonCenter
            mg="0px 15px"
            onPress={handleNext}
            disabled={nextDisabled}
          >
            <MaterialIcons
              name="arrow-forward-ios"
              size={35}
              color={nextDisabled ? "#383838" : "#fff"}
            />
          </ButtonCenter>
        )}
      </ViewCenter>
      <BannerAdSense />
    </ViewCenter>
  );
}
