import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { storage, AboutContent } from '@/lib/storage';

export default function About() {
  const [about, setAbout] = useState<AboutContent | null>(null);

  useEffect(() => {
    storage.init();
    setAbout(storage.getAbout());
  }, []);

  if (!about) return null;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">{about.title}</h1>
          <p className="text-lg text-muted-foreground">
            {about.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 hover-scale">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name="Target" className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Наша миссия</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {about.mission}
            </p>
          </Card>

          <Card className="p-8 hover-scale">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name="Eye" className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Наше видение</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {about.vision}
            </p>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Наша команда</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {about.team.map((member) => (
              <Card key={member.id} className="p-6 text-center hover-scale">
                {member.photo ? (
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-primary/20"
                  />
                ) : (
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="User" className="h-16 w-16 text-primary" />
                  </div>
                )}
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.position}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Свяжитесь с нами</h2>
            <div className="flex flex-wrap gap-6 justify-center text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Mail" className="h-5 w-5 text-primary" />
                info@news-portal.ru
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Phone" className="h-5 w-5 text-primary" />
                +7 (800) 123-45-67
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}