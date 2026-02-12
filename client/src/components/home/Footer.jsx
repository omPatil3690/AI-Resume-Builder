import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white/70 backdrop-blur">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-block">
            <img src="/logo.svg" alt="logo" className="h-10 w-auto" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
            Resume Studio helps professionals create clean, ATS-friendly resumes
            with fast editing and smart AI enhancements.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800">Product</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <a href="#features" className="transition hover:text-cyan-700">
                Features
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="transition hover:text-cyan-700"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a href="#cta" className="transition hover:text-cyan-700">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800">Account</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link to="/login" className="transition hover:text-cyan-700">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/login?state=register"
                className="transition hover:text-cyan-700"
              >
                Create account
              </Link>
            </li>
            <li>
              <Link to="/app" className="transition hover:text-cyan-700">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200/80 py-4 text-center text-sm text-slate-500">
        Copyright {year} Resume Studio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
