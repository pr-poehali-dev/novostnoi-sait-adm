import { useEffect, useState } from 'react';
import NewsCard from '@/components/NewsCard';
import { storage, NewsItem } from '@/lib/storage';
import Icon from '@/components/ui/icon';

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    storage.init();
    loadNews();
  }, []);

  const loadNews = () => {
    setNews(storage.getNews());
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="TrendingUp" className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Новости дня</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Актуальные новости и события в режиме реального времени
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="Newspaper" className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">Новостей пока нет</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map(item => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
