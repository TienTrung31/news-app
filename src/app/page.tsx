'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

interface Article {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  author: string;
  publishedAt: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-xl text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <h1 className="text-3xl font-bold mb-8">Tin tức mới nhất</h1>

      {articles.length === 0 ? (
        <div className="text-center text-gray-600">Chưa có bài viết nào.</div>
      ) : (
        <div className="flex justify-center">
          <div className="w-3/4 overflow-y-auto flex flex-col gap-5">
            {articles.map((article) => (
              <div key={article._id} className="grid grid-cols-3 gap-4 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <img src={article.image || `/api/placeholder/400/225`} alt={article.title} className="object-cover w-full h-full" />
                </div>
                <div className="p-4 col-span-2 bg-gray-50">
                  <span className="text-sm text-blue-600 font-medium">{article.category}</span>
                  <h2 className="mt-2 text-xl font-semibold line-clamp-2">{article.title}</h2>
                  <p className="mt-2 text-gray-600 line-clamp-3 h-[72px]">{article.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <Link href={`/articles/${article._id}`} className="text-blue-600 hover:text-blue-700">Đọc thêm →</Link>
                    <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}