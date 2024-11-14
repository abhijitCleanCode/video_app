import React from "react";

import { cardProfile, connect, profilePic } from "../assets";
import { Button } from ".";

const PingDot = () => (
  <span className="relative flex h-3 w-3">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
  </span>
);

const Testimonial = () => {
  return (
    <section className="">
      <div className="lg:px-15 z-2 relative mx-auto max-w-[77.5rem] px-5 md:px-10 xl:max-w-[87.5rem]">
        <div className="mx-auto mb-10">
          <h2 className="h2 text-center font-code font-medium text-n-1">
            Don't take our word for it
          </h2>
          <p className="body-2 py-[8px] text-center text-n-4">
            Read what our students have to say
          </p>
        </div>

        <div className="grid h-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-6">
          <div className="col-span-1 xl:row-span-3">
            <div className="grid-container">
              <img
                src={cardProfile}
                alt="student"
                className="h-fit w-full object-contain sm:h-[276px]"
              />

              <div>
                <p className="grid-headtext">John Doe</p>
                <p className="grid-subtext">
                  I am a passionate tech enthusiast pursuing my B.Tech in
                  Computer Science and Engineering from Assam University,
                  Silchar. I have experience working with small business owners,
                  helping them enhance their online presence through customized
                  websites and apps.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 xl:row-span-3">
            <div className="grid-container">
              <img
                src={cardProfile}
                alt="student"
                className="h-fit w-full object-contain sm:h-[276px]"
              />

              <div>
                <p className="grid-headtext">John Doe</p>
                <p className="grid-subtext">
                  I am a passionate tech enthusiast pursuing my B.Tech in
                  Computer Science and Engineering from Assam University,
                  Silchar. I have experience working with small business owners,
                  helping them enhance their online presence through customized
                  websites and apps.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 xl:row-span-4">
            <div className="grid-container">
              <div className="flex h-fit w-full items-center justify-center rounded-3xl sm:h-[326px]">
                <img
                  src={connect}
                  alt="connect"
                  className="h-full w-full object-contain sm:h-[276px]"
                />
              </div>

              <div className="my-auto">
                <p className="grid-headtext">Still Thinking | Got any doubt</p>
                <p className="grid-subtext pb-[8px]">Book a call.</p>
                <Button className="w-full" white={true} onClick={() => {}}>
                  <span className="flex items-center gap-2">
                    <PingDot />
                    Connect.
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 xl:row-span-3">
            <div className="grid-container">
              <img
                src={profilePic}
                alt="student"
                className="h-fit w-full object-contain sm:h-[266px]"
              />

              <div>
                <p className="grid-headtext">John Doe</p>
                <p className="grid-subtext">
                  I am a passionate tech enthusiast pursuing my B.Tech in
                  Computer Science and Engineering from Assam University,
                  Silchar. I have experience working with small business owners,
                  helping them enhance their online presence through customized
                  websites and apps.
                </p>
              </div>
            </div>
          </div>

          <div className="xl:col-span-1 xl:row-span-2">
            <div className="grid-container">
              <p className="grid-headtext">John Doe</p>
              <p className="grid-subtext">
                I am a passionate tech enthusiast pursuing my B.Tech in Computer
                Science and Engineering from Assam University, Silchar. I have
                experience working with small business owners, helping them
                enhance their online presence through customized websites and
                apps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
