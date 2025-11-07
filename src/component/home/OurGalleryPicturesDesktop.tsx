import Image from "next/image";

import LoveIcon from "@/assets/home/images/love.svg";
import AngleRight from "@/assets/home/images/angle-right.svg";
import AngleLeft from "@/assets/home/images/angle-left.svg";
import GroomKissingBride from "@/assets/home/images/groom-kissing-bride.png";
import GroomKHoldingBride from "@/assets/home/images/groom-holding-bride.png";
import GroomLookingAtBride from "@/assets/home/images/groom-looking-at-bride.png";
import GroomAndBrideLookingAtTheCamera from "@/assets/home/images/groom-and-bride-looking-at-the-camera.png";
import GroomAndBrideSmilingAtTheCamera from "@/assets/home/images/groom-and-blind-smiling-at-the-camera.png";

import GreenRose from "@/assets/home/images/green-rose.svg";
import OurGalleryRose from "@/assets/home/images/our-gallery-rose.svg";

export default function OurGalleryDesktop() {
  return (  <div className="w-full hidden size1000:block">
          <div className="flex items-end w-full space-x-3.5">
            <div className="w-[39%] flex flex-col space-y-2 ">
              <div className="bg-c1c1c1e text-white rounded-[11.02px] pt-[27px] pb-[3px] px-5 flex flex-col items-center justify-center">
                <p className="font-nunito-400 text-lg text-center mb-[18px]">
                  Love is the quiet strength that holds two hearts, the joy of
                  giving without expecting, and the beauty of growing together
                  through every season of life.”
                </p>
                <p className="font-greatvibes-400 text-white text-[25px]">
                  Oluwadoyinsolami & Oluwaseyi
                </p>
                <p className="text-white font-greatvibes-400 text-[52px]">
                  2026
                </p>
              </div>

              <div className="h-39 rounded-[11.02px] overflow-hidden w-full">
                <Image
                  src={GroomKissingBride}
                  className="h-full w-full object-cover md:grayscale md:hover:grayscale-0 transition-all duration-300"
                  alt="groom kissing bride"
                  height={687}
                  width={1440}
                />
              </div>
            </div>

            <div className="w-[61%] h-[420px] relative ">
              <div className="h-full w-full pr-4 pt-3.5 ">
                {" "}
                <Image
                  src={GroomKHoldingBride}
                  alt="Groom Holding Bride"
                  height={383}
                  width={546}
                  className="h-full w-full object-contain object-bottom md:grayscale md:hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <Image
                src={AngleRight}
                alt="angle-right"
                width={262}
                height={198}
                className="absolute h-[198px] top-5.5 right-0"
              />
            </div>
          </div>

          <div className="flex justify-end pr-8 relative">
            <Image
              src={OurGalleryRose}
              alt=""
              width={150}
              height={150}
              className="absolute -top-7 -left-45 h-[360px] w-[360px] pointer-events-none z-0"
            />
            <div className="w-max space-x-2 flex h-[409px] items-end justify-between relative">
              <div className="h-[394px] w-[293px] relative z-10">
                <Image
                  src={GroomAndBrideLookingAtTheCamera}
                  alt="Groom and bride looking at the camera"
                  className="h-full w-full grayscale hover:grayscale-0 transition-all duration-300"
                  height={394}
                  width={293}
                />
              </div>

              <div className="h-[196px] w-24 bg-c1c1c1e rounded-[11.02px] flex items-center justify-center relative z-10">
                <span className="text-white font-greatvibes-400 text-[25px] rotate-90">
                  Love
                </span>
              </div>
              <div className="w-[257px] h-[184px] absolute top-4 right-1 z-10">
                <Image
                  height={184}
                  width={252}
                  alt="Groom and bride looking at the camera"
                  src={GroomAndBrideSmilingAtTheCamera}
                  className="h-full w-full object-cover md:grayscale md:hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <Image
                src={AngleLeft}
                alt="angle-right"
                width={262}
                height={198}
                className="absolute -bottom-5 -left-13 h-[270px] w-[270px] pointer-events-none z-0"
              />
            </div>

            <div className="-mt-27">
              <div className="w-[350px] h-[227px] relative z-10">
                <Image
                  src={GreenRose}
                  alt=""
                  width={250}
                  height={250}
                  className="absolute -bottom-12 -right-44 pointer-events-none z-0"
                />
                <Image
                  height={237}
                  width={342}
                  src={GroomLookingAtBride}
                  alt="Groom Looking At Bride"
                  className="h-full w-full object-cover relative z-10 md:grayscale md:hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <p className="text-c136207 ml-7 font-greatvibes-400 text-[52px] mt-[21px]">
                Our Beautiful <br />
                Memory
              </p>
            </div>
          </div>
        </div>
  );
}
