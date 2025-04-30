
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useAuth, User } from '@/context/AuthContext';

interface UserCardProps {
  user: User;
  isFollowing?: boolean;
  onFollow?: () => void;
  compact?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  isFollowing = false,
  onFollow,
  compact = false
}) => {
  const { user: currentUser } = useAuth();
  const isCurrentUser = currentUser?.id === user.id;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  if (compact) {
    return (
      <Link
        to={`/profile/${user.username}`}
        className="flex items-center p-2 hover:bg-gray-50 rounded-lg"
      >
        <Avatar className="h-9 w-9 mr-3">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">@{user.username}</p>
        </div>
      </Link>
    );
  }

  return (
    <Card className="overflow-hidden card-hover">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Link to={`/profile/${user.username}`} className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </Link>

          {!isCurrentUser && onFollow && (
            <Button
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              onClick={onFollow}
              className={isFollowing ? "border-pulse-500 text-pulse-500 hover:bg-pulse-50" : "bg-pulse-500 hover:bg-pulse-600"}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          )}
        </div>

        {user.bio && (
          <p className="text-sm mt-3 text-gray-700">{user.bio}</p>
        )}

        <div className="flex justify-between text-sm mt-4">
          <div>
            <span className="font-semibold">{user.followersCount}</span>{' '}
            <span className="text-gray-500">Followers</span>
          </div>
          <div>
            <span className="font-semibold">{user.followingCount}</span>{' '}
            <span className="text-gray-500">Following</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
