import Image from "next/image";
import LineChart from "./LineChart";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            This is a web application for creating quizzes.
          </li>
          <li>Start by logging in/registering, or try one of the pre-made quizzes.</li>
        </ol>
        <LineChart 
          data={[1, 5, 2, 4, 3, 8, 7, 9, 3, 5, 7, 6]} 
          stroke="gray" 
          background="white"
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
