import { Link } from "expo-router";
import { ButtonCenter, ImageBG, TextDefault, ViewCenter } from "../style";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { TrainingUse } from "../contexts/training";

export default function Header() {
  const { setAllTrainings, allTrainings } = TrainingUse();
  return (
    <ViewCenter wd="100%" hg="150px">
      <ImageBG
        source={require("../assets/dumbbell.jpg")}
        resizeMode="cover"
        hg="100%"
        wd="100%"
        justify="flex-start"
        align="flex-start"
      >
        <ViewCenter fdir="row" justify="space-between" wd="100%" mg="50px 0px">
          <Link
            href="/create"
            style={{
              marginHorizontal: 20,
              padding: 5,
              shadowColor: "#fff",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 10,
              shadowOpacity: 1,
            }}
          >
            <MaterialCommunityIcons name="dumbbell" size={45} color="#fff" />
          </Link>
          <Link
            href="/"
            style={{
              marginHorizontal: 20,
              padding: 5,
              shadowColor: "#fff",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 10,
              shadowOpacity: 1,
            }}
          >
            <AntDesign name="setting" size={45} color="#fff" />
          </Link>
        </ViewCenter>
      </ImageBG>
    </ViewCenter>
  );
}
