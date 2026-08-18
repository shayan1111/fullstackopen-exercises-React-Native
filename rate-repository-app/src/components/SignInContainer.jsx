import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.whiteColor,
    flex: 1,
    padding: 12,
  },

  inputStyle: {
    backgroundColor: theme.color.whiteColor,
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
  },

  inputError: {
    borderColor: theme.color.redColor,
  },

  buttonSubmitStyle: {
    backgroundColor: theme.color.primary,
    color: theme.color.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },

  buttonTextStyle: {
    color: theme.color.whiteColor,
  },

  showError: {
    color: theme.color.redColor,
    marginBottom: 15,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.inputStyle,
          formik.touched.username &&
            formik.errors.username &&
            styles.inputError,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.showError}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.inputStyle,
          formik.touched.password &&
            formik.errors.password &&
            styles.inputError,
        ]}
        placeholder="Password"
        value={formik.values.password}
        secureTextEntry
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.showError}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.buttonSubmitStyle} onPress={formik.handleSubmit}>
        <Text style={styles.buttonTextStyle}>Sign in</Text>
      </Pressable>
    </View>
  );
};