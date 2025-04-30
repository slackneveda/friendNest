
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export interface PostData {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

interface PostProps {
  post: PostData;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onDelete?: (postId: string) => void;
}

const Post: React.FC<PostProps> = ({ post, onLike, onComment, onDelete }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  const handleLike = () => {
    if (onLike) onLike(post.id);
    
    // Optimistic UI update
    setIsLiked(prev => !prev);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    
    if (!isLiked) {
      toast(`You liked ${post.author.name}'s post`, {
        description: "Notification sent",
        duration: 2000,
      });
    }
  };

  const handleComment = () => {
    if (onComment) onComment(post.id);
  };

  const handleShare = () => {
    toast("Link copied to clipboard!", {
      description: `Share this post from ${post.author.name}`,
      duration: 2000,
    });
  };

  const handleDelete = () => {
    if (onDelete) onDelete(post.id);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const isAuthor = user?.id === post.author.id;

  return (
    <Card className="mb-4 overflow-hidden card-hover">
      <CardHeader className="p-4 pb-0 flex flex-row items-center space-y-0">
        <Link to={`/profile/${post.author.username}`} className="flex items-center flex-grow">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm text-gray-500">
              @{post.author.username} · {formatDate(post.createdAt)}
            </p>
          </div>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isAuthor ? (
              <>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                  Delete
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Hide</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-4">
        <p className="whitespace-pre-wrap mb-3">{post.content}</p>
        {post.image && (
          <div className="rounded-md overflow-hidden">
            <img src={post.image} alt="Post content" className="w-full h-auto" />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-2 border-t flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={isLiked ? 'text-red-500' : ''}
        >
          <Heart className={`mr-2 h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likesCount}</span>
        </Button>

        <Button variant="ghost" size="sm" onClick={handleComment}>
          <MessageCircle className="mr-2 h-5 w-5" />
          <span>{post.commentsCount}</span>
        </Button>

        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share className="mr-2 h-5 w-5" />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
