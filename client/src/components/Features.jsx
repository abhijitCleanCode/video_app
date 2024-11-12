import React from "react";

import { features } from "../constants";
import { Button } from ".";

const Features = () => {
  return (
    <section id="features" className="mt-20">
      <div className="lg:px-15 z-2 relative mx-auto max-w-[77.5rem] px-5 md:px-10 xl:max-w-[87.5rem]">
        <div className="mx-auto mb-10">
          <h2 className="h2 text-center font-code font-medium text-n-1">
            What are you preparing for?
          </h2>
          <p className="body-2 text-center text-n-4">
            GMB got you covered. Just scroll to find the one you are looking
            for.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-10">
          {features.map((item) => (
            <div
              className="relative block bg-[length:100%_100%] bg-no-repeat md:max-w-[20rem]"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="z-2 pointer-events-none relative flex min-h-[20rem] flex-col p-[2.4rem]">
                <h5 className="h5 mb-5 text-n-1">{item.title}</h5>
                <p className="body-2 mb-6 text-n-3">{item.text}</p>
                <div className="mt-auto flex items-center justify-between">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                  <button className="ml-auto inline-block text-xs font-bold tracking-wider text-n-1">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Button white={true}>View all</Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
