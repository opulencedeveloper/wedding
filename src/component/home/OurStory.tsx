"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

import LoveIcon from "@/assets/home/images/love.svg";
import GroomBrideImageOne from "@/assets/home/images/groom-bride-1.png";
import BrideGroomImage from "@/assets/home/images/bride-groom-1.png";

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const isBottomInView = useInView(bottomSectionRef, {
    once: false,
    margin: "-100px",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      rotateY: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className="px-4 md:px-5 pb-[100px] md:pb-[292.44px] love-story-rose-right-bg"
    >
      <div className="max-w-308 b w-full mx-auto pt-[99px] md:pt-[212px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col size1000:flex-row justify-between gap-5 md:gap-6 text-c136207 font-greatvibes-400 mb-10 size1000:mb-[117.74px]"
        >
          <motion.div
            className="w-full"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="flex items-center justify-between text-[50px] mx-auto md:mx-0 md:text-c75 w-max"
              variants={titleVariants}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.span
                className="mr-5 md:mr-6"
                whileHover={{ scale: 1.1, rotateZ: -2 }}
              >
                Our
              </motion.span>{" "}
              <motion.div
                className="h-[57.69px] md:h-[79.36px] w-[61.13px] md:w-[84.08px]"
                whileHover={{ scale: 1.2, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={LoveIcon}
                  alt="love"
                  className="h-full w-full"
                  height={79}
                  width={84}
                />
              </motion.div>{" "}
              <motion.span
                className="ml-2 md:ml-3"
                whileHover={{ scale: 1.1, rotateZ: 2 }}
              >
                Story
              </motion.span>{" "}
            </motion.div>

            <motion.p
              className="font-nunito-400 text-black text-lg md:text-xl mt-5 mb-2.5 font-bold text-center md:text-left"
              variants={itemVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ x: 5, scale: 1.02 }}
            >
              Oluwadoyinsolami
            </motion.p>
            <motion.p
              className="text-black mt-4 md:mt-0 font-nunito-400 text-base md:text-xl leading-[34px] text-center md:text-start"
              variants={itemVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Seyi says we first met at a church program with Rev. Ken, but I
              insist it was at choir rehearsal where he totally ignored me! 😅
              We still don’t agree on who’s right. What started as simple hellos
              in church soon grew into a beautiful friendship filled with
              laughter, deep talks, and faith. Before we knew it, God turned
              that friendship into love. Our paths, guided by the Spirit,
              aligned perfectly. I found in Seyi the spiritual strength, love,
              and peace I always prayed for. Truly, our story was written by God
              — Seyi is my now, forever, and always.
            </motion.p>
          </motion.div>

          <motion.div
            className="h-auto md:h-[342.22px] w-full md:w-[492.9px] shrink-0 mx-auto"
            initial={{ opacity: 0, scale: 0.85, rotateY: -20 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    y: [0, -15, 5, -10, 0],
                    x: [0, 8, -5, 3, 0],
                    rotate: [0, 2, -1, 1.5, 0],
                  }
                : { opacity: 0, scale: 0.85, rotateY: -20 }
            }
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{
              opacity: { duration: 1, ease: "easeOut" },
              scale: { duration: 1, ease: "easeOut" },
              rotateY: { duration: 1, ease: "easeOut" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Image
              src={GroomBrideImageOne}
              alt="bride"
              className="h-full w-full object-contain object-top"
              height={342}
              width={492}
            />
          </motion.div>
        </motion.div>

        <motion.div
          ref={bottomSectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={isBottomInView ? "visible" : "hidden"}
          className="flex flex-col-reverse size1000:flex-row justify-between gap-7.5 text-c136207 font-greatvibes-400"
        >
          <motion.div
            className="h-auto md:h-[342.22px] ob w-full md:w-[492.9px] shrink-0 mx-auto"
            initial={{ opacity: 0, scale: 0.85, rotateY: -20 }}
            animate={
              isBottomInView
                ? {
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    y: [0, 12, -8, 10, -5, 0],
                    x: [0, -6, 4, -3, 2, 0],
                    rotate: [0, -1.5, 2, -1, 0.5, 0],
                  }
                : { opacity: 0, scale: 0.85, rotateY: -20 }
            }
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            whileHover={{ scale: 1.05, rotateY: -5 }}
            transition={{
              opacity: { duration: 1, ease: "easeOut" },
              scale: { duration: 1, ease: "easeOut" },
              rotateY: { duration: 1, ease: "easeOut" },
              y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Image
              src={BrideGroomImage}
              alt="bride"
              className="h-full w-full object-contain object-top"
              height={342}
              width={492}
            />
          </motion.div>

          <motion.div
            className="w-full text-xl md:mt-11.5"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="font-nunito-400 text-black text-lg md:text-xl mt-5 mb-2.5 font-bold text-center md:text-left"
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ x: 5, scale: 1.02 }}
            >
              Oluwaseyi
            </motion.p>
            <motion.p
              className="text-black mt-4 md:mt-0 font-nunito-400 text-base md:text-xl leading-[34px] text-center md:text-start"
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              It was a cold winter, yet I felt a warmth words can't describe —
              her warmth. From the moment I met Oluwadoyinsolami, I was
              captivated. Her smile, her laughter, her wisdom — everything about
              her drew me in. In her, I found more than love; I found peace,
              passion, and my future. She lights up my world and calms every
              storm. I'm forever grateful to call her mine — the woman who makes
              every day feel like a beautiful beginning. 💚
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
