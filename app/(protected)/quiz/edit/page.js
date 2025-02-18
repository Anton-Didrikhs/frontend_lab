"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { db } from '@/app/lib/firebase/firebase';
import { collection, getDocs, query, where, deleteDoc, doc, writeBatch } from 'firebase/firestore';

export default function EditQuizList() {
  const auth = getAuth();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      const user = auth.currentUser;
      if (!user) {
        setError("You must be logged in to view your quizzes.");
        return;
      }

      try {
        const q = query(collection(db, "quizzes"), where("creatorId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuizzes(quizzesData);
      } catch (error) {
        setError("Error fetching quizzes.");
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [auth]);

  const deleteQuiz = async (quizId) => {
    try {
      const batch = writeBatch(db);
      const quizRef = doc(db, "quizzes", quizId);
      const questionsRef = collection(db, "quizzes", quizId, "questions");

      const questionsSnapshot = await getDocs(questionsRef);
      questionsSnapshot.forEach((questionDoc) => {
        batch.delete(questionDoc.ref);
      });

      batch.delete(quizRef);
      await batch.commit();

      setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
    } catch (error) {
      setError("Error deleting quiz.");
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center p-8 sm:p-12 lg:col-span-12">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Your Quizzes</h1>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            <ul className="mt-8 space-y-4">
              {quizzes.map((quiz) => (
                <li key={quiz.id} className="border p-4 rounded-md shadow-sm">
                  <h2 className="text-xl font-bold">{quiz.title}</h2>
                  <button
                    onClick={() => router.push(`/quiz/edit/${quiz.id}`)}
                    class="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
                  >
                    Edit Quiz
                  </button>
                  <button
                    onClick={() => deleteQuiz(quiz.id)}
                    class="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
                  >
                    Delete Quiz
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