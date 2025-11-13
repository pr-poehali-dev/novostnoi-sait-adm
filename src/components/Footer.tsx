import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Newspaper" className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">НовостиПортал</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Ваш надежный источник актуальных новостей и аналитики
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Разделы</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Главная</a></li>
              <li><a href="/news" className="hover:text-primary transition-colors">Новости дня</a></li>
              <li><a href="/articles" className="hover:text-primary transition-colors">Статьи</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">О нас</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Icon name="Mail" className="h-4 w-4" />
                info@news-portal.ru
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Phone" className="h-4 w-4" />
                +7 (800) 123-45-67
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} НовостиПортал. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
