
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Image } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface CreatePostProps {
  onPostCreated?: (post: any) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setContent('');
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && !selectedImage) {
      toast.error('Please add some content to your post');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock post object
      const newPost = {
        id: `post-${Date.now()}`,
        author: {
          id: user?.id || '',
          name: user?.name || '',
          username: user?.username || '',
          avatar: user?.avatar || '',
        },
        content: content,
        image: imagePreview,
        createdAt: new Date().toISOString(),
        likesCount: 0,
        commentsCount: 0,
        isLiked: false
      };
      
      if (onPostCreated) {
        onPostCreated(newPost);
      }
      
      toast.success('Post created successfully!');
      resetForm();
    } catch (error) {
      toast.error('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  if (!user) return null;

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-start">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea
                placeholder="What's happening?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[100px] p-2 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-pulse-500"
              />
              
              {imagePreview && (
                <div className="relative mt-2 rounded-md overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="max-h-60 w-auto" />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                  <label htmlFor="image-upload" className="cursor-pointer p-2 rounded-full hover:bg-gray-100 text-gray-500">
                    <Image className="h-5 w-5" />
                    <span className="sr-only">Add Image</span>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="bg-pulse-500 hover:bg-pulse-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
