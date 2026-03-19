import { Quiz } from "@/components/Quiz";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-4 sm:py-8 px-4 quiz-bg">
      <Quiz />
    </main>
  );
}
