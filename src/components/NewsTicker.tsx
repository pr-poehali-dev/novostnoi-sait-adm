import { useEffect, useState } from 'react';
import { storage, NewsItem } from '@/lib/storage';

export default function NewsTicker() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const allNews = [...storage.getNews(), ...storage.getArticles()]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
    setNews(allNews);
  }, []);

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden relative">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center gap-2 font-bold text-sm uppercase whitespace-nowrap mr-4">
          <span className="bg-white text-red-600 px-2 py-1 rounded">Срочно</span>
          <span>Последние новости</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="animate-ticker flex gap-8 whitespace-nowrap">
            {news.map((item, index) => (
              <span key={`${item.id}-${index}`} className="inline-flex items-center gap-2">
                <span className="text-red-200">•</span>
                <span>{item.title}</span>
              </span>
            ))}
            {news.map((item, index) => (
              <span key={`${item.id}-duplicate-${index}`} className="inline-flex items-center gap-2">
                <span className="text-red-200">•</span>
                <span>{item.title}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
