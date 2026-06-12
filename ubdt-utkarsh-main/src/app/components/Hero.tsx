"use client";

import { Button } from "@/src/components/ui/button";
import { Spotlight } from "@/src/components/ui/spotlight";
import { TextGenerateEffect } from "@/src/components/ui/text-generate-effect";
import { PageLoader } from "@/src/components/ui/page-loader";
import { FaDownload } from "react-icons/fa6";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <PageLoader />;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-background to-blue-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      {/* Spotlight Effect - Hidden on very small screens for performance */}
      <div className="hidden sm:block">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* Animated Background Orbs - Smaller on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/30 rounded-full blur-3xl"
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
          className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/20 rounded-full blur-3xl"
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
          className="absolute w-40 sm:w-64 h-40 sm:h-64 bg-violet-500/25 rounded-full blur-3xl"
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
            <span className="text-sm sm:text-base text-white/80">Registrations are open !!!</span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-5xl lg:text-9xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Utkarsh
              </span>
              <span className="text-white/90"> - </span>
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-2 text-white/90 shadow-[0_0_24px_rgba(139,92,246,0.35)]">
                20th - 22nd February
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
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6"
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] group"
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
              className="hidden sm:inline-flex border-white/20 text-white hover:bg-white/10 px-5 sm:px-7 py-5 sm:py-6 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => {
                document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Events
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
      </motion.div>
    </section>
  );
};

export default Hero;