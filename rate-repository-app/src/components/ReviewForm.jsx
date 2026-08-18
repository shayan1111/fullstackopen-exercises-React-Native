import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";
import * as yup from "yup";
import theme from "../theme";
import { useFormik } from "formik";

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
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number().min(0, "Rating must be at least 0").max(100, "Rating must be at most 100").required("Rating is required"),
  text: yup.string(),
});

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const review = {
      ownerName: values.ownerName,
      repositoryName: values.repositoryName,
      rating: Number(values.rating),
      text: values.text,
    };

    const createdReview = await createReview(review);

    navigate(`/repositories/${createdReview.repositoryId}`);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <View style={styles.container}>
      {/* Repository owner name */}
      <TextInput
        style={[
          styles.inputStyle,
          formik.touched.ownerName &&
            formik.errors.ownerName &&
            styles.inputError,
        ]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.showError}>{formik.errors.ownerName}</Text>
      )}

      {/* Repository name */}
      <TextInput
        style={[
          styles.inputStyle,
          formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            styles.inputError,
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.showError}>{formik.errors.repositoryName}</Text>
      )}

      {/* Rating */}
      <TextInput
        style={[
          styles.inputStyle,
          formik.touched.rating && formik.errors.rating && styles.inputError,
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
        keyboardType="numeric"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.showError}>{formik.errors.rating}</Text>
      )}

      {/* Review */}
      <TextInput
        style={[
          styles.inputStyle,
          formik.touched.text && formik.errors.text && styles.inputError,
        ]}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        onBlur={formik.handleBlur("text")}
        multiline
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={styles.showError}>{formik.errors.text}</Text>
      )}
      <Pressable style={styles.buttonSubmitStyle} onPress={formik.handleSubmit}>
        <Text style={styles.buttonTextStyle}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
