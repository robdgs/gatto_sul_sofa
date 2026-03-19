"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const prefersReducedMotion = useReducedMotion();
  const answeringRef = useRef(false);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetQuiz = useCallback(() => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
    answeringRef.current = false;
    setScores({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    setCurrentIndex(0);
    setDone(false);
    setDirection(null);
  }, []);

  const handleAnswer = useCallback(
    (dir: "left" | "right") => {
      if (done || answeringRef.current) return;
      const q = questions[currentIndex];
      if (!q) return;

      answeringRef.current = true;
      setDirection(dir);
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

      transitionTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= questions.length) {
            setDone(true);
            return prevIndex;
          }
          return nextIndex;
        });
        setDirection(null);
        answeringRef.current = false;
        transitionTimeoutRef.current = null;
      }, 300);
    },
    [currentIndex, done],
  );

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (done || direction) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handleAnswer("left");
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleAnswer("right");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [done, direction, handleAnswer]);

  if (done) {
    return (
      <div className="w-full max-w-sm px-4">
        <ResultScreen scores={scores} onRestart={resetQuiz} />
      </div>
    );
  }

  const q = questions[currentIndex];

  if (!q) {
    return (
      <div className="w-full max-w-sm px-4">
        <ResultScreen scores={scores} onRestart={resetQuiz} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm px-4 flex flex-col gap-3 sm:gap-4">
      <div className="w-full rounded-2xl overflow-hidden border border-white/40 shadow-lg">
        <Image
          src="/gatti/header.jpg"
          alt="Header del test dei gatti"
          width={900}
          height={420}
          className="w-full h-[7.5rem] sm:h-[8.5rem] object-cover"
          priority
        />
      </div>

      <div className="text-center px-1">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight drop-shadow-sm leading-tight">
          🐱 Scopri il tuo gatto
        </h1>
        <p className="text-xs sm:text-sm text-white/90 mt-1.5">
          Un test rapido per capire quale gatto sul sofà ti rappresenta davvero.
        </p>
        <div className="mt-2 flex items-center justify-center gap-2 text-[10px] sm:text-[11px]">
          <span className="rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-white/95">
            37 domande
          </span>
          <span className="rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-white/95">
            ~3 minuti
          </span>
        </div>
      </div>
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <div className="relative h-[45vh] min-h-[290px] max-h-[360px] sm:h-[392px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={q.id}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              x: prefersReducedMotion
                ? 0
                : direction === "left"
                  ? -300
                  : direction === "right"
                    ? 300
                    : 0,
              rotate: prefersReducedMotion
                ? 0
                : direction === "left"
                  ? -15
                  : direction === "right"
                    ? 15
                    : 0,
              scale: prefersReducedMotion ? 1 : 0.9,
            }}
            transition={{
              duration: prefersReducedMotion ? 0.15 : 0.32,
              ease: [0.4, 0, 0.2, 1],
            }}
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
