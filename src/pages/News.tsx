import { useEffect, useState } from 'react';
import NewsCard from '@/components/NewsCard';
import { storage, NewsItem, NewsCategory } from '@/lib/storage';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const categories: NewsCategory[] = ['Политика', 'Экономика', 'Технологии', 'Спорт', 'Культура', 'Наука', 'Общество', 'Мир'];

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'Все'>('Все');

  useEffect(() => {
    storage.init();
    loadNews();
  }, []);

  const loadNews = () => {
    setNews(storage.getNews());
  };

  const filteredNews = selectedCategory === 'Все' 
    ? news 
    : news.filter(item => item.newsCategory === selectedCategory);

  return (
    <div className="min-h-screen py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
              <Icon name="TrendingUp" className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold">Новости дня</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Актуальные новости и события в режиме реального времени
          </p>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'Все' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('Все')}
              className="rounded-full"
            >
              Все
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {filteredNews.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="Newspaper" className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">Новостей в этой категории пока нет</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map(item => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
