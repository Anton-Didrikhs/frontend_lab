"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function VerifyEmail() {
  const router = useRouter();
  const auth = getAuth();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        signOut(auth).then(() => {
          console.log("User signed out");
        }).catch((error) => {
          console.error("Error signing out:", error);
        });
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <div>
      <h1>Email not verified. Verify by clicking on the link sent to your email address: {email}</h1>
    </div>
  );
}