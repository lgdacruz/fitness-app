import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleTypes } from "./types";

const theme = {
  dark: {
    textColor: "#fff",
    bgColor: "#131313",
  },
  light: {
    textColor: "#000",
    bgColor: "#fff",
  },
};

export const ScrollCenter = styled.ScrollView<StyleTypes>`
  display: ${(props) => (props.display ? props.display : "flex")};
  flex-direction: ${(props) => (props.fdir ? props.fdir : "column")};
  width: ${(props) => (props.wd ? props.wd : "auto")};
  height: ${(props) => (props.hg ? props.hg : "auto")};
  margin: ${(props) => (props.mg ? props.mg : "0px")};
  padding: ${(props) => (props.pd ? props.pd : "0px")};
  background-color: ${(props) => (props.bgcolor ? props.bgcolor : "auto")};
`;
export const ViewCenter = styled.View<StyleTypes>`
  display: ${(props) => (props.display ? props.display : "flex")};
  flex-direction: ${(props) => (props.fdir ? props.fdir : "column")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  width: ${(props) => (props.wd ? props.wd : "auto")};
  height: ${(props) => (props.hg ? props.hg : "auto")};
  margin: ${(props) => (props.mg ? props.mg : "0px")};
  padding: ${(props) => (props.pd ? props.pd : "0px")};
  background-color: ${(props) => (props.bgcolor ? props.bgcolor : "#000")};
`;
export const ButtonCenter = styled.TouchableOpacity<StyleTypes>`
  display: ${(props) => (props.display ? props.display : "flex")};
  flex-direction: ${(props) => (props.fdir ? props.fdir : "column")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  width: ${(props) => (props.wd ? props.wd : "auto")};
  height: ${(props) => (props.hg ? props.hg : "auto")};
  margin: ${(props) => (props.mg ? props.mg : "0px")};
  padding: ${(props) => (props.pd ? props.pd : "0px")};
  border-radius: ${(props) => (props.radius ? props.radius : "0px")};
  background-color: ${(props) => (props.bgcolor ? props.bgcolor : "auto")};
`;
export const ImageBG = styled.ImageBackground<StyleTypes>`
  display: ${(props) => (props.display ? props.display : "flex")};
  flex-direction: ${(props) => (props.fdir ? props.fdir : "column")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  width: ${(props) => (props.wd ? props.wd : "auto")};
  height: ${(props) => (props.hg ? props.hg : "auto")};
`;

export const TextDefault = styled.Text<StyleTypes>`
  font-size: ${(props) => (props.font ? props.font : "16px")};
  text-align: ${(props) => (props.align ? props.align : "center")};
  color: ${(props) => (props.color ? props.color : "#fff")};
  width: ${(props) => (props.wd ? props.wd : "auto")};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;
export const Input = styled.TextInput<StyleTypes>`
  font-size: ${(props) => (props.font ? props.font : "16px")};
  text-align: ${(props) => (props.align ? props.align : "center")};
  color: ${(props) => (props.color ? props.color : "#000")};
  width: ${(props) => (props.wd ? props.wd : "auto")};
  height: ${(props) => (props.hg ? props.hg : "auto")};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  margin: ${(props) => (props.mg ? props.mg : "0px")};
  border-radius: ${(props) => (props.radius ? props.radius : "0px")};
  background-color: #bababa;
  vertical-align: top;
`;

export const GradientNavigation = styled(LinearGradient).attrs(
  ({ focused }: { focused: boolean }) => ({
    focused,
    colors: focused ? ["#686868", "#fff"] : ["transparent", "transparent"],
  })
)`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
