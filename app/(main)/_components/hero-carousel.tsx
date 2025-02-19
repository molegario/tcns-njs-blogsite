"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Eye, MessageSquare } from "lucide-react";
import Image from "next/image";


const HeroCarousel = () => {
  return (
    <>
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, idx) => (
            <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-[540px] rounded-sm">
                <CardContent className="flex items-center justify-center p-4 relative">
                  <div className="box-border absolute top-4 left-4 right-4 bottom-4 flex flex-col items-center">
                    <Image
                      src={"/nightingale_thumbnail.png"}
                      alt="Nightingale"
                      width={425}
                      height={200}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                    <h3 className="mt-2">23 September, 2025</h3>
                    <hr className="border-t-2 border-gray-300 w-2/3 mt-1" />
                    <h3 className="mt-2 text-lg text-center uppercase md:font-black">
                      This is a title of the article that is very, very, long
                    </h3>
                    <hr className="border-t-2 border-gray-300 w-2/3 mt-2" />
                    <h4 className="mt-2 italic">by Mikreowaveable</h4>
                    <p className="mt-2 text-sm text-justify">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Proin molestie mauris eget nulla tristique, non hendrerit
                      nisl commodo. Quisque efficitur sapien non lobortis
                      suscipit. Duis eget massa eu metus gravida facilisis.
                    </p>
                  </div>
                  <div className="absolute top-[490px] flex h-[40px] w-full items-center px-2 justify-between">
                    <div className="flex items-center justify-start">
                      <Eye /><span className="ml-1">6</span>
                      <MessageSquare className="ml-4"/><span className="ml-1">2</span>
                    </div>
                    <Button className="bg-transparent" size="sm" variant="outline">
                      View Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-1/2 left-2 flex items-center justify-center">
          <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
        </div>
        <div className="absolute top-1/2 right-2 flex items-center justify-center">
          <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
        </div>
      </Carousel>
    </>
  );
};


export default HeroCarousel;