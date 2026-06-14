"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Sponsor {
  id: number;
  name: string;
  logo: string;
}

// Dynamically load sponsors from /public/images/sponsors/
const Sponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sponsorList: Sponsor[] = [
      { id: 1, name: "Insights IAS", logo: "https://cdn.utkarshubdt.in/sponsers/image0.jpeg" },
      { id: 2, name: "Team 17 Events", logo: "https://cdn.utkarshubdt.in/sponsers/image1.PNG" },
      { id: 3, name: "GDR Groups", logo: "https://cdn.utkarshubdt.in/sponsers/image2.jpeg" },
      { id: 4, name: "UBDTCE", logo: "https://cdn.utkarshubdt.in/sponsers/UBDT_CircleLogo.png" },
    ];
    setSponsors(sponsorList);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Calculate animation duration based on number of sponsors
  const animationDuration = Math.max(20, sponsors.length * 3);

  return (
    <section id="sponsors" className="py-20 md:py-28 bg-gradient-to-b from-[#14031d] to-[#0d0213] scroll-mt-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              Sponsors
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            Our trusted partners and sponsors who make Utkarsh possible
          </p>
        </motion.div>

        {/* Sponsors Cards - Visible only on mobile */}
        <motion.div
          className="grid grid-cols-2 gap-4 sm:gap-6 max-w-7xl mx-auto lg:hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {sponsors.map((sponsor) => (
            <motion.div
              key={sponsor.id}
              variants={itemVariants}
              className="relative bg-card/40 backdrop-blur-md border border-orange-500/10 hover:border-amber-500/50 hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)] rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300"
            >
              <div className="relative w-full h-24 flex items-center justify-center">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 45vw, 30vw"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <p className="text-white font-medium text-sm text-center">{sponsor.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Infinite Scrolling Sponsors Marquee - Visible only on laptop/desktop */}
      <div className="mt-12 md:mt-16 overflow-hidden hidden lg:block" ref={marqueeRef}>
        <motion.div
          className="flex gap-8 md:gap-12 py-4"
          animate={{
            x: [0, -(sponsors.length * 220)],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: animationDuration,
              ease: "linear",
            },
          }}
        >
          {/* Triple the sponsors for seamless loop */}
          {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
            <div
              key={`scroll-${sponsor.id}-${index}`}
              className="flex-shrink-0 w-40 md:w-48 lg:w-52 h-24 md:h-28 lg:h-32 relative"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                fill
                className="object-contain"
                sizes="208px"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Call to Action - Moved to the end */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-8 md:mt-12 lg:mt-16"
      >
        <p className="text-muted-foreground text-sm md:text-base">
          Interested in sponsoring Utkarsh?{" "}
          <a
            href="mailto:sponsership@utkarshubdt.in"
            className="text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors font-semibold"
          >
            Contact us
          </a>
        </p>
      </motion.div>
    </section>
  );
};

export default Sponsors;
