import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NewsCard from '@/components/NewsCard';
import Icon from '@/components/ui/icon';
import { storage, NewsItem } from '@/lib/storage';

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [articles, setArticles] = useState<NewsItem[]>([]);

  useEffect(() => {
    storage.init();
    setNews(storage.getNews().slice(0, 3));
    setArticles(storage.getArticles().slice(0, 2));
  }, []);

  const featuredNews = news.find(n => n.featured);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Будьте в курсе событий
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Актуальные новости, глубокая аналитика и экспертные мнения каждый день
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/news">
                <Button size="lg" className="gap-2">
                  <Icon name="TrendingUp" className="h-5 w-5" />
                  Последние новости
                </Button>
              </Link>
              <Link to="/articles">
                <Button size="lg" variant="outline" className="gap-2">
                  <Icon name="BookOpen" className="h-5 w-5" />
                  Читать статьи
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Главные новости</h2>
            <Link to="/news">
              <Button variant="ghost">
                Все новости
                <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredNews && <NewsCard news={featuredNews} featured />}
            {news.filter(n => !n.featured).map(item => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Аналитика и статьи</h2>
            <Link to="/articles">
              <Button variant="ghost">
                Все статьи
                <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map(item => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Не пропустите важное</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Следите за последними событиями и будьте в курсе всех важных новостей
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/news">
              <Button size="lg" variant="secondary">
                Читать сейчас
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
