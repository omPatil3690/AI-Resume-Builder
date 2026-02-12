import React from "react";
import { Bot, LayoutTemplate, ScanText, WandSparkles, Zap } from "lucide-react";
import Title from "./Title";

const features = [
  {
    title: "AI Writing Assistant",
    description:
      "Turn basic role details into stronger, achievement-focused bullet points in seconds.",
    icon: WandSparkles,
  },
  {
    title: "Modern Resume Sections",
    description:
      "Personal info, summary, experience, projects, and skills with structured forms.",
    icon: LayoutTemplate,
  },
  {
    title: "ATS-friendly Formatting",
    description:
      "Keep your resume readable and consistent for recruiter systems and human reviewers.",
    icon: ScanText,
  },
  {
    title: "One-click Refinement",
    description:
      "Adjust template and accent color instantly while previewing live changes.",
    icon: Bot,
  },
];

const Features = () => {
  return (
    <section id="features" className="scroll-mt-20 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto w-fit rounded-full border border-cyan-200 bg-cyan-50 px-5 py-1.5 text-sm font-medium text-cyan-700">
          <span className="inline-flex items-center gap-2">
            <Zap className="size-4" />
            Why It Works
          </span>
        </div>

        <Title
          title="Everything you need to build a better resume"
          description="Fast, structured, and visually polished tools designed to help you stand out in competitive job markets."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-slate-200/80 bg-white/85 p-6 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-xl border border-cyan-200 bg-cyan-50 p-2.5">
                  <Icon className="size-5 text-cyan-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
