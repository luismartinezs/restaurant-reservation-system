"use client";
import { Alert } from "@mantine/core";
import { useEffect } from "react";
import { CiCircleAlert } from "react-icons/ci";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center h-screen">
      <Alert
        color="pink"
        title="Oopsie Daisy! 🌼"
        icon={<CiCircleAlert className="text-2xl" />}
        className="max-w-md p-6 rounded-lg shadow-lg "
      >
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold">
            {'Oh no! Our little restaurant database is taking a nap! 😴💤'}
          </p>
          <p>
            {'I\'m working on a super cool project called'}{" "}
            <a
              href="https://linkfluencer.appforgelabs.com"
              className="underline text-pink-600 hover:text-pink-800 transition-colors"
            >
              {'Linkfluencer'}
            </a>
            {', so I had to tuck our database into bed for a bit.'}
          </p>
          <p className="italic">
            {'But don\'t worry! Our virtual chefs are still dreaming up delicious dishes! 👨‍🍳✨'}
          </p>
          <p>
            {'While you wait, why not check out my other'}{" "}
            <a
              href="https://www.webdevluis.com/portfolio"
              className="underline text-pink-600 hover:text-pink-800 transition-colors"
            >
              {'magical creations'}
            </a>
            {'? They\'re almost as tasty as our imaginary menu! 🍽️🎩'}
          </p>
        </div>
      </Alert>
    </div>
  );
}
