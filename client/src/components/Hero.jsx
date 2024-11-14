import React from "react";

import { centers, classes, curve, doubt, dpp } from "../assets";

const banner = [
  {
    img: classes,
    text: "Interactive Classes",
  },
  {
    img: dpp,
    text: "Sample Papers and Notes",
  },
  {
    img: doubt,
    text: "Doubt Sessions",
  },
  {
    img: centers,
    text: "Study Centers",
  },
];

const Hero = () => {
  return (
    <section className="-mt-[5.25rem] pt-[12rem]" id="hero">
      <div className="relative">
        <div className="relative z-20 mx-auto mb-[3.875rem] max-w-[62rem] text-center md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6 text-n-1">
            Kick start your academic career with Assam Premier Coaching{` `}
            <span className="relative inline-block text-[#00256D]">
              Aries Tech
              <img
                src={curve}
                className="absolute left-0 top-full w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 mx-auto mb-6 max-w-3xl text-n-1/70 lg:mb-8">
            Helping students since 2007
          </p>
        </div>

        <div className="z-20 mx-auto mb-10 grid grid-cols-2 gap-4 divide-x divide-dashed divide-n-1 rounded-[1.75rem] bg-n-3 px-6 py-3 md:w-[50rem] md:grid-cols-4">
          {banner.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <img src={item.img} alt="icon" width={55} height={55} />
              <h6 className="h6 text-center font-grotesk text-base font-medium text-n-6/70">
                {item.text}
              </h6>
            </div>
          ))}
        </div>

        {/* <Rings /> */}
      </div>
    </section>
  );
};

export default Hero;
