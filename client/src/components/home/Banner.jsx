import React from "react";
import { Sparkles } from "lucide-react";

const Banner = () => {
  return (
    <div className="w-full border-b border-cyan-200/70 bg-gradient-to-r from-cyan-50 to-emerald-50 py-2.5 text-center text-sm text-cyan-800">
      <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-1">
        <Sparkles className="size-3.5" />
        AI-powered resume tools now faster and smarter.
      </p>
    </div>
  );
};

export default Banner;
