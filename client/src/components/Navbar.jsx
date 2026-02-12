import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";
import { HomeIcon, LogOutIcon } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/70 backdrop-blur">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 text-slate-800">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo2.svg" alt="logo" className="h-10 w-auto" />
          <span className="hidden sm:block text-sm font-semibold tracking-wide text-slate-700">
            Resume Studio
          </span>
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <p className="hidden md:block rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-slate-600">
            Hi, {user?.name}
          </p>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-cyan-700 transition-all duration-200 hover:bg-cyan-100"
          >
            <HomeIcon className="size-4" />
            Dashboard
          </Link>
          <button
            onClick={logoutUser}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-all duration-200 hover:bg-slate-50"
          >
            <LogOutIcon className="size-4" />
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
