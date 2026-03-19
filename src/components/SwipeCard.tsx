"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef } from "react";
import { Question } from "@/data/questions";

interface SwipeCardProps {
  question: Question;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function SwipeCard({ question, onSwipeLeft, onSwipeRight }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const opacity = useTransform(x, [-250, 0, 250], [0, 1, 0]);

  // Stamp opacities
  const leftStampOpacity = useTransform(x, [-160, -60, 0], [1, 0, 0]);
  const rightStampOpacity = useTransform(x, [0, 60, 160], [0, 0, 1]);
  const leftBorderColor = useTransform(x, [-160, -60, 0], ["rgba(226,75,74,0.6)", "rgba(226,75,74,0)", "rgba(226,75,74,0)"]);
  const rightBorderColor = useTransform(x, [0, 60, 160], ["rgba(99,153,34,0)", "rgba(99,153,34,0)", "rgba(99,153,34,0.6)"]);

  const borderColor = useTransform(
    x,
    (v) => {
      if (v < -60) return `rgba(226,75,74,${Math.min(0.6, (-v - 60) / 100)})`;
      if (v > 60) return `rgba(99,153,34,${Math.min(0.6, (v - 60) / 100)})`;
      return "rgba(0,0,0,0.08)";
    }
  );

  const isDragging = useRef(false);

  async function triggerSwipe(direction: "left" | "right") {
    const target = direction === "left" ? -500 : 500;
    await animate(x, target, { duration: 0.3, ease: [0.4, 0, 0.2, 1] });
    if (direction === "left") onSwipeLeft();
    else onSwipeRight();
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center gap-4">
      {/* Card */}
      <motion.div
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
        onDragStart={() => { isDragging.current = true; }}
        onDragEnd={(_, info) => {
          isDragging.current = false;
          if (info.offset.x < -100) {
            triggerSwipe("left");
          } else if (info.offset.x > 100) {
            triggerSwipe("right");
          } else {
            animate(x, 0, { type: "spring", stiffness: 300, damping: 28 });
          }
        }}
        className="absolute w-full cursor-grab active:cursor-grabbing select-none"
        style={{ x, rotate, opacity, touchAction: "none" } as any}
      >
        <motion.div
          style={{ borderColor }}
          className="bg-white rounded-3xl border-2 shadow-sm p-8 flex flex-col items-center justify-center text-center gap-6 min-h-[280px]"
        >
          {/* Left stamp */}
          <motion.div
            style={{ opacity: leftStampOpacity }}
            className="absolute top-5 left-5 px-3 py-1 rounded-full border-2 border-red-400 text-red-500 text-sm font-semibold bg-red-50"
          >
            ← {question.left}
          </motion.div>

          {/* Right stamp */}
          <motion.div
            style={{ opacity: rightStampOpacity }}
            className="absolute top-5 right-5 px-3 py-1 rounded-full border-2 border-green-500 text-green-600 text-sm font-semibold bg-green-50"
          >
            {question.right} →
          </motion.div>

          <h2 className="text-xl font-medium text-gray-900 leading-snug max-w-[260px]">
            {question.title}
          </h2>

          <p className="text-xs text-gray-400">Trascina la carta o usa i pulsanti</p>
        </motion.div>
      </motion.div>

      {/* Choice buttons */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-3">
        <button
          onClick={() => triggerSwipe("left")}
          className="flex-1 group flex flex-col items-center gap-1 py-3 px-4 rounded-2xl border border-gray-200 bg-white hover:border-red-300 hover:bg-red-50 transition-all duration-150 active:scale-95"
        >
          <span className="text-lg">←</span>
          <span className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition-colors">{question.left}</span>
        </button>
        <button
          onClick={() => triggerSwipe("right")}
          className="flex-1 group flex flex-col items-center gap-1 py-3 px-4 rounded-2xl border border-gray-200 bg-white hover:border-green-400 hover:bg-green-50 transition-all duration-150 active:scale-95"
        >
          <span className="text-lg">→</span>
          <span className="text-sm font-medium text-gray-800 group-hover:text-green-700 transition-colors">{question.right}</span>
        </button>
      </div>
    </div>
  );
}
