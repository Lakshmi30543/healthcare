import React from "react";
import HeroSection from "../HomePages/HeroSection";
import HighlightedDoctors from "../HomePages/HighlightedDoctors";
import About from "../HomePages/HomePageNavbar/About";
import Program from "../HomePages/HomePageNavbar/Program";
import Footer from "../HomePages/Footer";
import Blog from "./HomePageNavbar/Blog";
import HealthcareFAQ from "./HealthcareFAQ.jsx";
import Pages from "./HomePageNavbar/Pages.jsx";
import Contact from "./HomePageNavbar/Contact.jsx";

function Home() {
  return (
    <>
      <HeroSection />
      <HighlightedDoctors />
      <section id="about">
        <About />
      </section>
      <section id="program">
        <Program />
      </section>
      <section id="blog">
        <Blog />
      </section>
      <HealthcareFAQ />
      <section id="pages">
        <Pages />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </>
  );
}

export default Home;