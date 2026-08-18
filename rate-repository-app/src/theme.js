import Constants from "expo-constants";
import { Platform } from "react-native";

const theme = {
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    gap: 10,
    backgroundColor: 'black',
  },

  color: {
    blackColor: "black",
    whiteColor: "white",
    greyColor: "grey",
    redColor: "#d73a4a",
    primary: "#0366d6"
  },

  text: {
    fonts: {
      main: Platform.select({
        android: "Roboto",
        ios: "Arial",
        default: "System"
      }),
    },
    fontWeights: {
      normal: 400,
      bold: 700,
    },
  }
}

export default theme