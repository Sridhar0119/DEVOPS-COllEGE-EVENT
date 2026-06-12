"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";

interface CardData {
  id: number;
  src: string;
  alt: string;
}

interface CardStackProps {
  cards: CardData[];
}

const CardStack = ({ cards: initialCards }: CardStackProps) => {
  const [cards, setCards] = useState(initialCards);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  const removeCard = (direction: "left" | "right") => {
    setExitDirection(direction);
    setTimeout(() => {
      setCards((prev) => {
        const [removed, ...rest] = prev;
        return [...rest, removed]; // Move to back of deck
      });
      setExitDirection(null);
    }, 300);
  };

  return (
    <div className="relative w-full max-w-[320px] h-[400px] mx-auto">
      {cards.slice(0, 5).map((card, index) => (
        <SwipeCard
          key={`${card.id}-${index}`}
          card={card}
          index={index}
          totalCards={Math.min(cards.length, 5)}
          removeCard={removeCard}
          isTop={index === 0}
        />
      ))}
    </div>
  );
};

interface SwipeCardProps {
  card: CardData;
  index: number;
  totalCards: number;
  removeCard: (direction: "left" | "right") => void;
  isTop: boolean;
}

const SwipeCard = ({ card, index, totalCards, removeCard, isTop }: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-25, 0, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  // Calculate position for stacked effect
  const yOffset = index * 8;
  const scale = 1 - index * 0.05;
  const rotateOffset = index * 3;

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      removeCard("right");
    } else if (info.offset.x < -threshold) {
      removeCard("left");
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : rotateOffset,
        opacity: isTop ? opacity : 1 - index * 0.1,
        zIndex: totalCards - index,
      }}
      initial={{
        y: yOffset,
        scale: scale,
        rotate: rotateOffset,
      }}
      animate={{
        y: yOffset,
        scale: scale,
        rotate: isTop ? 0 : rotateOffset,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
      whileDrag={{ cursor: "grabbing" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-card">
        <Image
          src={card.src}
          alt={card.alt}
          fill
          className="object-cover"
          sizes="320px"
          draggable={false}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Card title */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-white text-xl font-bold">{card.alt}</p>
        </div>

        {/* Swipe indicators (only on top card) */}
        {isTop && (
          <>
            <motion.div
              className="absolute top-6 left-6 px-4 py-2 rounded-full bg-red-500/80 text-white font-bold border-2 border-red-300"
              style={{
                opacity: useTransform(x, [-100, 0], [1, 0]),
              }}
            >
              ←
            </motion.div>
            <motion.div
              className="absolute top-6 right-6 px-4 py-2 rounded-full bg-green-500/80 text-white font-bold border-2 border-green-300"
              style={{
                opacity: useTransform(x, [0, 100], [0, 1]),
              }}
            >
              →
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CardStack;
