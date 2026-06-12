"use client";

import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { IoMdConstruct } from "react-icons/io";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  // Generate stable particle data that won't change on re-renders
  const [particles] = useState(() => {
    const animationTypes = ['float', 'floatReverse', 'drift', 'gentle-bob'];
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      animationType: animationTypes[i % animationTypes.length],
      size: Math.random() * 60 + 30, // Smaller sizes for gentler movement
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 15 + 20, // Much slower: 20-35 seconds
      delay: Math.random() * 10,
    }));
  });

  const [smallParticles] = useState(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 20 + 8,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 15, // Slower: 15-25 seconds
      delay: Math.random() * 8,
    }));
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const eventDate = new Date("February 15, 2026");
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-primary/20 p-4 sm:p-6 overflow-hidden">
      {/* Smooth animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {mounted && particles.map((particle) => (
          <div 
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-br from-primary/12 to-purple-500/8 backdrop-blur-sm"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animation: `${particle.animationType} ${particle.duration}s infinite ease-in-out`,
              animationDelay: `${particle.delay}s`,
              filter: 'blur(1px)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
        
        {/* Additional floating particles for depth */}
        {mounted && smallParticles.map((particle) => (
          <div 
            key={`small-${particle.id}`}
            className="absolute rounded-full bg-white/4"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animation: `gentle-bob ${particle.duration}s infinite ease-in-out`,
              animationDelay: `${particle.delay}s`,
              filter: 'blur(2px)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400"
        >
          Coming Soon
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <IoMdConstruct className="text-yellow-400 text-xl" />
          <p className="text-yellow-400 font-semibold">Website Under Maintenance</p>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
        >
          Utkarsh 2k26 is on its way!
          <br />
          Get ready for an unforgettable experience.
          <br />
          Stay Tuned!
        </motion.p>
        
        {/* Countdown Timer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-12"
        >
          <div className="bg-black/60 backdrop-blur-lg p-4 rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(124,58,237,0.15)]">
            <div className="text-3xl md:text-4xl font-bold text-white">{timeLeft.days}</div>
            <div className="text-gray-400">Days</div>
          </div>
          <div className="bg-black/60 backdrop-blur-lg p-4 rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(124,58,237,0.15)]">
            <div className="text-3xl md:text-4xl font-bold text-white">{timeLeft.hours}</div>
            <div className="text-gray-400">Hours</div>
          </div>
          <div className="bg-black/60 backdrop-blur-lg p-4 rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(124,58,237,0.15)]">
            <div className="text-3xl md:text-4xl font-bold text-white">{timeLeft.minutes}</div>
            <div className="text-gray-400">Minutes</div>
          </div>
          <div className="bg-black/60 backdrop-blur-lg p-4 rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(124,58,237,0.15)]">
            <div className="text-3xl md:text-4xl font-bold text-white">{timeLeft.seconds}</div>
            <div className="text-gray-400">Seconds</div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mb-10"
        >
          <p className="text-xl text-gray-300 mb-6 font-medium">Stay tuned and follow our social media for updates!</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="https://instagram.com/ubdtutkarsh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-6 rounded-full transition-transform hover:scale-105 duration-300 shadow-lg"
            >
              <FaInstagram className="h-5 w-5" />
              Follow @ubdtutkarsh
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-sm text-gray-400 bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800 space-y-2"
        >
          <p className="text-lg mb-2 text-gray-200">For inquiries, please contact:</p>
          <p className="mt-2">
            <span className="font-medium text-gray-300">Vinay N</span> - <Link href="tel:+919008980114" className="text-primary hover:underline">+91 9008980114</Link>
          </p>
          <p>
            <span className="font-medium text-gray-300">Shravan MS</span> - <Link href="tel:+917483855961" className="text-primary hover:underline">+91 7483855961</Link>
          </p>
          <p className="mt-4 text-gray-500">Address: Hadadi Road, Post Box No. 304, Davangere-577004, Karnataka</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
