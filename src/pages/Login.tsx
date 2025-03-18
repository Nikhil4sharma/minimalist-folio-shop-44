
import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-navy text-white">
        <Navbar />
        
        <section className="pt-28 pb-12 px-4">
          <div className="container mx-auto max-w-md">
            <Card className="bg-navy-light border border-white/10">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-white">Login to your account</CardTitle>
                <CardDescription className="text-gray-300">
                  Enter your email and password to login
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      required 
                      className="bg-navy-dark border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <Link to="/forgot-password" className="text-sm text-cyan hover:text-cyan-light">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      className="bg-navy-dark border-white/10 text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-full bg-cyan hover:bg-cyan-light">
                    Sign In
                  </Button>
                </form>
                
                <div className="mt-4 text-center text-sm">
                  <span className="text-gray-300">Don't have an account? </span>
                  <Link to="/signup" className="text-cyan hover:text-cyan-light font-medium">
                    Sign up
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Login;
