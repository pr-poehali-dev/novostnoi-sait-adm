import { useEffect, useState } from 'react';
import NewsCard from '@/components/NewsCard';
import { storage, NewsItem } from '@/lib/storage';
import Icon from '@/components/ui/icon';

export default function Articles() {
  const [articles, setArticles] = useState<NewsItem[]>([]);

  useEffect(() => {
    storage.init();
    loadArticles();
  }, []);

  const loadArticles = () => {
    setArticles(storage.getArticles());
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="BookOpen" className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Статьи</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Глубокая аналитика, экспертные мнения и авторские материалы
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="FileText" className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">Статей пока нет</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(item => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
