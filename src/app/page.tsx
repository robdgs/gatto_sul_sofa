import { Quiz } from "@/components/Quiz";

export default function Home() {
  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-4 quiz-bg">
      <Quiz />
    </main>
  );
}
