
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Bell, Home, Search, User, LogOut, Settings, MessageCircle } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search users or posts
    console.log('Searching for:', searchValue);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-pulse-500' : 'text-gray-600';
  };

  if (!user) return null;

  return (
    <nav className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="bg-pulse-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-xl font-bold">P</span>
              </div>
              <span className="text-xl font-bold text-pulse-700 hidden md:block">Pulse</span>
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-1.5 pl-10 pr-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-pulse-500 focus:border-pulse-500"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
          </div>

          {/* Navigation links */}
          <div className="flex items-center space-x-1 md:space-x-4">
            <Link
              to="/dashboard"
              className={`p-2 rounded-md hover:bg-gray-100 ${isActive('/dashboard')}`}
              aria-label="Home"
            >
              <Home className="h-6 w-6" />
            </Link>
            
            <Link
              to="/messages"
              className={`p-2 rounded-md hover:bg-gray-100 ${isActive('/messages')}`}
              aria-label="Messages"
            >
              <MessageCircle className="h-6 w-6" />
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="px-4 py-2 font-medium">Notifications</div>
                <DropdownMenuSeparator />
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                    <div className="flex items-start">
                      <Avatar className="h-9 w-9 mr-3">
                        <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                        <AvatarFallback>AC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">
                          <span className="font-bold">Alex Chen</span> liked your post
                        </p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                    <div className="flex items-start">
                      <Avatar className="h-9 w-9 mr-3">
                        <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">
                          <span className="font-bold">Jordan Smith</span> started following you
                        </p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="px-4 py-2 text-center">
                  <Link
                    to="/notifications"
                    className="text-sm text-pulse-600 hover:underline"
                  >
                    View all notifications
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative" size="sm">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs text-gray-500 leading-none">@{user.username}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/profile/${user.username}`} className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile search (only visible on small screens) */}
      <div className="md:hidden border-t py-2 px-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search Pulse..."
            className="w-full py-1.5 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pulse-500"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
};

export default Navigation;
