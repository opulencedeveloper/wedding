'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.85,
    y: 50,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
  },
};

const imageTransition = {
  duration: 0.8,
  ease: "easeOut" as const,
};

export default function OurGalleryMobile() {
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const image4Ref = useRef<HTMLDivElement>(null);
  const image5Ref = useRef<HTMLDivElement>(null);

  const image1InView = useInView(image1Ref, { once: true, margin: '-50px' });
  const image2InView = useInView(image2Ref, { once: true, margin: '-50px' });
  const image3InView = useInView(image3Ref, { once: true, margin: '-50px' });
  const image4InView = useInView(image4Ref, { once: true, margin: '-50px' });
  const image5InView = useInView(image5Ref, { once: true, margin: '-50px' });

  return (
    <div className="block size1000:hidden w-full">
      <div className="bg-c1c1c1e text-white rounded-[11.02px] pt-[47.14px] pb-[11.4px] px-5 flex flex-col items-center justify-center">
        <p className="font-nunito-400 text-[18.25px] text-center mb-6 md:mb-[18px]">
          Love is the quiet strength that holds two hearts, the joy of giving
          without expecting, and the beauty of growing together through every
          season of life."
        </p>
        <p className="font-greatvibes-400 text-white text-[22.81px] md:text-[25px]">
          Oluwadoyinsolami & Oluwaseyi
        </p>
        <p className="text-white font-greatvibes-400 text-[28.51px] mt-5 md:mt-0 md:text-[52px]">
          2026
        </p>
      </div>

      <motion.div 
        ref={image1Ref}
        className="w-full mt-20 mx-auto h-auto max-w-[401.93px] relative"
        variants={imageVariants}
        initial="hidden"
        animate={image1InView ? 'visible' : 'hidden'}
        transition={imageTransition}
      >
        <div className="h-full w-full">
          <Image
            src={CoupleGroup}
            alt="Groom Holding Bride"
            height={383}
            width={546}
            className="h-full w-full object-contain object-bottom md:grayscale md:hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </motion.div>

      <motion.div 
        ref={image2Ref}
        className="h-44 mt-2.5 rounded-[11.02px] overflow-hidden w-full"
        variants={imageVariants}
        initial="hidden"
        animate={image2InView ? 'visible' : 'hidden'}
        transition={imageTransition}
      >
        <Image
          src={GroomKissingBride}
          className="h-full w-full object-cover md:grayscale md:hover:grayscale-0 transition-all duration-300"
          alt="groom kissing bride"
          height={687}
          width={1440}
        />
      </motion.div>

      <motion.div 
        ref={image3Ref}
        className="mt-3 h-auto w-full borde relative z-10"
        variants={imageVariants}
        initial="hidden"
        animate={image3InView ? 'visible' : 'hidden'}
        transition={imageTransition}
      >
        <Image
          src={GroomAndBrideSmilingAtTheCamera}
          alt="Groom and bride looking at the camera"
          className="object-contain h-full w-full"
          height={394}
          width={293}
        />
      </motion.div>

      <motion.div 
        ref={image4Ref}
        className="w-full mt-20 mx-auto h-auto max-w-[401.93px] relative"
        variants={imageVariants}
        initial="hidden"
        animate={image4InView ? 'visible' : 'hidden'}
        transition={imageTransition}
      >
        <div className="h-full w-full">
          <Image
            src={CoupleGroupTwo}
            alt="Groom Holding Bride"
            height={383}
            width={546}
            className="h-full w-full object-contain object-bottom md:grayscale md:hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </motion.div>
    </div>
  );
}
