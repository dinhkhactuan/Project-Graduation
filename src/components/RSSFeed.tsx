"use client";

import { useState, useEffect } from "react";
import Parser from "rss-parser";

type FeedItem = {
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
};

type Feed = {
  title: string;
  description?: string;
  items: FeedItem[];
};

interface RSSFeedProps {
  url: string;
}

export default function RSSFeed({ url }: RSSFeedProps) {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRSS = async () => {
      setLoading(true);
      setError(null);
      const parser = new Parser();

      try {
        const feed = await parser.parseURL(
          `/api/proxy?url=${encodeURIComponent(
            "https://vnexpress.net/rss/tin-moi-nhat.rss"
          )}`
        );
        setFeed(feed as Feed);
      } catch (error) {
        setError("Lỗi khi tải feed RSS");
        console.error("Lỗi khi tải RSS:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRSS();
  }, [url]);
  console.log(feed);

  if (loading) return <div className="text-center">Đang tải...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!feed) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{feed.title}</h2>
      {feed.description && (
        <p className="mb-4 text-gray-600">{feed.description}</p>
      )}
      <div className="space-y-6">
        {feed.items.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {item.title}
              </a>
            </h3>
            {item.isoDate && (
              <p className="text-sm text-gray-500 mb-2">
                {new Date(item.isoDate).toLocaleString("vi-VN")}
              </p>
            )}
            {item.contentSnippet && (
              <p className="text-gray-700">
                {item.contentSnippet.slice(0, 150)}...
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
