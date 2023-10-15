import { ActivityIndicator, Modal } from "react-native";

import { TrainingUse } from "../contexts/training";
import { TextDefault, ViewCenter } from "../style";

export default function ModalLoading() {
  const { loading } = TrainingUse();

  return (
    <Modal visible={loading} transparent>
      <ViewCenter bgcolor="rgba(25,25,25,0.6)" hg="100%" wd="100%">
        <ViewCenter
          bgcolor="rgba(255, 255, 255, 0.8)"
          pd="10px"
          radius="10px"
          hg="100px"
          justify="space-evenly"
        >
          <TextDefault bold font="18px" color="#000">
            Carregando...
          </TextDefault>
          <ActivityIndicator size="large" />
        </ViewCenter>
      </ViewCenter>
    </Modal>
  );
}
