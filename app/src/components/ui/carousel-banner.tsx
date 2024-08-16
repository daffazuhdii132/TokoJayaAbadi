"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function CarouselBanner() {
  return (
    <div className="flex justify-center">
      <Carousel
        className=" w-3/4"
        plugins={[
          Autoplay({
            delay: 2500,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="p-1">
              <img
                className="rounded-xl"
                src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/7/31/886b707d-4eb0-4bb7-a25b-bed44d3c8f79.jpg.webp?ect=4g"
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <img
                className="rounded-xl"
                src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/7/11/26eae974-c5f7-4100-b4ee-82ca95ab12c9.jpg.webp?ect=4g"
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <img
                className="rounded-xl"
                src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/7/26/5d2e6b42-32f0-419f-9900-b64e63155e5f.jpg.webp?ect=4g"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
