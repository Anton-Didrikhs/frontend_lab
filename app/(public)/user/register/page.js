"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useAuth } from "@/app/lib/firebase/AuthContext";

export default function RegisterForm() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth();

  const [registerError, setRegisterError] = useState(""); // State for registration errors

  if (user) {
    return null;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    if (data.password !== data.confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log("User registered!");
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Email verification sent!");
            router.push("/user/verify");
          });
      })
      .catch((error) => {
        setRegisterError(error.message);
        console.dir(error);
      });
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Register"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>
        <main className="flex items-center justify-center p-8 sm:p-12 lg:col-span-7 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Register</h1>
            <p class="mt-4 leading-relaxed text-gray-500">
            Please create an account to start creating quizzes.
            </p>
            {registerError && 
            <div role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
            <strong class="block font-medium text-red-800"> Something went wrong </strong>
          
            <p class="mt-2 text-sm text-red-700">
              {registerError}
            </p>
          </div>
            }
            <form onSubmit={onSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}