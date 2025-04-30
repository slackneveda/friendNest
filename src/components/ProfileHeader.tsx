
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth, User } from '@/context/AuthContext';
import { toast } from 'sonner';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const { user: currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(user.followersCount);
  
  const isCurrentUser = currentUser?.id === user.id;

  const handleFollowToggle = () => {
    setIsFollowing(prev => !prev);
    
    // Update followers count
    if (isFollowing) {
      setFollowersCount(prev => prev - 1);
      toast.info(`Unfollowed ${user.name}`);
    } else {
      setFollowersCount(prev => prev + 1);
      toast.success(`Now following ${user.name}`);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Cover photo */}
      <div className="h-32 md:h-48 bg-gradient-to-r from-pulse-400 to-pulse-600"></div>
      
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-end">
          {/* Avatar - negative margin to overlap with cover photo */}
          <div className="-mt-16 md:-mt-20 mb-4 md:mb-0 flex-shrink-0">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </div>
          
          {/* User info and action buttons */}
          <div className="md:ml-6 flex-1 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-500">@{user.username}</p>
              
              {user.bio && (
                <p className="mt-2 text-gray-700">{user.bio}</p>
              )}
            </div>
            
            <div className="mt-4 md:mt-0">
              {isCurrentUser ? (
                <Button variant="outline" className="border-pulse-500 text-pulse-500 hover:bg-pulse-50">
                  Edit Profile
                </Button>
              ) : (
                <Button 
                  onClick={handleFollowToggle}
                  variant={isFollowing ? "outline" : "default"}
                  className={isFollowing ? "border-pulse-500 text-pulse-500 hover:bg-pulse-50" : "bg-pulse-500 hover:bg-pulse-600"}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex mt-6 border-t pt-4">
          <div className="mr-6">
            <span className="font-bold">{followersCount}</span>
            <span className="text-gray-500 ml-1">Followers</span>
          </div>
          <div className="mr-6">
            <span className="font-bold">{user.followingCount}</span>
            <span className="text-gray-500 ml-1">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
