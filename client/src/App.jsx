import React from "react";

import {
  Achievement,
  Features,
  Hero,
  Navbar,
  Services,
  Testimonial,
} from "./components";

const App = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[#EDF4F9] pt-[4.75rem] lg:pt-[5.25rem]">
      <Navbar />
      <Hero />
      <Achievement />
      <Features />
      <Services />
      <Testimonial />
    </div>
  );
};

export default App;
