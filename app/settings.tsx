import { ButtonCenter, Input, TextDefault, ViewCenter } from "../src/style";
import { Alert, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TrainingUse } from "../src/contexts/training";
import { useState } from "react";
import Api from "../src/api/api";

export default function Settings() {
  const { settings, GetSettings, loading, setLoading } = TrainingUse();

  const [feedBack, setFeedBack] = useState({
    show: false,
    feedback: "",
    success: false,
  });

  const deleteSettings = async () => {
    await AsyncStorage.multiRemove(["@language", "@measure"]);
    GetSettings();
  };

  const isEnglish = settings?.language === "en";
  const toggleLanguage = async () => {
    await AsyncStorage.setItem(
      "@language",
      settings?.language === "en" ? "pt" : "en"
    );
    GetSettings();
  };

  const isMeasureLb = settings?.measure === "lb";
  const toggleMeasure = async () => {
    await AsyncStorage.setItem(
      "@measure",
      settings?.measure === "kg" ? "lb" : "kg"
    );
    GetSettings();
  };

  const SendFeedBack = async () => {
    if (!feedBack.feedback) return Alert.alert("Insira o feedback");
    setLoading(true);
    try {
      const res = await Api().post("/feedback", {
        feedback: feedBack.feedback,
      });
      if (res.status === 200) {
        setFeedBack({ show: false, feedback: "", success: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ViewCenter hg="100%" wd="100%" style={{ gap: 10 }}>
      <ViewCenter fdir="row" mg="10px 0px" wd="60%" style={{ gap: 5 }}>
        <TextDefault font="20px" bold wd="50%" align="left">
          {settings?.language === "en" ? "Language" : "Idioma"}
        </TextDefault>
        <Switch
          trackColor={{ false: "#767577", true: "#f4f3f4" }}
          thumbColor={isEnglish ? "#767577" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleLanguage}
          value={isEnglish}
        />
        <TextDefault font="20px" wd="20%">
          {settings?.language}
        </TextDefault>
      </ViewCenter>
      <ViewCenter fdir="row" mg="10px 0px" wd="60%" style={{ gap: 5 }}>
        <TextDefault font="20px" bold wd="50%" align="left">
          {settings?.language === "en" ? "Measure" : "Medida"}
        </TextDefault>
        <Switch
          trackColor={{ false: "#767577", true: "#f4f3f4" }}
          thumbColor={isMeasureLb ? "#767577" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleMeasure}
          value={isMeasureLb}
        />
        <TextDefault font="20px" wd="20%">
          {settings?.measure}
        </TextDefault>
      </ViewCenter>
      <ViewCenter mg="10px 0px" wd="60%" style={{ gap: 5 }}>
        <ButtonCenter
          onPress={() => setFeedBack({ ...feedBack, show: !feedBack.show })}
        >
          <TextDefault bold style={{ fontStyle: "italic" }}>
            {settings.language === "en"
              ? "Send feedback"
              : "Enviar um feedback"}
          </TextDefault>
        </ButtonCenter>

        {/* SUCESSO AO ENVIAR O FEEDBACK */}
        {feedBack.success ? (
          <TextDefault bold color="#5fff53">
            {settings.language === "en"
              ? "Feedback sent successfully!"
              : "Feedback enviado com sucesso!"}
          </TextDefault>
        ) : (
          <ViewCenter
            display={feedBack.show ? "flex" : "none"}
            style={{ gap: 10 }}
          >
            <Input
              value={feedBack.feedback}
              onChangeText={(text) =>
                setFeedBack({ ...feedBack, feedback: text })
              }
              maxLength={150}
              multiline
              wd="220px"
              hg="100px"
              radius="10px"
            />
            <ButtonCenter
              bgcolor="#333333"
              pd="5px 10px"
              radius="5px"
              onPress={SendFeedBack}
            >
              <TextDefault font="18px" bold>
                {settings.language === "en" ? "Send" : "Enviar"}
              </TextDefault>
            </ButtonCenter>
          </ViewCenter>
        )}
      </ViewCenter>
    </ViewCenter>
  );
}
