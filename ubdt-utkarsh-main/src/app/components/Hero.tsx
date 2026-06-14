"use client";

import { Button } from "@/src/components/ui/button";
import { Spotlight } from "@/src/components/ui/spotlight";
import { PageLoader } from "@/src/components/ui/page-loader";
import { FaDownload } from "react-icons/fa6";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

// Generate random position/size for floating lantern particles
const generateParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));
};

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    setParticles(generateParticles(25)); // 25 floating festive fireflies/lanterns
  }, []);

  if (!mounted) {
    return <PageLoader />;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0213] via-[#06010a] to-[#1f0318]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      {/* Spotlight Effect - Hidden on very small screens for performance */}
      <div className="hidden sm:block">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#ffe259"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="#ffa751"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="#e11d48" />
      </div>

      {/* Animated Background Orbs - Smaller on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-48 sm:w-72 h-48 sm:h-72 bg-amber-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "10%", left: "5%" }}
        />
        <motion.div
          className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-orange-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ bottom: "10%", right: "5%" }}
        />
        <motion.div
          className="absolute w-40 sm:w-64 h-40 sm:h-64 bg-rose-600/15 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Floating Festive Fireflies / Lanterns */}
      <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_12px_#f59e0b]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: ["0vh", "-60vh"],
              x: ["0vw", `${Math.random() * 10 - 5}vw`],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 sm:mb-8"
          >
            <span className="relative flex md:h-3 md:w-3 h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full md:h-3 md:w-3 h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm sm:text-base text-white/80 font-bold">Registrations are open !!!</span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-5xl lg:text-9xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Utkarsh
              </span>
              <span className="text-white/95"> - </span>
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                2k26
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <div className="mt-4 sm:mt-5 md:mt-6 mb-6 sm:mb-8 md:mb-10 px-2">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              UBDT's inter-college technical and cultural fest showcasing innovation, creativity and technical excellence.
            </p>
            <p className="mt-4 text-base sm:text-sm md:text-base font-semibold tracking-wide">
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-2 text-white/90 shadow-[0_0_24px_rgba(245,158,11,0.35)]">
                20th - 22nd June
              </span>
            </p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12"
          >
            {[
              { value: "23+", label: "Events" },
              { value: "3", label: "Days" },
              { value: "₹1.5L+", label: "Prize Pool" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 transition-all duration-300"
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-white/60 mt-0.5 sm:mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] group"
              onClick={() =>
                window.open(
                  "https://cdn.utkarshubdt.in/Utkarsh_Rulebook.pdf",
                  "_blank"
                )
              }
            >
              <FaDownload className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce" />
              Download Brochure
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hidden sm:inline-flex border-orange-500/30 text-orange-100 hover:bg-orange-500/10 hover:border-orange-500 px-5 sm:px-7 py-5 sm:py-6 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => {
                document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Events
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;