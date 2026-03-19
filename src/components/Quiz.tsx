"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { questions } from "@/data/questions";
import { SwipeCard } from "./SwipeCard";
import { ProgressBar } from "./ProgressBar";
import { ResultScreen } from "./ResultScreen";

function calcPoints(profiles: number[]) {
  return 4 - profiles.length;
}

export function Quiz() {
  const [scores, setScores] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const handleAnswer = useCallback(
    (dir: "left" | "right") => {
      setDirection(dir);
      const q = questions[currentIndex];
      const chosen = dir === "left" ? q.leftProfiles : q.rightProfiles;
      const rejected = dir === "left" ? q.rightProfiles : q.leftProfiles;
      const add = calcPoints(chosen);
      const sub = calcPoints(rejected);

      setScores((prev) => {
        const next = { ...prev };
        chosen.forEach((p) => (next[p] += add));
        rejected.forEach((p) => (next[p] -= sub));
        return next;
      });

      setTimeout(() => {
        if (currentIndex + 1 >= questions.length) {
          setDone(true);
        } else {
          setCurrentIndex((i) => i + 1);
        }
        setDirection(null);
      }, 300);
    },
    [currentIndex],
  );

  if (done) {
    return (
      <div className="w-full max-w-sm px-4">
        <ResultScreen scores={scores} />
      </div>
    );
  }

  const q = questions[currentIndex];

  return (
    <div className="w-full max-w-sm px-4 flex flex-col gap-6">
      <div className="w-full rounded-3xl overflow-hidden border border-white/40 shadow-lg">
        <Image
          src="/gatti/header.jpg"
          alt="Header del test dei gatti"
          width={900}
          height={420}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* <div className="text-center px-2">
         <h1 className="text-3xl font-semibold text-white tracking-tight drop-shadow-sm">
          🐱 Scopri il tuo gatto
        </h1>
        <p className="text-sm text-white/85 mt-2">
          37 domande per trovare quale gatto sul sofà sei davvero
        </p>
      </div>
*/}
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <div className="relative" style={{ height: 392 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={q.id}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
              rotate:
                direction === "left" ? -15 : direction === "right" ? 15 : 0,
              scale: 0.9,
            }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          >
            <SwipeCard
              question={q}
              onSwipeLeft={() => handleAnswer("left")}
              onSwipeRight={() => handleAnswer("right")}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
