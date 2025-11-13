export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: 'news' | 'articles';
  image?: string;
  author: string;
  date: string;
  featured?: boolean;
}

export interface AboutContent {
  title: string;
  description: string;
  mission: string;
  vision: string;
  team: Array<{
    name: string;
    position: string;
    bio: string;
  }>;
}

export interface SiteData {
  news: NewsItem[];
  articles: NewsItem[];
  about: AboutContent;
}

const STORAGE_KEY = 'news_site_data';
const PASSWORD_KEY = 'admin_password';

const defaultData: SiteData = {
  news: [
    {
      id: '1',
      title: 'Технологии будущего: что нас ждет в 2025 году',
      content: 'Искусственный интеллект продолжает развиваться невероятными темпами. Эксперты прогнозируют революцию в области квантовых вычислений и нейроинтерфейсов. Новые технологии обещают изменить нашу жизнь до неузнаваемости.',
      category: 'news',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      author: 'Анна Иванова',
      date: new Date().toISOString(),
      featured: true
    },
    {
      id: '2',
      title: 'Новый рекорд на мировом чемпионате',
      content: 'Российский спортсмен установил новый мировой рекорд в беге на 100 метров, показав время 9.58 секунды. Это достижение вошло в историю мирового спорта.',
      category: 'news',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
      author: 'Петр Сидоров',
      date: new Date(Date.now() - 86400000).toISOString(),
      featured: false
    },
    {
      id: '3',
      title: 'Открытие выставки современного искусства',
      content: 'В центральном музее открылась уникальная выставка работ молодых художников. Экспозиция будет доступна до конца месяца и обещает стать событием года.',
      category: 'news',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop',
      author: 'Мария Петрова',
      date: new Date(Date.now() - 172800000).toISOString(),
      featured: true
    }
  ],
  articles: [
    {
      id: '4',
      title: 'Как сохранить продуктивность в эпоху цифровых отвлечений',
      content: 'В современном мире мы постоянно отвлекаемся на уведомления, социальные сети и бесконечный поток информации. В этой статье мы рассмотрим проверенные методы повышения концентрации и продуктивности.',
      category: 'articles',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
      author: 'Дмитрий Козлов',
      date: new Date(Date.now() - 259200000).toISOString(),
      featured: true
    },
    {
      id: '5',
      title: 'Будущее образования: онлайн или офлайн?',
      content: 'Пандемия ускорила переход к онлайн-обучению, но что эффективнее для студентов? Анализируем плюсы и минусы каждого формата и ищем золотую середину.',
      category: 'articles',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
      author: 'Елена Смирнова',
      date: new Date(Date.now() - 345600000).toISOString(),
      featured: false
    }
  ],
  about: {
    title: 'О нашем издании',
    description: 'Мы — команда профессиональных журналистов, которые создают качественный контент для вас каждый день.',
    mission: 'Наша миссия — предоставлять достоверную и актуальную информацию, помогая читателям быть в курсе важнейших событий.',
    vision: 'Мы стремимся стать ведущим новостным порталом, который объединяет людей через качественную журналистику.',
    team: [
      {
        name: 'Анна Иванова',
        position: 'Главный редактор',
        bio: 'Опыт работы в журналистике более 15 лет. Специализируется на технологических темах.'
      },
      {
        name: 'Петр Сидоров',
        position: 'Спортивный обозреватель',
        bio: 'Освещает спортивные события международного уровня. Мастер спорта по легкой атлетике.'
      },
      {
        name: 'Мария Петрова',
        position: 'Культурный критик',
        bio: 'Специалист по искусству и культуре. Автор множества статей о современном искусстве.'
      }
    ]
  }
};

export const storage = {
  init() {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    }
  },

  getData(): SiteData {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultData;
  },

  setData(data: SiteData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  getNews(): NewsItem[] {
    return this.getData().news;
  },

  getArticles(): NewsItem[] {
    return this.getData().articles;
  },

  getAbout(): AboutContent {
    return this.getData().about;
  },

  addItem(item: NewsItem) {
    const data = this.getData();
    if (item.category === 'news') {
      data.news.unshift(item);
    } else {
      data.articles.unshift(item);
    }
    this.setData(data);
  },

  updateItem(id: string, updates: Partial<NewsItem>) {
    const data = this.getData();
    const newsIndex = data.news.findIndex(n => n.id === id);
    const articleIndex = data.articles.findIndex(a => a.id === id);

    if (newsIndex !== -1) {
      data.news[newsIndex] = { ...data.news[newsIndex], ...updates };
    } else if (articleIndex !== -1) {
      data.articles[articleIndex] = { ...data.articles[articleIndex], ...updates };
    }
    this.setData(data);
  },

  deleteItem(id: string) {
    const data = this.getData();
    data.news = data.news.filter(n => n.id !== id);
    data.articles = data.articles.filter(a => a.id !== id);
    this.setData(data);
  },

  updateAbout(about: AboutContent) {
    const data = this.getData();
    data.about = about;
    this.setData(data);
  },

  exportData(): string {
    return JSON.stringify(this.getData(), null, 2);
  },

  importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      this.setData(data);
      return true;
    } catch {
      return false;
    }
  },

  checkPassword(password: string): boolean {
    return password === '37иваново';
  }
};
