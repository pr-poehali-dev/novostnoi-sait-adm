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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Icon name="Newspaper" className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">НовостиПортал</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? 'text-primary' : 'text-foreground/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <Icon name="Lock" className="h-4 w-4 mr-2" />
                Админ
              </Button>
            </Link>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} className="h-6 w-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  isActive(item.path) ? 'text-primary' : 'text-foreground/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                <Icon name="Lock" className="h-4 w-4 mr-2" />
                Админ
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
