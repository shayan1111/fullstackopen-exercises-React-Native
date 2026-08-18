import { View } from "react-native";
import { Routes, Route, Navigate } from "react-router-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUpForm";
import Repository from "./Repository";
import ReviewForm from "./ReviewForm";
import MyReviews from "./MyReviews";

const Main = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#e1e4e8" }}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/repositories/:id" element={<Repository />} />
        <Route path="/create-review" element={<ReviewForm />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
