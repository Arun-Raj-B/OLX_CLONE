import React, { useContext, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import { AuthContext, FirebaseContext } from "./store/Context";
import Post from "./store/PostContext";
/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";

function App() {
  const { user, setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [user]);
  return (
    <div>
      <Post>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="create" element={<Create />}></Route>
          <Route path="view" element={<ViewPost />}></Route>
        </Routes>
      </Post>
    </div>
  );
}

export default App;
