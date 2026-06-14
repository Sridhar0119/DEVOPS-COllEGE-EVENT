"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

// Default gallery images - replace with actual images from /public/images/gallery/
// For now using placeholder images from picsum
const defaultImages: GalleryImage[] = [
  { id: 1, src: "https://cdn.utkarshubdt.in/gallery/image1.JPG", alt: "Highlight 1" },
  { id: 2, src: "https://cdn.utkarshubdt.in/gallery/image2.JPG", alt: "Highlight 2" },
  { id: 3, src: "https://cdn.utkarshubdt.in/gallery/image3.JPG", alt: "Highlight 3" },
  { id: 4, src: "https://cdn.utkarshubdt.in/gallery/image4.jpeg", alt: "Highlight 4" },
  { id: 5, src: "https://cdn.utkarshubdt.in/gallery/image5.JPG", alt: "Highlight 5" },
  { id: 6, src: "https://cdn.utkarshubdt.in/gallery/image6.jpeg", alt: "Highlight 6" },
  { id: 7, src: "https://cdn.utkarshubdt.in/gallery/image7.JPG", alt: "Highlight 7" },
  { id: 8, src: "https://cdn.utkarshubdt.in/gallery/image8.jpeg", alt: "Highlight 8" },
  { id: 9, src: "https://cdn.utkarshubdt.in/gallery/image9.jpeg", alt: "Highlight 9" },
  { id: 10, src: "https://cdn.utkarshubdt.in/gallery/image10.JPG", alt: "Highlight 10" },
];

interface GalleryProps {
  images?: GalleryImage[];
}

// Tinder-style Card Stack for Mobile
const MobileCardStack = ({ images }: { images: GalleryImage[] }) => {
  const [cards, setCards] = useState(images);

  const removeCard = (direction: "left" | "right") => {
    setCards((prev) => {
      const [removed, ...rest] = prev;
      return [...rest, removed]; // Move to back of deck
    });
  };

  return (
    <div className="relative w-full max-w-[300px] sm:max-w-[340px] h-[380px] sm:h-[420px] mx-auto">
      {cards.slice(0, 5).map((card, index) => (
        <SwipeCard
          key={`${card.id}-${cards.indexOf(card)}`}
          card={card}
          index={index}
          totalCards={Math.min(cards.length, 5)}
          removeCard={removeCard}
          isTop={index === 0}
        />
      ))}
      <p className="absolute -bottom-10 left-0 right-0 text-center text-sm text-muted-foreground">
        Swipe cards to explore more
      </p>
    </div>
  );
};

interface SwipeCardProps {
  card: GalleryImage;
  index: number;
  totalCards: number;
  removeCard: (direction: "left" | "right") => void;
  isTop: boolean;
}

const SwipeCard = ({ card, index, totalCards, removeCard, isTop }: SwipeCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-25, 0, 25]);
  const opacity = useTransform(
    [x, y],
    ([latestX, latestY]: number[]) => {
      const distance = Math.sqrt(latestX * latestX + latestY * latestY);
      return Math.max(0.5, 1 - distance / 400);
    }
  );

  // Calculate position for stacked effect
  const yOffset = index * 10;
  const scale = 1 - index * 0.05;
  const rotateOffset = (index % 2 === 0 ? 1 : -1) * (index * 2);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 80;
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    
    if (distance > threshold) {
      // Card was swiped in some direction - move to back of deck
      removeCard(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
      style={{
        x: isTop ? x : 0,
        y: isTop ? y : yOffset,
        rotate: isTop ? rotate : rotateOffset,
        opacity: isTop ? opacity : 1 - index * 0.15,
        zIndex: totalCards - index,
      }}
      initial={{
        y: yOffset,
        scale: scale,
        rotate: rotateOffset,
      }}
      animate={{
        y: isTop ? 0 : yOffset,
        scale: scale,
        rotate: isTop ? 0 : rotateOffset,
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={isTop ? handleDragEnd : undefined}
      whileDrag={{ cursor: "grabbing" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-500/20 bg-card">
        <Image
          src={card.src}
          alt={card.alt}
          fill
          className="object-cover"
          sizes="340px"
          draggable={false}
          priority={index === 0}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBQYhEhMiMVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AKO3tzXemTLJJFC0gVlBVDg+J4IPzkHkUpQJTtjvAEWc7P/Z"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Card title */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white text-lg font-bold">{card.alt}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Desktop expanding cards gallery
const DesktopGallery = ({ images }: { images: GalleryImage[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-center gap-2 lg:gap-4 px-4 py-8">
        {images.map((image, index) => {
          const isHovered = hoveredIndex === index;
          const isAnyHovered = hoveredIndex !== null;
          
          return (
            <motion.div
              key={image.id}
              className="relative cursor-pointer flex-shrink-0"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                width: isHovered ? 400 : isAnyHovered ? 60 : 100,
                opacity: isAnyHovered && !isHovered ? 0.7 : 1,
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                height: "380px",
              }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-orange-500/10 hover:border-amber-500/50 hover:shadow-[0_8px_30px_rgba(245,158,11,0.25)] shadow-lg transition-all duration-300">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500"
                  sizes="(max-width: 1024px) 100px, 400px"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBQYhEhMiMVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AKO3tzXemTLJJFC0gVlBVDg+J4IPzkHkUpQJTtjvAEWc7P/Z"
                />
                
                {/* Overlay with title on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6"
                    >
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        className="text-white text-xl font-semibold"
                      >
                        {image.alt}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
};

const Gallery = ({ images = defaultImages }: GalleryProps) => {
  return (
    <section id="highlights" className="py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#0d0213] to-[#14031d] scroll-mt-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              Event Highlights
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            Relive the best moments of energy, creativity, and competition from previous fests.
          </p>
        </motion.div>
      </div>

      {/* Desktop Gallery - Hidden on mobile/tablet */}
      <div className="hidden lg:block">
        <DesktopGallery images={images} />
      </div>

      {/* Mobile Card Stack - Tinder style */}
      <div className="lg:hidden px-4 pb-12">
        <MobileCardStack images={images} />
      </div>
    </section>
  );
};

export default Gallery;
