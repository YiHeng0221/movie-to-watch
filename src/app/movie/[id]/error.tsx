"use client";
import ErrorComponent from "@/components/Error";

export default function Error({
  children,
  error,
}: {
  children: React.ReactNode;
  error: Error & { digest?: string };
}) {
  return <ErrorComponent error={error}>{children}</ErrorComponent>;
}
