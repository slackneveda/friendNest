
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth, User } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import ProfileHeader from '@/components/ProfileHeader';
import Post, { PostData } from '@/components/Post';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: 'sarahjohnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Digital artist and dog lover 🎨🐕',
    followersCount: 1250,
    followingCount: 365
  },
  {
    id: '2',
    name: 'Alex Chen',
    username: 'alexchen',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'Travel photographer | Follow for adventure 🌎✈️',
    followersCount: 3421,
    followingCount: 512
  },
  {
    id: '3',
    name: 'Jordan Smith',
    username: 'jordansmith',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Software developer by day, musician by night 💻🎸',
    followersCount: 876,
    followingCount: 234
  }
];

// Mock posts data for users
const MOCK_USER_POSTS: Record<string, PostData[]> = {
  'sarahjohnson': [
    {
      id: '101',
      author: {
        id: '1',
        name: 'Sarah Johnson',
        username: 'sarahjohnson',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      content: "Just completed my latest digital art piece! This one took me over 20 hours to finish, but I'm really happy with how it turned out. 🎨",
      image: "https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80&w=2070&auto=format&fit=crop",
      createdAt: new Date(Date.now() - 2 * 24 * 3600000).toISOString(),
      likesCount: 128,
      commentsCount: 32,
      isLiked: false
    },
    {
      id: '102',
      author: {
        id: '1',
        name: 'Sarah Johnson',
        username: 'sarahjohnson',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      content: "Taking my dog to the park today! It's such a beautiful day outside. 🐕☀️",
      createdAt: new Date(Date.now() - 5 * 24 * 3600000).toISOString(),
      likesCount: 76,
      commentsCount: 14,
      isLiked: true
    }
  ],
  'alexchen': [
    {
      id: '201',
      author: {
        id: '2',
        name: 'Alex Chen',
        username: 'alexchen',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      content: "Just finished setting up my new photography website! Would love some feedback from fellow photographers 📸",
      createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
      likesCount: 24,
      commentsCount: 5,
      isLiked: false
    },
    {
      id: '202',
      author: {
        id: '2',
        name: 'Alex Chen',
        username: 'alexchen',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      content: "Sunrise at Mt. Rainier this morning. The early wake-up call was totally worth it! 🌄",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
      createdAt: new Date(Date.now() - 3 * 24 * 3600000).toISOString(),
      likesCount: 215,
      commentsCount: 42,
      isLiked: false
    }
  ],
  'jordansmith': [
    {
      id: '301',
      author: {
        id: '3',
        name: 'Jordan Smith',
        username: 'jordansmith',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      content: "Working on a new song today. The creative process is always challenging but rewarding! 🎵 #MusicProduction",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
      createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
      likesCount: 42,
      commentsCount: 7,
      isLiked: true
    },
    {
      id: '302',
      author: {
        id: '3',
        name: 'Jordan Smith',
        username: 'jordansmith',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      content: "Just pushed a major update to my side project! Check it out at github.com/jordansmith/awesome-project 💻",
      createdAt: new Date(Date.now() - 7 * 24 * 3600000).toISOString(),
      likesCount: 53,
      commentsCount: 9,
      isLiked: false
    }
  ]
};

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { isAuthenticated } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [activeTab, setActiveTab] = useState('posts');
  
  // If the user is not authenticated, redirect to home page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    // Fetch user profile data
    if (username) {
      const user = MOCK_USERS.find(u => u.username === username);
      if (user) {
        setProfileUser(user);
        
        // Fetch user posts
        const userPosts = MOCK_USER_POSTS[username] || [];
        setPosts(userPosts);
      }
    }
  }, [username]);

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto py-8 px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold">User not found</h2>
            <p className="text-gray-500 mt-2">This user doesn't exist or may have been deleted.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const newIsLiked = !post.isLiked;
          return {
            ...post,
            isLiked: newIsLiked,
            likesCount: newIsLiked ? post.likesCount + 1 : post.likesCount - 1
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto py-4 px-4">
        <ProfileHeader user={profileUser} />
        
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full border-b">
              <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
              <TabsTrigger value="media" className="flex-1">Media</TabsTrigger>
              <TabsTrigger value="likes" className="flex-1">Likes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="mt-4">
              {posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map(post => (
                    <Post
                      key={post.id}
                      post={post}
                      onLike={handleLike}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No posts yet</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="media" className="mt-4">
              <div className="text-center py-8">
                <p className="text-gray-500">Media section coming soon</p>
              </div>
            </TabsContent>
            
            <TabsContent value="likes" className="mt-4">
              <div className="text-center py-8">
                <p className="text-gray-500">Likes section coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
