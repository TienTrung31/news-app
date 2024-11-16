"use client";
import { useEffect, useState } from 'react';

interface Article {
    _id: string;
    title: string;
    description: string;
    content: string;
    category: string;
    image: string;
    publishedAt: string;
    author: string;
}

const SucKhoe = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [mainArticle, ...sideArticles] = articles;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/articles?category=Sức khỏe');
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            }
        };

        fetchArticles();
    }, []);

    if (articles.length === 0) {
        return <div className="text-center py-10">Đang tải bài viết...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Main Article */}
                <div className="col-span-1">
                    <h2 className="text-2xl font-bold line-clamp-2">{mainArticle.title}</h2>
                    <p className="text-gray-500 mt-2">Sức khỏe | {new Date(mainArticle.publishedAt).toLocaleString('vi-VN')}</p>
                    <img
                        src={mainArticle.image || "/placeholder-image.jpg"}
                        alt={mainArticle.title}
                        className="mt-4 rounded-lg w-full h-64 object-cover"
                    />
                    <p className="mt-4 text-gray-600 line-clamp-3">{mainArticle.description}</p>
                </div>

                {/* Side Articles */}
                <div className="col-span-1 space-y-4">
                    {sideArticles.map((article) => (
                        <div key={article._id} className="flex items-center space-x-4">
                            <img
                                src={article.image || "/placeholder-image.jpg"}
                                alt={article.title}
                                className="h-24 w-24 rounded-lg object-cover"
                            />
                            <div>
                                <h3 className="text-xl font-bold line-clamp-2">{article.title}</h3>
                                <p className="text-gray-500 line-clamp-2">{article.description}</p>
                                <p className="text-gray-500">Sức khỏe | {new Date(article.publishedAt).toLocaleDateString('vi-VN')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SucKhoe;