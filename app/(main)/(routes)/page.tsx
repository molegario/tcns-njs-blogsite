import { IconBadge } from "@/components/icon-badge";
import {
  Activity,
  AlarmClock,
  Eye,
  MessageSquare,
  Megaphone,
} from "lucide-react";
import type { Metadata } from "next";
import HeroCarousel from "../_components/hero-carousel";
import ListCarousel from "../_components/list-carousel";
import { Card, CardContent } from "@/components/ui/card";
import VideoCarousel from "../_components/video-carousel";
import ContributorCarousel from "../_components/contributor-carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Common Nonsense - Featured Posts",
  description:
    "The Common Nonsense blog is an online magazine that covers a wide range of topics, from politics to pop culture.",
  keywords: "featured, posts, blog, politics, pop culture",
};

const FeaturedPosts = async function () {
  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="flex items-center justify-center w-full">
              <div className="flex flex-col gap-y-2 justify-center">
                <h1 className="text-zinc-200 uppercase text-lg md:text-3xl font-bold md:font-black py-2 md:pt-4 md:pb-2 text-center">
                  Wading through the{" "}
                  <span className="text-[#EF5B2A] uppercase">nonsense</span> of
                  the day. Reporting to{" "}
                  <span className="text-[#EF5B2A] uppercase">common</span> sense
                  people.
                </h1>
              </div>
            </div>
            <div className="grid grid-col-1 md:grid-cols-12 gap-6 mt-8 mb-2">
              <div className="md:col-span-9 mb-2">
                <div className="flex items-center gap-x-2 mb-2">
                  <IconBadge icon={Megaphone} size={"sm"} />
                  <h3 className="text-xl uppercase font-black text-zinc-200">
                    Currently featured
                  </h3>
                </div>
                <hr className="border-t-2 border-gray-300 mb-6" />
                <div className="flex items-center justify-center">
                  <HeroCarousel />
                </div>
                <div className="grid grid-col-1 md:grid-cols-6 gap-6 mt-8 mb-4">
                  <div className="md:col-span-2 mb-2">
                    <div className="flex items-center gap-x-2 mb-2">
                      <IconBadge icon={AlarmClock} size={"sm"} />
                      <h3 className="text-xl uppercase font-black text-zinc-200">
                        Latest article
                      </h3>
                    </div>
                    <hr className="border-t-2 border-gray-300 mb-6" />
                    <div className="p-1 mt-4">
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
                              This is a title of the article that is very, very,
                              long
                            </h3>
                            <hr className="border-t-2 border-gray-300 w-2/3 mt-2" />
                            <h4 className="mt-2 italic">by Mikreowaveable</h4>
                            <p className="mt-2 text-sm text-justify">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Proin molestie mauris eget nulla tristique,
                              non hendrerit nisl commodo. Quisque efficitur
                              sapien non lobortis suscipit. Duis eget massa eu
                              metus gravida facilisis.
                            </p>
                          </div>
                          <div className="absolute top-[490px] flex h-[40px] w-full items-center px-2 justify-between">
                            <div className="flex items-center justify-start">
                              <Eye />
                              <span className="ml-1">6</span>
                              <MessageSquare className="ml-4" />
                              <span className="ml-1">2</span>
                            </div>
                            <Button
                              className="bg-transparent"
                              size="sm"
                              variant="outline"
                            >
                              View Post
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="md:col-span-2 mb-2">
                    <div className="flex items-center gap-x-2 mb-2">
                      <IconBadge icon={Eye} size={"sm"} />
                      <h3 className="text-xl uppercase font-black text-zinc-200">
                        Most viewed
                      </h3>
                    </div>
                    <hr className="border-t-2 border-gray-300 mb-6" />
                    <div className="p-1 mt-4">
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
                              This is a title of the article that is very, very,
                              long
                            </h3>
                            <hr className="border-t-2 border-gray-300 w-2/3 mt-2" />
                            <h4 className="mt-2 italic">by Mikreowaveable</h4>
                            <p className="mt-2 text-sm text-justify">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Proin molestie mauris eget nulla tristique,
                              non hendrerit nisl commodo. Quisque efficitur
                              sapien non lobortis suscipit. Duis eget massa eu
                              metus gravida facilisis.
                            </p>
                          </div>
                          <div className="absolute top-[490px] flex h-[40px] w-full items-center px-2 justify-between">
                            <div className="flex items-center justify-start">
                              <Eye />
                              <span className="ml-1">6</span>
                              <MessageSquare className="ml-4" />
                              <span className="ml-1">2</span>
                            </div>
                            <Button
                              className="bg-transparent"
                              size="sm"
                              variant="outline"
                            >
                              View Post
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="md:col-span-2 mb-2">
                    <div className="flex items-center gap-x-2 mb-2">
                      <IconBadge icon={MessageSquare} size={"sm"} />
                      <h3 className="text-xl uppercase font-black text-zinc-200">
                        Most commented
                      </h3>
                    </div>
                    <hr className="border-t-2 border-gray-300 mb-6" />
                    <div className="p-1 mt-4">
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
                              This is a title of the article that is very, very,
                              long
                            </h3>
                            <hr className="border-t-2 border-gray-300 w-2/3 mt-2" />
                            <h4 className="mt-2 italic">by Mikreowaveable</h4>
                            <p className="mt-2 text-sm text-justify">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Proin molestie mauris eget nulla tristique,
                              non hendrerit nisl commodo. Quisque efficitur
                              sapien non lobortis suscipit. Duis eget massa eu
                              metus gravida facilisis.
                            </p>
                          </div>
                          <div className="absolute top-[490px] flex h-[40px] w-full items-center px-2 justify-between">
                            <div className="flex items-center justify-start">
                              <Eye />
                              <span className="ml-1">6</span>
                              <MessageSquare className="ml-4" />
                              <span className="ml-1">2</span>
                            </div>
                            <Button
                              className="bg-transparent"
                              size="sm"
                              variant="outline"
                            >
                              View Post
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center w-full mb-2">
                  <div className="flex flex-row gap-y-2 w-full justify-between">
                    <h1 className="text-xl font-bold text-zinc-200 uppercase flex flex-col justify-center">
                      The Common Nonsense Podcast
                    </h1>
                    <Button
                      className="bg-transparent text-zinc-200"
                      size="sm"
                      variant="outline"
                    >All Videos</Button>
                  </div>
                </div>
                <hr className="border-t-2 border-gray-300 mb-6" />
                <div className="flex items-center justify-center mb-8">
                  <VideoCarousel />
                </div>

                <div className="flex items-center justify-center w-full mb-2">
                  <div className="flex flex-col gap-y-2 justify-center">
                    <h1 className="text-xl font-bold text-zinc-200 uppercase">
                      Our content contributers
                    </h1>
                  </div>
                </div>
                <hr className="border-t-2 border-gray-300 mb-6" />
                <div className="flex items-center justify-center mb-4">
                  <ContributorCarousel />
                </div>
              </div>
              <div className="md:col-span-3 mb-8">
                <div className="flex items-center gap-x-2 mb-2">
                  <IconBadge icon={Activity} size={"sm"} />
                  <h3 className="text-xl uppercase font-black text-zinc-200">
                    Content feed
                  </h3>
                </div>
                <hr className="border-t-2 border-gray-300 mb-6" />
                <ListCarousel />
                <div className="p-1 mt-20">
                  <Card>
                    <CardContent className="flex aspect-[4/5] items-center justify-center p-4"></CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedPosts;
