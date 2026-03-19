import { Quiz } from "@/components/Quiz";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-12 gap-8 bg-[#f8f7f4]">
      <div className="text-center px-4">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          🐱 Scopri il tuo gatto
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          37 domande per trovare quale gatto sul sofà sei davvero
        </p>
      </div>
      <Quiz />
    </main>
  );
}
