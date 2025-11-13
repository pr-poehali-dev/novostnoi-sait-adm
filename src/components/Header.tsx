import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/news', label: 'Новости дня' },
    { path: '/articles', label: 'Статьи' },
    { path: '/about', label: 'О нас' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const currentDate = new Date().toLocaleDateString('ru-RU', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="text-muted-foreground capitalize">{currentDate}</div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Facebook" className="h-4 w-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Twitter" className="h-4 w-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Instagram" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                <Icon name="Newspaper" className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <div className="font-bold text-2xl tracking-tight">НовостиПортал</div>
                <div className="text-xs text-muted-foreground">Ваш надежный источник новостей</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-semibold transition-colors rounded-md ${
                    isActive(item.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/admin">
                <Button variant="outline" size="sm" className="ml-2">
                  <Icon name="Settings" className="h-4 w-4 mr-2" />
                  Админ
                </Button>
              </Link>
            </nav>

            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} className="h-6 w-6" />
            </button>
          </div>

          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 space-y-1 animate-fade-in border-t">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                    isActive(item.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Icon name="Settings" className="h-4 w-4 mr-2" />
                  Админ
                </Button>
              </Link>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}