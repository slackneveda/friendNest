
import React, { useState } from 'react';
import Post, { PostData } from './Post';
import CreatePost from './CreatePost';
import UserCard from './UserCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

// Mock post data for demonstration
const INITIAL_POSTS: PostData[] = [
  {
    id: '1',
    author: {
      id: '2',
      name: 'Alex Chen',
      username: 'alexchen',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    content: "Just finished setting up my new photography website! Would love some feedback from fellow photographers 📸 \n\nCheck it out and let me know what you think!",
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(), // 25 minutes ago
    likesCount: 24,
    commentsCount: 5,
    isLiked: false
  },
  {
    id: '2',
    author: {
      id: '3',
      name: 'Jordan Smith',
      username: 'jordansmith',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    content: "Working on a new song today. The creative process is always challenging but rewarding! 🎵 #MusicProduction",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    createdAt: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
    likesCount: 42,
    commentsCount: 7,
    isLiked: true
  },
  {
    id: '3',
    author: {
      id: '1',
      name: 'Sarah Johnson',
      username: 'sarahjohnson',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    content: "Just completed my latest digital art piece! This one took me over 20 hours to finish, but I'm really happy with how it turned out. 🎨 \n\nWhat do you think?",
    image: "https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80&w=2070&auto=format&fit=crop",
    createdAt: new Date(Date.now() - 26 * 3600000).toISOString(), // 26 hours ago
    likesCount: 128,
    commentsCount: 32,
    isLiked: false
  }
];

// Mock suggested users
const SUGGESTED_USERS = [
  {
    id: '4',
    name: 'Emma Wilson',
    username: 'emmawilson',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'UI/UX Designer | Coffee enthusiast',
    followersCount: 2341,
    followingCount: 156
  },
  {
    id: '5',
    name: 'Michael Brown',
    username: 'michaelbrown',
    avatar: 'https://i.pravatar.cc/150?img=8',
    bio: 'Travel vlogger and photographer',
    followersCount: 5674,
    followingCount: 423
  },
  {
    id: '6',
    name: 'Olivia Davis',
    username: 'oliviadavis',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: 'Fitness coach | Nutrition specialist',
    followersCount: 3892,
    followingCount: 267
  }
];

// Mock trending topics
const TRENDING_TOPICS = [
  { tag: 'Photography', postCount: 2453 },
  { tag: 'TechNews', postCount: 1821 },
  { tag: 'MusicProduction', postCount: 1256 },
  { tag: 'DigitalArt', postCount: 987 },
  { tag: 'TravelDiaries', postCount: 754 }
];

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>(INITIAL_POSTS);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  
  const handlePostCreated = (newPost: PostData) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };
  
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
  
  const handleComment = (postId: string) => {
    toast("Comment feature coming soon!", {
      description: "We're still working on this feature.",
    });
  };
  
  const handleDeletePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    toast.success("Post deleted successfully!");
  };
  
  const handleFollowUser = (userId: string) => {
    if (followedUsers.includes(userId)) {
      setFollowedUsers(prev => prev.filter(id => id !== userId));
    } else {
      setFollowedUsers(prev => [...prev, userId]);
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Main feed */}
      <div className="lg:col-span-2 space-y-4">
        <CreatePost onPostCreated={handlePostCreated} />
        
        {posts.map(post => (
          <Post
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            onDelete={handleDeletePost}
          />
        ))}
      </div>
      
      {/* Sidebar */}
      <div className="hidden lg:block space-y-4">
        {/* Suggested users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Who to follow</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            {SUGGESTED_USERS.map(user => (
              <UserCard
                key={user.id}
                user={user}
                compact
                isFollowing={followedUsers.includes(user.id)}
                onFollow={() => handleFollowUser(user.id)}
              />
            ))}
          </CardContent>
        </Card>
        
        {/* Trending topics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trending</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {TRENDING_TOPICS.map(topic => (
                <div key={topic.tag} className="hover:bg-gray-50 p-2 rounded">
                  <a href="#" className="block">
                    <div className="font-medium">#{topic.tag}</div>
                    <div className="text-sm text-gray-500">{topic.postCount.toLocaleString()} posts</div>
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Feed;
