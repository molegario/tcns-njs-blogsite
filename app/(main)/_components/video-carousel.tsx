"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const VideoCarousel = () => {
  return (
    <>
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full max-w-[80%] md:max-w-[90%]"
      >
        <CarouselContent>
          {Array.from({ length: 6 }).map((_, idx) => (
            <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-4">
                  <span className="text-3xl font-semibold">{idx + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default VideoCarousel;
