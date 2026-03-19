"use client";

import { motion } from "framer-motion";
import { catProfiles, CatProfile } from "@/data/questions";

interface ResultScreenProps {
  scores: Record<number, number>;
  onReset: () => void;
}

export function ResultScreen({ scores, onReset }: ResultScreenProps) {
  const winnerId = Number(
    Object.keys(scores).reduce((a, b) => (scores[Number(a)] > scores[Number(b)] ? a : b))
  );
  const winner: CatProfile = catProfiles[winnerId];

  const allCats = Object.values(catProfiles);
  const maxScore = Math.max(...Object.values(scores));
  const minScore = Math.min(...Object.values(scores));
  const range = maxScore - minScore || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-sm flex flex-col gap-6"
    >
      {/* Winner card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center flex flex-col items-center gap-3">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          className="text-6xl"
        >
          {winner.emoji}
        </motion.div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Sei {winner.name}!</h2>
          <p className="text-sm text-violet-500 font-medium mt-1">{winner.breed}</p>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{winner.profile}</p>
        <div className="w-full border-t border-gray-100 pt-4 mt-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Serie consigliate</p>
          <p className="text-sm text-gray-700 leading-relaxed">{winner.tv}</p>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Classifica</h3>
        {allCats
          .sort((a, b) => scores[b.id] - scores[a.id])
          .map((cat, i) => {
            const score = scores[cat.id];
            const w = Math.max(4, Math.round(((score - minScore) / range) * 100));
            const isWinner = cat.id === winnerId;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="flex items-center gap-3"
              >
                <span className="text-lg w-6 text-center">{cat.emoji}</span>
                <span className={`text-sm w-24 truncate ${isWinner ? "font-semibold text-gray-900" : "text-gray-500"}`}>
                  {cat.name}
                </span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${w}%` }}
                    transition={{ delay: 0.5 + i * 0.07, duration: 0.6, ease: "easeOut" }}
                    className={`h-full rounded-full ${isWinner ? "bg-violet-500" : "bg-gray-300"}`}
                  />
                </div>
                <span className="text-xs text-gray-400 w-6 text-right font-mono">{score}</span>
              </motion.div>
            );
          })}
      </div>

      <button
        onClick={onReset}
        className="w-full py-3 rounded-2xl border border-gray-200 bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all duration-150"
      >
        Rifai il test
      </button>
    </motion.div>
  );
}
