"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { catProfiles, CatProfile } from "@/data/questions";

interface ResultScreenProps {
  scores: Record<number, number>;
  onRestart: () => void;
}

export function ResultScreen({ scores, onRestart }: ResultScreenProps) {
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const winnerId = Number(
    Object.keys(scores).reduce((a, b) =>
      scores[Number(a)] > scores[Number(b)] ? a : b,
    ),
  );
  const winner: CatProfile = catProfiles[winnerId];

  const allCats = Object.values(catProfiles);
  const minScore = Math.min(...Object.values(scores));
  const adjustedScores = Object.fromEntries(
    allCats.map((cat) => [cat.id, scores[cat.id] - minScore + 1]),
  ) as Record<number, number>;
  const adjustedTotal = Object.values(adjustedScores).reduce(
    (total, value) => total + value,
    0,
  );
  const rawPercentages = allCats.map((cat) => ({
    id: cat.id,
    raw: (adjustedScores[cat.id] / adjustedTotal) * 100,
  }));
  const floored = rawPercentages.map((entry) => ({
    id: entry.id,
    pct: Math.floor(entry.raw),
    remainder: entry.raw - Math.floor(entry.raw),
  }));
  let remaining = 100 - floored.reduce((total, entry) => total + entry.pct, 0);

  floored
    .sort((a, b) => b.remainder - a.remainder)
    .forEach((entry) => {
      if (remaining <= 0) return;
      entry.pct += 1;
      remaining -= 1;
    });

  const percentages = Object.fromEntries(
    floored.map((entry) => [entry.id, entry.pct]),
  ) as Record<number, number>;

  const imageCropByCat: Record<
    number,
    { scale: number; objectPosition: string }
  > = {
    1: { scale: 1.42, objectPosition: "57% 50%" },
    2: { scale: 1.48, objectPosition: "51% 46%" },
    3: { scale: 1.42, objectPosition: "50% 45%" },
    4: { scale: 1.5, objectPosition: "50% 48%" },
    5: { scale: 1.56, objectPosition: "50% 43%" },
  };

  const winnerCrop = imageCropByCat[winnerId] ?? {
    scale: 1.45,
    objectPosition: "50% 50%",
  };

  async function handleShare() {
    const text = `Io sono ${winner.name} (${winner.breed}) nel quiz dei gatti 🐱. E tu?`;
    const url = typeof window !== "undefined" ? window.location.href : "";

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Scopri il tuo gatto",
          text,
          url,
        });
        setShareStatus("Risultato condiviso ✅");
        return;
      }

      await navigator.clipboard.writeText(`${text} ${url}`.trim());
      setShareStatus("Link copiato negli appunti ✅");
    } catch {
      setShareStatus("Condivisione non disponibile su questo dispositivo");
    }
  }

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
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="w-36 h-36 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-white"
        >
          <Image
            src={winner.image}
            alt={`Foto di ${winner.name}`}
            width={144}
            height={144}
            className="w-full h-full object-cover"
            style={{
              objectPosition: winnerCrop.objectPosition,
              transform: `scale(${winnerCrop.scale})`,
            }}
            priority
          />
        </motion.div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Sei {winner.name}!
          </h2>
          <p className="text-sm text-violet-500 font-medium mt-1">
            {winner.breed}
          </p>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          {winner.profile}
        </p>
        <div className="w-full border-t border-gray-100 pt-4 mt-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Serie consigliate
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{winner.tv}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onRestart}
          className="rounded-2xl border border-white/30 bg-white/15 px-4 py-3 text-sm font-medium text-white hover:bg-white/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          Rifai il test
        </button>
        <button
          onClick={handleShare}
          className="rounded-2xl border border-[#13e6cd] bg-[#13e6cd] px-4 py-3 text-sm font-medium text-[#230b28] hover:bg-[#10c9b3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13e6cd] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          Condividi risultato
        </button>
      </div>
      {shareStatus ? (
        <p className="text-center text-xs text-white/85" aria-live="polite">
          {shareStatus}
        </p>
      ) : null}

      {/* Percent breakdown */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Percentuali
        </h3>
        {allCats
          .sort((a, b) => scores[b.id] - scores[a.id])
          .map((cat, i) => {
            const pct = percentages[cat.id];
            const w = Math.max(4, pct);
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
                <span
                  className={`text-sm w-24 truncate ${isWinner ? "font-semibold text-gray-900" : "text-gray-500"}`}
                >
                  {cat.name}
                </span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${w}%` }}
                    transition={{
                      delay: 0.5 + i * 0.07,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className={`h-full rounded-full ${isWinner ? "bg-violet-500" : "bg-gray-300"}`}
                  />
                </div>
                <span className="text-xs text-gray-400 w-6 text-right font-mono">
                  {pct}%
                </span>
              </motion.div>
            );
          })}
      </div>
    </motion.div>
  );
}
