import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import * as yup from "yup";
import useCreateUser from "../hooks/useCreateUser";
import useSignIn from "../hooks/useSignIn";
import theme from "../theme";
import { useFormik } from "formik";
import { useNavigate } from "react-router-native";

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
  passwordConfirm: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5")
    .max(30, "Username must be at most 30")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5")
    .max(50, "Password must be at most 50")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Password confirmation is required"),
});

const SignUpForm = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const user = {
      username: values.username,
      password: values.password,
    };

    await createUser(user);
    await signIn(user);

    navigate("/");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.container}>
      {/* Username */}
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

      {/* Password */}
      <TextInput
        style={[
          styles.inputStyle,
          formik.touched.password &&
            formik.errors.password &&
            styles.inputError,
        ]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.showError}>{formik.errors.password}</Text>
      )}

      {/* Password Confirmation */}
      <TextInput
        style={[styles.inputStyle, formik.touched.passwordConfirm && formik.errors.passwordConfirm && styles.inputError]}
        placeholder="Password confirmation"
        secureTextEntry
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange("passwordConfirm")}
        onBlur={formik.handleBlur("passwordConfirm")}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={styles.showError}>{formik.errors.passwordConfirm}</Text>
      )}


      <Pressable style={styles.buttonSubmitStyle} onPress={formik.handleSubmit}>
        <Text style={styles.buttonTextStyle}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUpForm;
