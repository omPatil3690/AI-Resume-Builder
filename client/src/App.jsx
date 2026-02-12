import React, { useEffect, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import ResumeBuilder from "./pages/Resumebuilder";
import Layout from "./pages/Layout.jsx";
import { useDispatch } from "react-redux";
import api from "./configs/api.js";
import { setLoading, login } from "./app/features/authSlice.js";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  const getUserData = useCallback(async () => {
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
  }, [dispatch]);

  useEffect(() => {
    // On initial app load, check if user has a token and fetch their data
    const token = localStorage.getItem("token");
    if (token) {
      getUserData();
    } else {
      // No token, so not logged in
      dispatch(setLoading(false));
    }
  }, [dispatch, getUserData]);

  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            borderRadius: "12px",
            border: "1px solid #bae6fd",
            background: "#f0fdfa",
            color: "#0f172a",
          },
          success: {
            style: {
              border: "1px solid #a7f3d0",
              background: "#ecfdf5",
            },
          },
          error: {
            style: {
              border: "1px solid #fecaca",
              background: "#fef2f2",
            },
          },
        }}
      />
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
