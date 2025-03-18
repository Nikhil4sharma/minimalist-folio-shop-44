
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await signIn(email, password);
      navigate('/profile');
    } catch (error) {
      console.error("Login error:", error);
      // Error is already handled in the signIn function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy">
      <Navbar />
      
      <section className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-navy dark:text-white">Login to your account</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Enter your email and password to login
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-navy dark:text-white">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com" 
                    required 
                    className="bg-white dark:bg-navy-dark border-gray-300 dark:border-white/10 text-navy dark:text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-navy dark:text-white">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-cyan hover:text-cyan-light">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="bg-white dark:bg-navy-dark border-gray-300 dark:border-white/10 text-navy dark:text-white"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full rounded-full bg-cyan hover:bg-cyan-light"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm">
                <span className="text-gray-600 dark:text-gray-300">Don't have an account? </span>
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
  );
};

export default Login;
