import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import { GradientNavigation, ViewCenter } from "../style";
import { ButtonCenter } from "../style";

export default function TabBarNavigation({
  state,
  navigation,
}: {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}) {
  return (
    <ViewCenter fdir="row" justify="justify" pd="10px">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        let icon: JSX.Element;

        if (route.name === "index")
          icon = (
            <MaterialCommunityIcons
              name="dumbbell"
              size={45}
              color={isFocused ? "#000" : "#fff"}
            />
          );
        if (route.name === "create")
          icon = (
            <Ionicons
              name="create"
              size={45}
              color={isFocused ? "#000" : "#fff"}
            />
          );
        if (route.name === "settings")
          icon = (
            <AntDesign
              name="setting"
              size={45}
              color={isFocused ? "#000" : "#fff"}
            />
          );

        if (route.name === "_sitemap" || route.name === "[...404]") return null;
        return (
          <ButtonCenter
            key={route.name}
            onPress={() => navigation.navigate(route)}
            style={{ position: "relative" }}
            wd="33%"
          >
            <GradientNavigation focused={isFocused}>{icon}</GradientNavigation>
          </ButtonCenter>
        );
      })}
    </ViewCenter>
  );
}
