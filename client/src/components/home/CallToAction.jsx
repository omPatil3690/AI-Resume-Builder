import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section id="cta" className="scroll-mt-20 px-4 pb-6 pt-16 sm:pt-20">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200/80 bg-gradient-to-r from-cyan-50 via-white to-emerald-50 p-8 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.45)] sm:p-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
              Ready to Build
            </p>
            <h3 className="mt-2 max-w-xl text-2xl font-semibold text-slate-900 sm:text-3xl">
              Build a standout resume in minutes and apply with confidence.
            </h3>
          </div>

          <Link
            to="/app"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_22px_-12px_rgba(6,182,212,0.8)] transition hover:-translate-y-0.5"
          >
            Open Builder
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
