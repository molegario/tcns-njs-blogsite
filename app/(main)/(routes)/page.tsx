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

export const metadata: Metadata = {
  title: "The Common Nonsense - Featured Posts",
  description: "The Common Nonsense blog is an online magazine that covers a wide range of topics, from politics to pop culture.",
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
                  <h3 className="text-lg uppercase">Currently featured</h3>
                </div>
                <hr className="border-t-2 border-gray-300 mb-6" />
                <div className="flex items-center justify-center">
                  <HeroCarousel />
                </div>
                <div className="grid grid-col-1 md:grid-cols-6 gap-6 mt-8 mb-4">
                  <div className="md:col-span-2 mb-2">
                    <div className="flex items-center gap-x-2 mb-2">
                      <IconBadge icon={AlarmClock} size={"sm"} />
                      <h3 className="text-lg uppercase">Latest article</h3>
                    </div>
                    <hr className="border-t-2 border-gray-300 mb-6" />
                    <div className="p-1 mt-4">
                      <Card>
                        <CardContent className="flex aspect-[4/5] items-center justify-center p-4"></CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="md:col-span-2 mb-2">
                    <div className="flex items-center gap-x-2 mb-2">
                      <IconBadge icon={Eye} size={"sm"} />
                      <h3 className="text-lg uppercase">Most viewed</h3>
                    </div>
                    <hr className="border-t-2 border-gray-300 mb-6" />
                    <div className="p-1 mt-4">
                      <Card>
                        <CardContent className="flex aspect-[4/5] items-center justify-center p-4"></CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="md:col-span-2 mb-2">
                    <div className="flex items-center gap-x-2 mb-2">
                      <IconBadge icon={MessageSquare} size={"sm"} />
                      <h3 className="text-lg uppercase">Most commented</h3>
                    </div>
                    <hr className="border-t-2 border-gray-300 mb-6" />
                    <div className="p-1 mt-4">
                      <Card>
                        <CardContent className="flex aspect-[4/5] items-center justify-center p-4"></CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center w-full mb-2">
                  <div className="flex flex-col gap-y-2 justify-center">
                    <h1 className="text-xl font-bold text-zinc-200 uppercase">
                      The Common Nonsense Podcast
                    </h1>
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
                  <h3 className="text-lg uppercase">Content feed</h3>
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
