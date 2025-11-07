'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';

import LoveIcon from "@/assets/home/images/love.svg";
import WhiteWeddingImage from "@/assets/home/images/white-wedding.png";
import TraditionalMarriageImage from "@/assets/home/images/traditional-marriage.png";
import ThanksgivingImage from "@/assets/home/images/thanks-giving.png";

function EventOverlay() {
  const router = useRouter();
  
  return (
    <div className="absolute md:hidden bottom-0 left-0 right-0 flex flex-col justify-center items-center pb-8 md:pb-6">
      <div className="flex flex-col justify-center items-center max-w-[361px] w-full mx-auto">
        <p className="text-xl md:text-xl font-nunito-400 leading-none text-white">Saturday</p>
        <p className="font-greatvibes-400 text-[54.84px] md:text-[54.84px] leading-none mt-0.5 text-white">
          March 26. 2026
        </p>
        <p className="font-greatvibes-400 text-[32.26px] md:text-[32.26px] text-white">Toronnto, Canada</p>
        <button 
          onClick={() => router.push('/registration/guest')}
          className="mt-6.5 flex items-center justify-center h-[59px] w-57 rounded-[50px] border border-white"
        >
          <span className="text-white font-nunito-400 text-xl">RSVP</span>
        </button>
      </div>
    </div>
  );
}

export default function WeddingEvent() {
  return (
    <section id="event" className="px-5 pb-[66.57px] md:pb-[292.44px] overflow-hidden">
      <div className="max-w-[1233px] w-full mx-auto relative">
        <div className="flex items-center mb-[46.4px] text-c136207 text-c75 w-max font-greatvibes-400 relative z-10 mx-auto md:ml-0">
          <span className="text-[50px] md:text-c75 mr-6">Event</span>{" "}
          <div className="h-[54.68px] md:h-[79.36px] w-[57.94px] md:w-[84.08px]">
            <Image
              src={LoveIcon}
              alt="love"
              className="h-full w-full"
              height={79}
              width={84}
            />
          </div>{" "}
        </div>

        <div className="w-full flex flex-col md:flex-row gap-[21px]">
          <div className="w-full h-[583.53] md:h-[572px] rounded-[10px] overflow-hidden relative">
            <Image
              src={WhiteWeddingImage}
              alt="White weding"
              className="h-full w-full object-cover"
            />
            <EventOverlay />
          </div>
          <div className="w-full h-[583.53] md:h-[572px] rounded-[10px] overflow-hidden relative">
            <Image
              src={TraditionalMarriageImage}
              alt="Traditional marriage"
              className="h-full w-full object-cover"
            />
            <EventOverlay />
          </div>
          <div className="w-full h-[583.53] md:h-[572px] rounded-[10px] overflow-hidden relative">
            <Image
              src={ThanksgivingImage}
              alt="Thanks giving"
              className="h-full w-full object-cover"
            />
            <EventOverlay />
          </div>
        </div>
      </div>
    </section>
  );
}
