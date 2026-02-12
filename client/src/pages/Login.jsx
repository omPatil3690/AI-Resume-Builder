import { Mail, User2Icon, Lock, Sparkles, ArrowRight } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { login, setLoading } from "../app/features/authSlice";
import toast from "react-hot-toast";
import api from "../configs/api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = React.useState(urlState || "login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);

      dispatch(login({ token: data.token, user: data.user }));
      dispatch(setLoading(false));

      localStorage.setItem("token", data.token);
      toast.success(data.message);

      navigate("/app", { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isLogin = state === "login";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50/40 to-emerald-50/30 px-4 py-10">
      <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-cyan-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />

      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)] backdrop-blur md:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-cyan-500 to-emerald-500 p-10 text-white md:block">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            <Sparkles className="size-3.5" />
            Resume Studio
          </span>
          <h2 className="mt-6 text-3xl font-semibold leading-tight">
            Build beautiful resumes and apply faster.
          </h2>
          <p className="mt-4 text-sm text-white/90">
            Save multiple resumes, fine-tune content with AI, and download
            polished versions in a few clicks.
          </p>
          <div className="mt-8 rounded-2xl border border-white/30 bg-white/10 p-4 text-sm">
            “The fastest resume workflow I have used. Clean UI and great
            output.”
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500 transition hover:text-slate-700"
          >
            Back to Home
          </Link>

          <h1 className="mt-5 text-3xl font-semibold text-slate-900">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {isLogin
              ? "Sign in to continue building your resume."
              : "Sign up to start crafting your resume in minutes."}
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            {!isLogin && (
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
                <User2Icon size={16} className="text-slate-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  className="w-full border-none p-0 shadow-none focus:ring-0"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <Mail size={15} className="text-slate-500" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full border-none p-0 shadow-none focus:ring-0"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <Lock size={15} className="text-slate-500" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border-none p-0 shadow-none focus:ring-0"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              {isLogin ? "Login" : "Sign up"}
              <ArrowRight className="size-4" />
            </button>
          </form>

          <p className="mt-5 text-sm text-slate-600">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() =>
                setState((prev) => (prev === "login" ? "register" : "login"))
              }
              className="font-semibold text-cyan-700 hover:text-cyan-800"
            >
              {isLogin ? "Create one" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
