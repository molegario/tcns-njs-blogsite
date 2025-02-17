"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ListCarousel = () => {

  return (<>
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full mt-16"
    >
      <CarouselContent
        className="mt-0 h-[775px]"
      >
        {
          Array.from({ length: 25 }).map(
            (_, idx) => (
              <CarouselItem
                key={idx}
                className="pt-1 basis-1/8"
              >
                <div className="p-1">
                  <Card>
                    <CardContent
                      className="flex aspect-[6/1] items-center justify-center p-6"
                    >
                      <span className="text-3xl font-semibold">{idx + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )
          )
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </>);
};


export default ListCarousel;