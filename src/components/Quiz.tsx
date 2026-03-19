"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { questions } from "@/data/questions";
import { SwipeCard } from "./SwipeCard";
import { ProgressBar } from "./ProgressBar";
import { ResultScreen } from "./ResultScreen";

function calcPoints(profiles: number[]) {
  return 4 - profiles.length;
}

export function Quiz() {
  const [scores, setScores] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
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
      }, 350);
    },
    [currentIndex]
  );

  const reset = useCallback(() => {
    setScores({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    setCurrentIndex(0);
    setDone(false);
    setDirection(null);
  }, []);

  if (done) {
    return (
      <div className="w-full max-w-sm px-4">
        <ResultScreen scores={scores} onReset={reset} />
      </div>
    );
  }

  const q = questions[currentIndex];

  return (
    <div className="w-full max-w-sm px-4 flex flex-col gap-6">
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <div className="relative" style={{ height: 380 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
              rotate: direction === "left" ? -15 : direction === "right" ? 15 : 0,
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
