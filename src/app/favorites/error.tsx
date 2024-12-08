"use client";
import ErrorComponent from "@/components/Error";
export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const errorMessage = {
    error: true,
    message: error.message,
  };
  return <ErrorComponent error={errorMessage} />;
}
