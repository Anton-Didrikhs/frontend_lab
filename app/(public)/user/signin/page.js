'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/lib/firebase/firebase";

export default function SignInForm() {
  //const auth = getAuth(app);
  const router = useRouter();
  
  const [returnUrl, setReturnUrl] = useState("/");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search); //Should fix the #418 react error?
      const returnUrlParam = params.get("returnUrl");
      if (returnUrlParam) {
        setReturnUrl(returnUrlParam);
      } else {
        setReturnUrl("/"); }
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target["email"].value;
    const password = e.target["password"].value;
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
              router.push(returnUrl);
            } else {
              router.push("/user/verify");
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
            console.error(errorCode, errorMessage);
          });
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
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
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Sign In</h1>
            <p class="mt-4 leading-relaxed text-gray-500">
              Please sign in to continue.
            </p>
            {error && <p className="mt-4 text-red-600">{error}</p>}
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
                <button
                  type="submit"
                  class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}