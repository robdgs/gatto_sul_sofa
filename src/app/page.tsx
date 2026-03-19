import { Quiz } from "@/components/Quiz";

export default function Home() {
  return (
    <main className="w-full min-h-[100dvh] flex items-center justify-center px-4 quiz-bg">
      <div className="origin-center lg:scale-90 xl:scale-[0.85]">
        <Quiz />
      </div>
    </main>
  );
}
