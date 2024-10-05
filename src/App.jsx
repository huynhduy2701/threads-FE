import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import LogoutButton from "./components/LogoutButton";
import UpdateProfilePage from "./pages/UpdateProfilePage";

function App() {
  const user = useRecoilValue(userAtom);
  console.log(">>> check user :", user);
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        ></Route>
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/update"
          element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
        ></Route>
        <Route path="/:username" element={<UserPage />}></Route>
        <Route path="/:username/post/:pid" element={<PostPage />}></Route>
      </Routes>

      {user && <LogoutButton />}
    </Container>
  );
}

export default App;
