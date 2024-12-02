"use client";
import { useEffect, useState } from "react";

type ListItem = {
  id: string;
  name: string;
};


export default function Home() {
  const [name, setName] = useState("");
  const [list, setList] = useState<ListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch list');
      const data = await res.json();
      setList(data);
    } catch (error) {
      setError("Failed to load items. Please try again later.");
    }
  };

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a name");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!res.ok) throw new Error('Failed to add item');
      
      const data = await res.json();
      setList([...list, data]);
      setName(""); 
    } catch (error) {
      setError("Failed to add item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <form onSubmit={formHandler} className="flex gap-2">
          <input
            className="border border-gray-300 rounded-md p-2"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            disabled={isLoading}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Submit"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm" role="alert">
            {error}
          </p>
        )}

        {list.length > 0 ? (
          <ul className="list-none w-full">
            {list.map((item) => (
              <li 
                className="mb-2 p-2 border border-gray-200 rounded-md" 
                key={item.id}
              >
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No items yet</p>
        )}
      </main>
    </div>
  );
}
