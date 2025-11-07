import Image from "next/image";

import LoveIcon from "@/assets/home/images/love.svg";
import AngleRight from "@/assets/home/images/angle-right-mobile.svg";
import AngleLeft from "@/assets/home/images/angle-left.svg";
import GroomKissingBride from "@/assets/home/images/groom-kissing-bride.png";
import CoupleGroup from "@/assets/home/images/couple-group.png";
import CoupleGroupTwo from "@/assets/home/images/couple-group-2.png";
import GroomLookingAtBride from "@/assets/home/images/groom-looking-at-bride.png";
import GroomAndBrideLookingAtTheCamera from "@/assets/home/images/groom-and-bride-looking-at-the-camera.png";
import GroomAndBrideSmilingAtTheCamera from "@/assets/home/images/groom-and-blind-smiling-at-the-camera.png";

import GreenRose from "@/assets/home/images/green-rose.svg";
import OurGalleryRose from "@/assets/home/images/our-gallery-rose.svg";

export default function OurGalleryMobile() {
  return (
    <div className="block size1000:hidden w-full">
      <div className="bg-c1c1c1e text-white rounded-[11.02px] pt-[47.14px] pb-[11.4px] px-5 flex flex-col items-center justify-center">
        <p className="font-nunito-400 text-[18.25px] text-center mb-6 md:mb-[18px]">
          Love is the quiet strength that holds two hearts, the joy of giving
          without expecting, and the beauty of growing together through every
          season of life.”
        </p>
        <p className="font-greatvibes-400 text-white text-[22.81px] md:text-[25px]">
          Oluwadoyinsolami & Oluwaseyi
        </p>
        <p className="text-white font-greatvibes-400 text-[28.51px] mt-5 md:mt-0 md:text-[52px]">
          2026
        </p>
      </div>

      <div className="w-full mt-20 mx-auto h-auto max-w-[401.93px] relative ">
        <div className="h-full w-full ">
          {" "}
          <Image
            src={CoupleGroup}
            alt="Groom Holding Bride"
            height={383}
            width={546}
            className="h-full w-full object-contain object-bottom md:grayscale md:hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>

      {/* ///// */}

      {/* <p className="text-c136207 ml-7 font-greatvibes-400 text-[52px] mt-[21px]">
        Our Beautiful <br />
        Memory
      </p> */}
      <div className="h-44 mt-2.5 rounded-[11.02px] overflow-hidden w-full">
        <Image
          src={GroomKissingBride}
          className="h-full w-full object-cover md:grayscale md:hover:grayscale-0 transition-all duration-300"
          alt="groom kissing bride"
          height={687}
          width={1440}
        />
      </div>

       <div className="mt-3 h-auto w-full borde relative z-10">
            <Image
              src={GroomAndBrideSmilingAtTheCamera}
              alt="Groom and bride looking at the camera"
              className="object-contain h-full w-full"
              height={394}
              width={293}
            />
          </div>


           <div className="w-full mt-20 mx-auto h-auto max-w-[401.93px] relative ">
        <div className="h-full w-full ">
          {" "}
          <Image
            src={CoupleGroupTwo}
            alt="Groom Holding Bride"
            height={383}
            width={546}
            className="h-full w-full object-contain object-bottom md:grayscale md:hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>



    </div>
  );
}
