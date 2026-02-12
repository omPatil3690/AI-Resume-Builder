import React from "react";
import Banner from "../components/home/Banner";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Testimonial from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/home/Footer";

const Home = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50/35 to-emerald-50/30">
      <div className="pointer-events-none absolute -top-28 -left-20 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-28 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />

      <Banner />
      <Hero />
      <Features />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
