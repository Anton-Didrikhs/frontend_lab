'use client'
import { useAuth } from "@/app/lib/firebase/AuthContext";
import { useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';

function Protected({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const returnUrl = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/user/signin?returnUrl=${returnUrl}`);
    }
  }, [user, loading, returnUrl, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default Protected;