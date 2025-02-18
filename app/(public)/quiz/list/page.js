"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { db } from '@/app/lib/firebase/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export default function QuizList() {
  const auth = getAuth();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        const quizzesData = [];
        for (const quizDoc of querySnapshot.docs) {
          const quizData = quizDoc.data();
          const userDoc = await getDoc(doc(db, "users", quizData.creatorId));
          const userData = userDoc.exists() ? userDoc.data() : { displayName: "Unknown" };
          quizzesData.push({ id: quizDoc.id, ...quizData, authorName: userData.displayName });
        }
        setQuizzes(quizzesData);
      } catch (error) {
        setError("Error fetching quizzes.");
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center p-8 sm:p-12 lg:col-span-12">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Quiz List</h1>
            <div className="flex space-x-4 mt-4 mb-8">
              <button
                onClick={() => router.push('/quiz/create')}
                class="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
              >
                Create New Quiz
              </button>
              <button
                onClick={() => router.push('/quiz/edit')}
                class="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
              >
                Edit Quizzes
              </button>
            </div>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            <ul className="mt-8 space-y-4">
              {quizzes.map((quiz) => (
                <li key={quiz.id} className="border p-4 rounded-md shadow-sm">
                  <h2 className="text-xl font-bold">{quiz.title}</h2>
                  <p className="text-gray-700">Author: {quiz.authorName}</p>
                  <button
                    onClick={() => router.push(`/quiz/list/${quiz.id}`)}
                    class="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
                  >
                    Go to Quiz
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </section>
  );
}