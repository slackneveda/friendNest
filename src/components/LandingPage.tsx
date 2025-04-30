
import React from 'react';
import { Button } from '@/components/ui/button';
import AuthForms from './AuthForms';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-background border-b py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-xl font-bold">P</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">Pulse</h1>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="hidden md:flex space-x-2">
              <Button variant="outline" onClick={() => navigate('/login')} className="border-primary text-primary hover:bg-primary/10">
                Login
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex flex-col md:flex-row items-center container mx-auto px-4 py-12">
        <div className="w-full md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Connect, Share, and Engage in Real-Time
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Join Pulse and connect with friends, share your moments, and stay updated with what matters most to you.
            Experience real-time interactions in a beautiful, user-friendly environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6">
              Get Started
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6">
              Learn More
            </Button>
          </div>

          <div className="mt-12">
            <h3 className="font-semibold text-xl mb-4">Why choose Pulse?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary/20 p-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Real-time updates</h4>
                  <p className="text-muted-foreground text-sm">See posts and interactions as they happen</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary/20 p-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">User-friendly design</h4>
                  <p className="text-muted-foreground text-sm">Beautiful interface that's easy to navigate</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary/20 p-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Vibrant community</h4>
                  <p className="text-muted-foreground text-sm">Connect with people who share your interests</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary/20 p-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Privacy focused</h4>
                  <p className="text-muted-foreground text-sm">Control who sees your content</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-md">
            <AuthForms />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-xl font-bold">P</span>
              </div>
              <span className="text-xl font-bold text-primary">Pulse</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary">About</a>
              <a href="#" className="text-muted-foreground hover:text-primary">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-primary">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-primary">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Pulse Social. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
