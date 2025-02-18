"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { db } from '@/app/lib/firebase/firebase';
import { collection, addDoc, doc, writeBatch } from 'firebase/firestore';

export default function CreateQuizPage() {
  const auth = getAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const user = auth.currentUser;

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: [], type: "single", correctAnswer: "" }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const handleMultipleCorrectAnswerChange = (questionIndex, option) => {
    const newQuestions = [...questions];
    const correctAnswers = newQuestions[questionIndex].correctAnswer || [];
    if (correctAnswers.includes(option)) {
      newQuestions[questionIndex].correctAnswer = correctAnswers.filter((answer) => answer !== option);
    } else {
      newQuestions[questionIndex].correctAnswer = [...correctAnswers, option];
    }
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].type === "matching") {
      newQuestions[questionIndex].options.push({ pair1: "", pair2Options: [] });
      newQuestions[questionIndex].correctAnswer = newQuestions[questionIndex].correctAnswer || [];
    } else {
      newQuestions[questionIndex].options.push({ text: "" });
    }
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const addPairOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex].pair2Options.push("");
    setQuestions(newQuestions);
  };

  const handlePairOptionChange = (questionIndex, optionIndex, pairIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex].pair2Options[pairIndex] = value;
    setQuestions(newQuestions);
  };

  const handleMatchingCorrectAnswerChange = (questionIndex, pairIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer[pairIndex] = value;
    setQuestions(newQuestions);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const quizRef = await addDoc(collection(db, "quizzes"), {
        title,
        creatorId: user.uid,
      });

      const batch = writeBatch(db);
      questions.forEach((question) => {
        const questionRef = doc(collection(db, "quizzes", quizRef.id, "questions"));
        batch.set(questionRef, question);
      });

      await batch.commit();
      console.log("Questions added successfully");

      router.push("/");
    } catch (error) {
      setError(error.message);
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center p-8 sm:p-12 lg:col-span-12">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Create Quiz</h1>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            <form onSubmit={onSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Quiz Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {questions.map((question, qIndex) => (
                <div key={qIndex} className="border p-4 rounded-md shadow-sm">
                  <label className="block text-sm font-medium text-gray-700">
                    Question
                  </label>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    Type
                  </label>
                  <select
                    value={question.type}
                    onChange={(e) => handleQuestionChange(qIndex, "type", e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="single">Single Choice</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="list">List</option>
                    <option value="matching">Matching</option>
                  </select>
                  {question.type === "matching" ? (
                    question.options.map((option, oIndex) => (
                      <div key={oIndex} className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Pair 1
                        </label>
                        <input
                          type="text"
                          value={option.pair1}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, "pair1", e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-2">
                          Pair 2 Options
                        </label>
                        {option.pair2Options.map((pairOption, pIndex) => (
                          <input
                            key={pIndex}
                            type="text"
                            value={pairOption}
                            onChange={(e) => handlePairOptionChange(qIndex, oIndex, pIndex, e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        ))}
                        <button
                          type="button"
                          onClick={() => addPairOption(qIndex, oIndex)}
                          className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
                        >
                          Add Pair Option
                        </button>
                      </div>
                    ))
                  ) : (
                    question.options.map((option, oIndex) => (
                      <div key={oIndex} className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Option
                        </label>
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, "text", e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(qIndex, oIndex)}
                          className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
                        >
                          Remove Option
                        </button>
                      </div>
                    ))
                  )}
                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    Correct Answer
                  </label>
                  {question.type === "single" || question.type === "list" ? (
                    question.options.map((option, oIndex) => (
                      <label
                        key={oIndex}
                        htmlFor={`correct-${qIndex}-${oIndex}`}
                        className="flex items-center cursor-pointer select-none text-dark dark:text-white"
                      >
                        <input
                          type="radio"
                          className="hidden"
                          id={`correct-${qIndex}-${oIndex}`}
                          name={`correct-${qIndex}`}
                          value={option.text}
                          checked={question.correctAnswer === option.text}
                          onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                        />
                        <div className="flex items-center justify-center w-5 h-5 mr-4 border border-stroke dark:border-dark-3 rounded-full">
                          <span className={`dot h-[10px] w-[10px] rounded-full ${question.correctAnswer === option.text ? 'bg-indigo-600' : 'bg-transparent'}`}></span>
                        </div>
                        {option.text}
                      </label>
                    ))
                  ) : question.type === "multiple" ? (
                    question.options.map((option, oIndex) => (
                      <label
                        key={oIndex}
                        htmlFor={`correct-${qIndex}-${oIndex}`}
                        className="flex items-center cursor-pointer select-none text-dark dark:text-white"
                      >
                        <input
                          type="checkbox"
                          className="hidden"
                          id={`correct-${qIndex}-${oIndex}`}
                          name={`correct-${qIndex}`}
                          value={option.text}
                          checked={question.correctAnswer?.includes(option.text)}
                          onChange={() => handleMultipleCorrectAnswerChange(qIndex, option.text)}
                        />
                        <div className="flex items-center justify-center w-5 h-5 mr-4 border border-stroke dark:border-dark-3 rounded box">
                          <span className={`dot h-[10px] w-[10px] rounded-sm ${question.correctAnswer?.includes(option.text) ? 'bg-indigo-600' : 'bg-transparent'}`}></span>
                        </div>
                        {option.text}
                      </label>
                    ))
                  ) : question.type === "matching" ? (
                    question.options.map((option, oIndex) => (
                      <div key={oIndex} className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Correct Pair for {option.pair1}
                        </label>
                        <select
                          value={question.correctAnswer[oIndex] || ""}
                          onChange={(e) => handleMatchingCorrectAnswerChange(qIndex, oIndex, e.target.value)}
                          className="relative z-20 w-full appearance-none rounded-lg border border-stroke dark:border-dark-3 bg-transparent py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
                        >
                          <option value="" className="dark:bg-dark-2" disabled>Select a match</option>
                          {option.pair2Options.map((pairOption, pIndex) => (
                            <option className="dark:bg-dark-2" key={pIndex} value={pairOption}>{pairOption}</option>
                          ))}
                        </select>
                      </div>
                    ))
                  ) : null}
                  <button
                    type="button"
                    onClick={() => addOption(qIndex)}
                    className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
                  >
                    Add Option
                  </button>
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
                  >
                    Remove Question
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addQuestion}
                className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
              >
                Add Question
              </button>
              <button
                type="submit"
                className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
              >
                Create Quiz
              </button>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}