import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { storage, NewsItem, AboutContent } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    storage.init();
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    setNews(storage.getNews());
    setArticles(storage.getArticles());
    setAbout(storage.getAbout());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (storage.checkPassword(password)) {
      setIsAuthenticated(true);
      toast({ title: 'Успешный вход', description: 'Добро пожаловать в админ-панель' });
    } else {
      toast({ title: 'Ошибка', description: 'Неверный пароль', variant: 'destructive' });
    }
  };

  const handleSaveItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const item: NewsItem = {
      id: editingItem?.id || Date.now().toString(),
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as 'news' | 'articles',
      image: formData.get('image') as string || undefined,
      author: formData.get('author') as string,
      date: editingItem?.date || new Date().toISOString(),
      featured: formData.get('featured') === 'on'
    };

    if (editingItem) {
      storage.updateItem(item.id, item);
      toast({ title: 'Обновлено', description: 'Материал успешно обновлен' });
    } else {
      storage.addItem(item);
      toast({ title: 'Создано', description: 'Материал успешно добавлен' });
    }

    setIsDialogOpen(false);
    setEditingItem(null);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот материал?')) {
      storage.deleteItem(id);
      toast({ title: 'Удалено', description: 'Материал успешно удален' });
      loadData();
    }
  };

  const handleExport = () => {
    const data = storage.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'news-site-data.json';
    a.click();
    toast({ title: 'Экспорт завершен', description: 'Данные успешно экспортированы' });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (storage.importData(content)) {
        toast({ title: 'Импорт завершен', description: 'Данные успешно импортированы' });
        loadData();
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось импортировать данные', variant: 'destructive' });
      }
    };
    reader.readAsText(file);
  };

  const handleSaveAbout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updatedAbout: AboutContent = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      mission: formData.get('mission') as string,
      vision: formData.get('vision') as string,
      team: about?.team || []
    };

    storage.updateAbout(updatedAbout);
    toast({ title: 'Обновлено', description: 'Раздел "О нас" успешно обновлен' });
    loadData();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-6">
            <Icon name="Lock" className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h1 className="text-2xl font-bold">Вход в админ-панель</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
            </div>
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Админ-панель</h1>
            <p className="text-muted-foreground">Управление контентом сайта</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Icon name="Download" className="mr-2 h-4 w-4" />
              Экспорт
            </Button>
            <label>
              <Button variant="outline" asChild>
                <span>
                  <Icon name="Upload" className="mr-2 h-4 w-4" />
                  Импорт
                </span>
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <Button variant="destructive" onClick={() => setIsAuthenticated(false)}>
              <Icon name="LogOut" className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </div>
        </div>

        <Tabs defaultValue="news" className="space-y-6">
          <TabsList>
            <TabsTrigger value="news">Новости</TabsTrigger>
            <TabsTrigger value="articles">Статьи</TabsTrigger>
            <TabsTrigger value="about">О нас</TabsTrigger>
          </TabsList>

          <TabsContent value="news">
            <div className="space-y-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingItem(null)}>
                    <Icon name="Plus" className="mr-2 h-4 w-4" />
                    Добавить новость
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingItem ? 'Редактировать' : 'Добавить новость'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSaveItem} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Заголовок</Label>
                      <Input name="title" defaultValue={editingItem?.title} required />
                    </div>
                    <div>
                      <Label htmlFor="content">Содержание</Label>
                      <Textarea name="content" defaultValue={editingItem?.content} rows={6} required />
                    </div>
                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Select name="category" defaultValue={editingItem?.category || 'news'}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="news">Новость</SelectItem>
                          <SelectItem value="articles">Статья</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="image">URL изображения</Label>
                      <Input name="image" defaultValue={editingItem?.image} />
                    </div>
                    <div>
                      <Label htmlFor="author">Автор</Label>
                      <Input name="author" defaultValue={editingItem?.author} required />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch name="featured" defaultChecked={editingItem?.featured} />
                      <Label>Главная новость</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">Сохранить</Button>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Отмена
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <div className="grid gap-4">
                {news.map(item => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.content}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{item.author}</span>
                          <span>{new Date(item.date).toLocaleDateString('ru-RU')}</span>
                          {item.featured && <span className="text-primary">⭐ Главное</span>}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(item);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Icon name="Pencil" className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Icon name="Trash2" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="articles">
            <div className="space-y-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingItem(null)}>
                    <Icon name="Plus" className="mr-2 h-4 w-4" />
                    Добавить статью
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingItem ? 'Редактировать' : 'Добавить статью'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSaveItem} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Заголовок</Label>
                      <Input name="title" defaultValue={editingItem?.title} required />
                    </div>
                    <div>
                      <Label htmlFor="content">Содержание</Label>
                      <Textarea name="content" defaultValue={editingItem?.content} rows={6} required />
                    </div>
                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Select name="category" defaultValue={editingItem?.category || 'articles'}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="news">Новость</SelectItem>
                          <SelectItem value="articles">Статья</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="image">URL изображения</Label>
                      <Input name="image" defaultValue={editingItem?.image} />
                    </div>
                    <div>
                      <Label htmlFor="author">Автор</Label>
                      <Input name="author" defaultValue={editingItem?.author} required />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch name="featured" defaultChecked={editingItem?.featured} />
                      <Label>Избранная статья</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">Сохранить</Button>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Отмена
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <div className="grid gap-4">
                {articles.map(item => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.content}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{item.author}</span>
                          <span>{new Date(item.date).toLocaleDateString('ru-RU')}</span>
                          {item.featured && <span className="text-primary">⭐ Избранное</span>}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(item);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Icon name="Pencil" className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Icon name="Trash2" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Редактировать раздел "О нас"</h2>
              {about && (
                <form onSubmit={handleSaveAbout} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Заголовок</Label>
                    <Input name="title" defaultValue={about.title} required />
                  </div>
                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea name="description" defaultValue={about.description} rows={3} required />
                  </div>
                  <div>
                    <Label htmlFor="mission">Миссия</Label>
                    <Textarea name="mission" defaultValue={about.mission} rows={3} required />
                  </div>
                  <div>
                    <Label htmlFor="vision">Видение</Label>
                    <Textarea name="vision" defaultValue={about.vision} rows={3} required />
                  </div>
                  <Button type="submit">
                    <Icon name="Save" className="mr-2 h-4 w-4" />
                    Сохранить изменения
                  </Button>
                </form>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
