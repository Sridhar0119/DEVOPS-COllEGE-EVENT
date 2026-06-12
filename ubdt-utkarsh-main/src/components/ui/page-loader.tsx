"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface PageLoaderProps {
  showLogo?: boolean;
}

export function PageLoader({ showLogo = true }: PageLoaderProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-background to-blue-950 -z-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div 
          className="absolute w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ top: "10%", left: "5%" }}
        />
        <div 
          className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse"
          style={{ bottom: "10%", right: "5%", animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8"
      >
        {/* Logo */}
        {showLogo && (
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-40 h-40 sm:w-56 sm:h-56"
          >
            <Image
              src="/loader_logo.svg"
              alt="Utkarsh Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        )}

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
            animate={{
              width: ["0%", "80%", "100%"],
            }}
            transition={{
              duration: 2.5,
              times: [0, 0.8, 1],
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Utkarsh
          </span>
          <span className="text-white/90"> - </span>
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            2k26
          </span>
        </motion.h1>

        {/* Loading indicator */}
        <motion.div
          className="flex gap-1.5 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default PageLoader;
