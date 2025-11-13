-- Create news table
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    author VARCHAR(200) NOT NULL,
    published_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    views INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_is_featured ON news(is_featured);

-- Insert sample news data
INSERT INTO news (title, category, content, image_url, author, views, is_featured) VALUES
('Технологии будущего: что нас ждет в 2025 году', 'Технологии', 'Искусственный интеллект продолжает развиваться невероятными темпами. Эксперты прогнозируют революцию в области квантовых вычислений и нейроинтерфейсов.', 'https://images.unsplash.com/photo-1518770660439-4636190af475', 'Анна Иванова', 1250, true),
('Новый рекорд на мировом чемпионате', 'Спорт', 'Российский спортсмен установил новый мировой рекорд в беге на 100 метров, показав время 9.58 секунды.', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211', 'Петр Сидоров', 890, false),
('Открытие выставки современного искусства', 'Культура', 'В центральном музее открылась уникальная выставка работ молодых художников. Экспозиция будет доступна до конца месяца.', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b', 'Мария Петрова', 456, false),
('Экономика показывает рост третий квартал подряд', 'Экономика', 'По данным министерства финансов, экономический рост составил 3.2% в годовом исчислении. Эксперты отмечают позитивную динамику.', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3', 'Дмитрий Козлов', 678, true),
('Прорыв в медицине: новое лечение рака', 'Наука', 'Ученые разработали инновационный метод лечения онкологических заболеваний с эффективностью 85%.', 'https://images.unsplash.com/photo-1579154204601-01588f351e67', 'Елена Смирнова', 2100, true);
