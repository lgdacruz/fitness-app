import { ViewCenter } from "../style";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function HeaderTraining({ editable }: { editable?: boolean }) {
  return (
    <ViewCenter
      wd="100%"
      fdir="row"
      style={{
        borderColor: "rgba(288,288,288, 0.5)",
        borderBottomWidth: 0.7,
      }}
    >
      <ViewCenter
        fdir="row"
        wd={!!editable ? "90%" : "100%"}
        mg="10px 0px"
        pd="5px 0px"
      >
        <MaterialCommunityIcons
          name="weight-lifter"
          size={24}
          color="#fff"
          style={{
            width: "40%",
            textAlign: "center",
          }}
        />
        <MaterialCommunityIcons
          name="ballot-recount-outline"
          size={24}
          color="#fff"
          style={{ width: "20%", textAlign: "center" }}
        />
        <MaterialCommunityIcons
          name="timer-sand"
          size={24}
          color="#fff"
          style={{ width: "20%", textAlign: "center" }}
        />
        <FontAwesome5
          name="weight-hanging"
          size={24}
          color="#fff"
          style={{ width: "20%", textAlign: "center" }}
        />
      </ViewCenter>
      {!!editable && <ViewCenter pd="5px" wd="10%" />}
    </ViewCenter>
  );
}
