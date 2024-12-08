"use client"; // Error boundaries must be Client Components

import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: { error: boolean; message: string };
}) {
  const router = useRouter();

  const reset = () => {
    router.refresh();
  };

  return (
    <div className="fixed z-10 inset-0">
      <div className="relative items-center justify-center flex min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-black rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border-2 border-red">
          <div className="mt-3 text-center sm:mt-5">
            <h3
              className="text-3xl leading-6 font-medium text-red"
              id="modal-headline"
            >
              Error
            </h3>
            <div className="mt-2">
              <p className="text-2xl text-gray-500">
                {error.message.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red text-white sm:text-sm"
              onClick={() => reset()}
            >
              refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
