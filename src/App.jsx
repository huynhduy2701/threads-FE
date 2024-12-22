import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";

function App() {
  const user = useRecoilValue(userAtom);
    const {username} = useParams();
  console.log(">>> check user :", user);
  return (
    <Box position={"relative"} w={"full"}>
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
        <Route
          path="/:username"
          element={
            user ? (
              <>
                <UserPage />
                <CreatePost />
              </>
            ) : (
              <UserPage />
            )
          }
        ></Route>
        <Route path="/:username/post/:pid" element={<PostPage />}></Route>
        <Route path="/chat" element={user ? <ChatPage/> : <Navigate to={"/auth"}/>}></Route>
      </Routes>

      {/* {user && <LogoutButton />} */}
      {/* {user && <CreatePost />} */}
    </Container>
    </Box>
  );
}

export default App;
