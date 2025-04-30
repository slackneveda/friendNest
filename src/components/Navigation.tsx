
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from './ThemeToggle';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="border-b bg-background py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-xl font-bold">P</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">Pulse</h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user && (
            <>
              <Link to={`/profile/${user.username}`} className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline font-medium">{user.name}</span>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
