"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import NewDetails from "../components/NewDetails";

export interface ArticleData {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  content: string;
  image: string;
}

const NewsDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const [article, setArticle] = useState<ArticleData | null>(null);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const originalLink = atob(id as string);
          const response = await axios.get(originalLink);
          const parser = new DOMParser();
          const doc = parser.parseFromString(response.data, "text/html");

          const title = doc.querySelector("h1.title-detail")?.textContent || "";
          const description =
            doc.querySelector("p.description")?.textContent || "";
          const author = doc.querySelector(".author_mail")?.textContent || "";
          const publishDate = doc.querySelector(".date")?.textContent || "";
          const content = doc.querySelector(".fck_detail")?.innerHTML || "";
          const image =
            doc
              .querySelector("meta[property='og:image']")
              ?.getAttribute("content") || "";

          setArticle({
            title,
            description,
            author,
            publishDate,
            content: DOMPurify.sanitize(content),
            image,
          });
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      };

      fetchArticle();
    }
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return <NewDetails newData={article} />;
};

export default NewsDetailPage;
