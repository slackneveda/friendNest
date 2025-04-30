
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthForms: React.FC = () => {
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<string>('login');
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  
  // Signup form state
  const [signupForm, setSignupForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!loginForm.username) newErrors.loginUsername = 'Username is required';
    if (!loginForm.password) newErrors.loginPassword = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const success = await login(loginForm.username, loginForm.password);
    if (success) {
      navigate('/dashboard');
    }
  };
  
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!signupForm.name) newErrors.name = 'Name is required';
    if (!signupForm.username) newErrors.username = 'Username is required';
    if (!signupForm.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(signupForm.email)) newErrors.email = 'Email is invalid';
    if (!signupForm.password) newErrors.password = 'Password is required';
    else if (signupForm.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (signupForm.password !== signupForm.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const success = await signup(
      signupForm.name,
      signupForm.username,
      signupForm.email, 
      signupForm.password
    );
    
    if (success) {
      navigate('/dashboard');
    }
  };
  
  const updateLoginForm = (field: string, value: string) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  const updateSignupForm = (field: string, value: string) => {
    setSignupForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-bold">Welcome to Pulse</CardTitle>
        <CardDescription className="text-center">Connect with friends and share moments</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={loginForm.username}
                    onChange={(e) => updateLoginForm('username', e.target.value)}
                    className={errors.loginUsername ? 'border-red-500' : ''}
                  />
                  {errors.loginUsername && <span className="text-xs text-red-500">{errors.loginUsername}</span>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => updateLoginForm('password', e.target.value)}
                    className={errors.loginPassword ? 'border-red-500' : ''}
                  />
                  {errors.loginPassword && <span className="text-xs text-red-500">{errors.loginPassword}</span>}
                </div>
                
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-pulse-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                
                <Button 
                  className="w-full bg-pulse-500 hover:bg-pulse-600" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <form onSubmit={handleSignupSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={signupForm.name}
                    onChange={(e) => updateSignupForm('name', e.target.value)}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="signup-username" className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="signup-username"
                    placeholder="Choose a username"
                    value={signupForm.username}
                    onChange={(e) => updateSignupForm('username', e.target.value)}
                    className={errors.username ? 'border-red-500' : ''}
                  />
                  {errors.username && <span className="text-xs text-red-500">{errors.username}</span>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupForm.email}
                    onChange={(e) => updateSignupForm('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="signup-password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={signupForm.password}
                    onChange={(e) => updateSignupForm('password', e.target.value)}
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={signupForm.confirmPassword}
                    onChange={(e) => updateSignupForm('confirmPassword', e.target.value)}
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                  />
                  {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword}</span>}
                </div>
                
                <Button 
                  className="w-full bg-pulse-500 hover:bg-pulse-600" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Sign Up'}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <p className="text-sm text-gray-500">
          {activeTab === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                className="text-pulse-600 hover:underline"
                onClick={() => setActiveTab('signup')}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="text-pulse-600 hover:underline"
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForms;
