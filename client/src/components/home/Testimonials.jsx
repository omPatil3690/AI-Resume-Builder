import React from "react";
import { BookUserIcon, Star } from "lucide-react";
import Title from "./Title";

const testimonials = [
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "Briar Martin",
    role: "Product Designer",
    quote:
      "The editing flow is smooth and the AI suggestions made my resume much more results-focused.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Avery Johnson",
    role: "Marketing Specialist",
    quote:
      "I used to spend hours reformatting. Now I update one section and everything stays clean.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    name: "Jordan Lee",
    role: "Frontend Engineer",
    quote:
      "Great balance between visual design and ATS compatibility. I started getting more callbacks.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    name: "Casey Morgan",
    role: "Data Analyst",
    quote:
      "The project and skill sections are especially useful. It made my profile much easier to scan.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="scroll-mt-20 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto w-fit rounded-full border border-emerald-200 bg-emerald-50 px-5 py-1.5 text-sm font-medium text-emerald-700">
          <span className="inline-flex items-center gap-2">
            <BookUserIcon className="size-4" />
            Testimonials
          </span>
        </div>

        <Title
          title="Users who landed interviews faster"
          description="Real feedback from professionals who improved resume quality and confidence using the builder."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-11 rounded-full object-cover ring-2 ring-cyan-100"
                />
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
              <div className="mb-3 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                {item.quote}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
