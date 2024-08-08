"use client";

import { useState } from "react";

interface RSSFormProps {
  onSubmit: (url: string) => void;
}

export default function RSSForm({ onSubmit }: RSSFormProps) {
  const [inputUrl, setInputUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex">
        <input
          type="url"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter RSS URL"
          className="flex-grow border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition duration-200"
        >
          Fetch RSS
        </button>
      </div>
    </form>
  );
}
