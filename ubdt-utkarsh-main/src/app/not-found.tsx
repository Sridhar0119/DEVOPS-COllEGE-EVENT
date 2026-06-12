"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.push("/coming-soon");
  }, [router]);

  return null; // This component doesn't render anything as it immediately redirects
}
