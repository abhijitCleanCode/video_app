import React from "react";

import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cardProfile } from "../assets";

const AchievementCard = ({ index }) => {
  return (
    <div className="w-full rounded-[32]">
      <Card className="rounded-[32px] bg-white/70 fill-[#282828]/70 stroke-white/40 stroke-1 p-10 shadow-md">
        <CardHeader>
          <p className="text-n-3">
            Jee mains percentile 98.28 | HS 10th Rank Holder | Maths score 100.
          </p>
        </CardHeader>

        <CardFooter className="mt-8 flex items-center gap-4">
          <img
            src={cardProfile}
            alt="profile img"
            className="h-24 w-24 rounded-full"
          />
          <div>
            <h3 className="h3 font-code font-medium text-n-1">Mike Tyson</h3>
            <p className="text-sm tracking-wide text-n-1">
              2 Years Program | Online Mode
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const Achievement = () => {
  return (
    <section className="mt-20 bg-stars bg-cover bg-center" id="achievement">
      <div className="lg:px-15 z-2 relative mx-auto max-w-[77.5rem] px-5 md:px-10 xl:max-w-[87.5rem]">
        <div className="mx-auto mb-5">
          <h2 className="h2 text-center font-code font-medium text-n-1">
            Academic Excellence: Result
          </h2>
          <p className="body-2 text-center text-n-4">
            Giving wings to thousand dreams. A thousand more to go.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Carousel
            opts={{
              loop: true,
              centerMode: true,
              centerPadding: "0px",
            }}
            className="z-10 h-96 max-h-[500px] max-w-4xl"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="flex justify-center">
                  <AchievementCard index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="inner-shadow" />
            <CarouselNext className="inner-shadow" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Achievement;
