import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AvailableServices = [
  {
    title: "Live Classes",
    description:
      "Live classes are available for all students to study from their home. The classes are recorded and you can watch them whenever you want.",
  },
  {
    title: "Mock Tests",
    description:
      "Mock tests are available for all students to practice their concepts. The tests are recorded and you can watch them whenever you want.",
  },
  {
    title: "Expert Faculty",
    description:
      "Highly qualified and experienced teachers dedicated to your success.",
  },
  {
    title: "Individualized Attention",
    description: "Personalized attention and guidance for each student.",
  },
  {
    title: "Expert Faculty",
    description:
      "Highly qualified and experienced teachers dedicated to your success.",
  },
  {
    title: "Individualized Attention",
    description: "Personalized attention and guidance for each student.",
  },
  {
    title: "Expert Faculty",
    description:
      "Highly qualified and experienced teachers dedicated to your success.",
  },
  {
    title: "Individualized Attention",
    description: "Personalized attention and guidance for each student.",
  },
];
const ServicesCard = ({ item }) => {
  return (
    <Card className="h-[200px] w-[350px]">
      <CardHeader className="mx-auto flex flex-col space-y-2">
        <CardTitle className="h5 text-center font-sans font-medium text-n-1">
          {item.title}
        </CardTitle>
        <CardDescription className="body-2 text-n-4">
          {item.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

const Services = () => {
  const plugin = useRef(Autoplay({ delay: 1000, stopOnInteraction: true }));

  return (
    <section className="mt-20" id="services">
      <div className="lg:px-15 z-2 relative mx-auto max-w-[77.5rem] px-5 md:px-10 xl:max-w-[87.5rem]">
        <div className="mx-auto mb-10">
          <h2 className="h2 text-center font-code font-medium text-n-1">
            What do Students Get?
          </h2>
          <p className="body-2 text-center text-n-4">
            GMB got you covered. Just scroll to find the one you are looking
            for.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              loop: true,
            }}
            className="relative z-10 h-96 max-h-[500px] w-full"
            onMouseEnter={() => plugin.current && plugin.current.stop()}
            onMouseLeave={() => plugin.current && plugin.current.reset()}
          >
            <CarouselContent>
              {AvailableServices.map((items, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <ServicesCard item={items} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute left-1/2 right-1/2 top-[60%] flex items-center justify-center">
              <CarouselPrevious className="inner-shadow" />
              <CarouselNext className="inner-shadow" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Services;
