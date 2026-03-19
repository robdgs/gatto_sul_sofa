"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { Question } from "@/data/questions";

interface SwipeCardProps {
  question: Question;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function SwipeCard({
  question,
  onSwipeLeft,
  onSwipeRight,
}: SwipeCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const opacity = useTransform(x, [-250, 0, 250], [0, 1, 0]);

  // Stamp opacities
  const leftStampOpacity = useTransform(x, [-160, -60, 0], [1, 0, 0]);
  const rightStampOpacity = useTransform(x, [0, 60, 160], [0, 0, 1]);

  const borderColor = useTransform(x, (v) => {
    if (v < -60) return `rgba(226,75,74,${Math.min(0.6, (-v - 60) / 100)})`;
    if (v > 60) return `rgba(99,153,34,${Math.min(0.6, (v - 60) / 100)})`;
    return "rgba(0,0,0,0.08)";
  });

  function triggerSwipe(direction: "left" | "right") {
    if (direction === "left") onSwipeLeft();
    else onSwipeRight();
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center gap-2">
      {/* Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.22}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          const shouldSwipeLeft = info.offset.x < -90 || info.velocity.x < -500;
          const shouldSwipeRight = info.offset.x > 90 || info.velocity.x > 500;

          if (shouldSwipeLeft) {
            triggerSwipe("left");
          } else if (shouldSwipeRight) {
            triggerSwipe("right");
          } else {
            animate(x, 0, {
              type: "spring",
              stiffness: prefersReducedMotion ? 180 : 420,
              damping: prefersReducedMotion ? 45 : 34,
              mass: 0.7,
            });
          }
        }}
        className="absolute w-full cursor-grab active:cursor-grabbing select-none will-change-transform"
        style={{ x, rotate, opacity, touchAction: "pan-y" }}
      >
        <motion.div
          style={{ borderColor }}
          className="bg-white rounded-3xl border-2 shadow-sm p-5 sm:p-6 flex flex-col items-center justify-center text-center gap-4 min-h-[220px] sm:min-h-[260px]"
        >
          {/* Left stamp */}
          <motion.div
            style={{ opacity: leftStampOpacity }}
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full border-2 border-red-400 text-red-500 text-xs sm:text-sm font-semibold bg-red-50"
          >
            ← {question.left}
          </motion.div>

          {/* Right stamp */}
          <motion.div
            style={{ opacity: rightStampOpacity }}
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full border-2 border-green-500 text-green-600 text-xs sm:text-sm font-semibold bg-green-50"
          >
            {question.right} →
          </motion.div>

          <h2 className="text-lg sm:text-xl font-medium text-gray-900 leading-snug max-w-[260px] mt-4 sm:mt-2">
            {question.title}
          </h2>

          <p className="text-[11px] sm:text-xs text-gray-400">
            Trascina la carta o usa i pulsanti
          </p>
        </motion.div>
      </motion.div>

      {/* Choice buttons */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-2.5">
        <button
          onClick={() => triggerSwipe("left")}
          aria-label={`Scegli ${question.left}`}
          className="flex-1 group flex flex-col items-center gap-0.5 py-2.5 px-3 rounded-2xl border border-gray-200 bg-white hover:border-red-300 hover:bg-red-50 transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
        >
          <span className="text-base">←</span>
          <span className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-red-600 transition-colors">
            {question.left}
          </span>
        </button>
        <button
          onClick={() => triggerSwipe("right")}
          aria-label={`Scegli ${question.right}`}
          className="flex-1 group flex flex-col items-center gap-0.5 py-2.5 px-3 rounded-2xl border border-gray-200 bg-white hover:border-green-400 hover:bg-green-50 transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
          <span className="text-base">→</span>
          <span className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-green-700 transition-colors">
            {question.right}
          </span>
        </button>
      </div>
    </div>
  );
}
