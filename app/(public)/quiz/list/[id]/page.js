"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { db } from '@/app/lib/firebase/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export default function QuizPage({ params }) {
  const { id } = params;
  const auth = getAuth();
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizDoc = await getDoc(doc(db, "quizzes", id));
        if (quizDoc.exists()) {
          setQuiz(quizDoc.data());
          const questionsSnapshot = await getDocs(collection(db, "quizzes", id, "questions"));
          const questionsData = questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setQuestions(questionsData);
        } else {
          setError("Quiz not found.");
        }
      } catch (error) {
        setError("Error fetching quiz.");
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleMultipleChoiceChange = (questionId, option) => {
    setAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionId] || [];
      if (currentAnswers.includes(option)) {
        return {
          ...prevAnswers,
          [questionId]: currentAnswers.filter((answer) => answer !== option),
        };
      } else {
        return {
          ...prevAnswers,
          [questionId]: [...currentAnswers, option],
        };
      }
    });
  };

  const handlePairChange = (questionId, pairIndex, value) => {
    setAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionId] || [];
      currentAnswers[pairIndex] = value;
      return {
        ...prevAnswers,
        [questionId]: currentAnswers,
      };
    });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (question.type === "single" || question.type === "list") {
        if (question.correctAnswer && userAnswer === question.correctAnswer) {
          correctCount++;
        }
      } else if (question.type === "multiple") {
        if (
          Array.isArray(userAnswer) &&
          userAnswer.length === question.correctAnswer.length &&
          userAnswer.every((val) => question.correctAnswer.includes(val))
        ) {
          correctCount++;
        }
      } else if (question.type === "matching") {
        if (
          Array.isArray(userAnswer) &&
          userAnswer.length === question.correctAnswer.length &&
          userAnswer.every((val, index) => val === question.correctAnswer[index])
        ) {
          correctCount++;
        }
      }
    });
    alert(`You got ${correctCount} out of ${questions.length} correct!`);
  };

  if (!quiz) {
    return <p>Loading...</p>;
  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center p-8 sm:p-12 lg:col-span-12">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{quiz.title}</h1>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            <ul className="mt-8 space-y-4">
              {questions.map((question) => (
                <li key={question.id} className="border p-4 rounded-md shadow-sm">
                  <h2 className="text-xl font-bold">{question.question}</h2>
                  {question.type === "single" && (
                    <div>
                      {question.options.map((option, index) => (
                        <label
                          key={index}
                          htmlFor={`${question.id}-${index}`}
                          className="flex items-center cursor-pointer select-none text-dark dark:text-white"
                        >
                          <input
                            type="radio"
                            className="hidden"
                            id={`${question.id}-${index}`}
                            name={question.id}
                            value={option.text}
                            checked={answers[question.id] === option.text}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          />
                          <div className="flex items-center justify-center w-5 h-5 mr-4 border border-stroke dark:border-dark-3 rounded-full">
                            <span className={`dot h-[10px] w-[10px] rounded-full ${answers[question.id] === option.text ? 'bg-indigo-600' : 'bg-transparent'}`}></span>
                          </div>
                          {option.text}
                        </label>
                      ))}
                    </div>
                  )}
                  {question.type === "multiple" && (
                    <div>
                      {question.options.map((option, index) => (
                        <label
                          key={index}
                          htmlFor={`${question.id}-${index}`}
                          className="flex items-center cursor-pointer select-none text-dark dark:text-white"
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            id={`${question.id}-${index}`}
                            name={question.id}
                            value={option.text}
                            checked={answers[question.id]?.includes(option.text)}
                            onChange={() => handleMultipleChoiceChange(question.id, option.text)}
                          />
                          <div className="flex items-center justify-center w-5 h-5 mr-4 border border-stroke dark:border-dark-3 rounded box">
                            <span className={`dot h-[10px] w-[10px] rounded-sm ${answers[question.id]?.includes(option.text) ? 'bg-indigo-600' : 'bg-transparent'}`}></span>
                          </div>
                          {option.text}
                        </label>
                      ))}
                    </div>
                  )}
                  {question.type === "list" && (
                    <div>
                      <select
                        id={question.id}
                        name={question.id}
                        value={answers[question.id] || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        class="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
                      >
                        <option value="" disabled>Select an option</option>
                        {question.options.map((option, index) => (
                          <option class="dark:bg-dark-2" key={index} value={option.text}>{option.text}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {question.type === "matching" && (
                    <div>
                      {question.options.map((option, index) => (
                        <div key={index}>
                          <label>{option.pair1}</label>
                          <select
                            id={`${question.id}-${index}`}
                            name={`${question.id}-${index}`}
                            class="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
                            value={answers[question.id]?.[index] || ""}
                            onChange={(e) => handlePairChange(question.id, index, e.target.value)}
                          >
                            <option value="" class="dark:bg-dark-2" disabled>Select a match</option>
                            {option.pair2Options.map((pairOption, pairIndex) => (
                              <option class="dark:bg-dark-2" key={pairIndex} value={pairOption}>{pairOption}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <button onClick={handleSubmit} class="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden">
              Submit
            </button>
          </div>
        </main>
      </div>
    </section>
  );
}