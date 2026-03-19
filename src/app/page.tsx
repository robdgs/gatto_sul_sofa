import { Quiz } from "@/components/Quiz";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-10 px-4 quiz-bg">
      <Quiz />
    </main>
  );
}
