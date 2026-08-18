import { Text as NativeText, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.color.blackColor,
    fontFamily: theme.text.fonts.main,
  },

  // The colors
  black: {
    color: theme.color.blackColor,
  },
  white: {
    color: theme.color.whiteColor,
  },
  grey: {
    color: theme.color.greyColor,
  },
  blue: {
    color: theme.color.primary
  },

  // The fonts
  normal: {
    fontWeight: theme.text.fontWeights.normal
  },

  bold: {
    fontWeight: theme.text.fontWeights.bold
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === "black" && styles.black,
    color === "white" && styles.white,
    color === "grey" && styles.grey,
    color === "blue" && styles.blue,

    fontSize && { fontSize },

    fontWeight === "normal" && styles.normal,
    fontWeight === "bold" && styles.bold,

    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
