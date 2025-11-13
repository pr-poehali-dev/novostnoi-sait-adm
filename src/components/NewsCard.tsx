import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { NewsItem } from '@/lib/storage';

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale ${featured ? 'md:col-span-2' : ''}`}>
      <div className={`${featured ? 'md:flex' : ''}`}>
        {news.image && (
          <div className={`relative ${featured ? 'md:w-1/2' : ''} h-48 ${featured ? 'md:h-auto' : ''} overflow-hidden`}>
            <img 
              src={news.image} 
              alt={news.title}
              className="w-full h-full object-cover"
            />
            {news.featured && (
              <Badge className="absolute top-4 left-4 bg-primary">
                <Icon name="Star" className="h-3 w-3 mr-1" />
                Главное
              </Badge>
            )}
          </div>
        )}
        
        <div className={`p-6 ${featured ? 'md:w-1/2' : ''}`}>
          <Badge variant="outline" className="mb-3">
            {news.category === 'news' ? 'Новость' : 'Статья'}
          </Badge>
          
          <h3 className={`font-bold mb-3 ${featured ? 'text-2xl' : 'text-xl'} line-clamp-2`}>
            {news.title}
          </h3>
          
          <p className={`text-muted-foreground mb-4 ${featured ? 'line-clamp-4' : 'line-clamp-3'}`}>
            {news.content}
          </p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="User" className="h-4 w-4" />
              {news.author}
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Calendar" className="h-4 w-4" />
              {formatDate(news.date)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
