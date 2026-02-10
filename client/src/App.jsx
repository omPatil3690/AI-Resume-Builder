import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import ResumeBuilder from "./pages/Resumebuilder";
import Layout from "./pages/Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import api from "./configs/api.js";
import { setLoading, login } from "./app/features/authSlice.js";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log("Error fetching user data:", error.message);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    // On initial app load, check if user has a token and fetch their data
    const token = localStorage.getItem("token");
    if (token) {
      getUserData();
    } else {
      // No token, so not logged in
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        <Route path="/view/:resumeId" element={<Preview />} />
      </Routes>
    </>
  );
};

export default App;
