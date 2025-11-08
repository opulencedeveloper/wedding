'use client';

import { motion } from 'framer-motion';
import Footer from "@/component/home/Footer";
import HeroSection from "@/component/home/HeroSection";
import MakeHotelReservation from "@/component/home/MakeHotelReservation";
import OurGallery from "@/component/home/OurGallery";
import OurStory from "@/component/home/OurStory";
import QandA from "@/component/home/QandA";
import WeddingEvent from "@/component/home/WeddingEvent";
import AnimatedSection from "@/component/layout/AnimatedSection";
import ParallaxSection from "@/component/layout/ParallaxSection";
import StaggerChildren from "@/component/layout/StaggerChildren";

interface HomePageClientProps {
  token?: string;
}

function HomePageContent({ token = 'guest' }: HomePageClientProps) {

  return (
    <div className='overflow-x-hidden'>
      <HeroSection token={token} />
      
      {/* Our Story with automatic animations */}
      <OurStory />

      {/* Gallery with mind-blowing animations */}
      <OurGallery />

      {/* Accommodation with Parallax */}
      <ParallaxSection speed={0.4}>
        <AnimatedSection direction="fade" delay={0.1}>
          <MakeHotelReservation />
        </AnimatedSection>
      </ParallaxSection>

      {/* Q&A with Stagger */}
      <AnimatedSection direction="up" delay={0.2}>
        <StaggerChildren staggerDelay={0.1}>
          <QandA />
        </StaggerChildren>
      </AnimatedSection>

      {/* Event with 3D Transform */}
      <AnimatedSection direction="scale" delay={0.1}>
        <motion.div
          initial={{ opacity: 0, rotateX: 15, scale: 0.9 }}
          whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        >
          <WeddingEvent token={token} />
        </motion.div>
      </AnimatedSection>

      {/* Footer with Fade */}
      <AnimatedSection direction="fade" delay={0.1}>
        <Footer token={token} />
      </AnimatedSection>
    </div>
  );
}

export default function HomePageClient({ token = 'guest' }: HomePageClientProps) {
  return <HomePageContent token={token} />;
}

