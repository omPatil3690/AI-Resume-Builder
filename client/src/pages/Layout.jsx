import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50/40 to-emerald-50/30">
      <div className="pointer-events-none absolute -top-32 -left-16 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
