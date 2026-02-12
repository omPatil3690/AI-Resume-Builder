import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  CheckCircle2,
  Menu,
  PlayCircle,
  Sparkles,
  X,
} from "lucide-react";
import logo from "../../assets/logo.svg";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const trustItems = [
    "Used by 10,000+ job seekers",
    "ATS-friendly formatting",
    "Real-time editing",
  ];

  return (
    <section className="relative">
      <nav className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3.5">
          <Link to="/">
            <img src={logo} alt="logo" className="h-10 w-auto" />
          </Link>

          <div className="hidden items-center gap-8 text-sm text-slate-700 md:flex">
            <a href="#" className="transition hover:text-cyan-700">
              Home
            </a>
            <a href="#features" className="transition hover:text-cyan-700">
              Features
            </a>
            <a href="#testimonials" className="transition hover:text-cyan-700">
              Testimonials
            </a>
            <a href="#cta" className="transition hover:text-cyan-700">
              Contact
            </a>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {!user && (
              <Link
                to="/login"
                className="rounded-full border border-slate-300 px-5 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Login
              </Link>
            )}
            <Link
              to={user ? "/app" : "/login?state=register"}
              className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2 text-sm font-medium text-white shadow-[0_10px_22px_-12px_rgba(6,182,212,0.8)] transition hover:-translate-y-0.5"
            >
              {user ? "Go to Dashboard" : "Get Started"}
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-slate-900/45 backdrop-blur-sm transition-opacity md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-xl transition-transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <img src={logo} alt="logo" className="h-8 w-auto" />
            <button
              onClick={() => setMenuOpen(false)}
              className="rounded-lg border border-slate-200 p-1.5 text-slate-600"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="flex flex-col gap-4 text-sm text-slate-700">
            <a href="#" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)}>
              Testimonials
            </a>
            <a href="#cta" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </div>
          <Link
            to={user ? "/app" : "/login?state=register"}
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-2.5 text-sm font-medium text-white"
            onClick={() => setMenuOpen(false)}
          >
            {user ? "Dashboard" : "Create Free Resume"}
          </Link>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-20 pt-14 md:pt-20 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
            <Sparkles className="size-3.5" />
            AI Resume Builder
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-900 md:text-6xl">
            Build resumes that look sharp and get interviews faster.
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-600">
            Create job-ready resumes with intelligent suggestions, clean
            structure, and one-click customization for every role.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to={user ? "/app" : "/login?state=register"}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_24px_-14px_rgba(16,185,129,0.9)] transition hover:-translate-y-0.5"
            >
              {user ? "Open Dashboard" : "Get Started Free"}
              <ArrowRight className="size-4" />
            </Link>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm text-slate-700 transition hover:bg-slate-50">
              <PlayCircle className="size-4 text-cyan-600" />
              Watch Demo
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {trustItems.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs text-slate-600"
              >
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-cyan-300/20 blur-2xl" />
          <div className="absolute -bottom-8 -right-10 h-40 w-40 rounded-full bg-emerald-300/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_55px_-30px_rgba(15,23,42,0.5)] backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">
                Resume Progress
              </p>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                92% Complete
              </span>
            </div>
            <div className="mb-5 h-2 w-full rounded-full bg-slate-200">
              <div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
            </div>
            <div className="space-y-3">
              {[
                "Personal details optimized",
                "Experience bullets enhanced with AI",
                "ATS score improved",
                "Design theme applied",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
