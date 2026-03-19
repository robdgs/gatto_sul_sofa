"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);
  const remaining = Math.max(total - current, 0);

  const remainingLabel =
    remaining === 0
      ? "Ultima domanda"
      : remaining === 1
        ? "Manca 1 domanda"
        : `Mancano ${remaining} domande`;

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div
        className="flex justify-between text-xs text-gray-100/90 font-mono"
        aria-live="polite"
      >
        <span>
          Domanda {current} di {total}
        </span>
        <span>{pct}%</span>
      </div>
      <p className="text-[11px] text-white/80">{remainingLabel}</p>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
