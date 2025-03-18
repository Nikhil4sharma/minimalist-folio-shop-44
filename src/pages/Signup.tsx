
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms and conditions to continue",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await signUp(email, password, `${firstName} ${lastName}`);
      navigate('/login');
    } catch (error) {
      console.error("Signup error:", error);
      // Error is already handled in the signUp function
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
              <CardTitle className="text-2xl font-bold text-navy dark:text-white">Create an account</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-navy dark:text-white">First Name</Label>
                    <Input 
                      id="first-name" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John" 
                      required 
                      className="bg-white dark:bg-navy-dark border-gray-300 dark:border-white/10 text-navy dark:text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-navy dark:text-white">Last Name</Label>
                    <Input 
                      id="last-name" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe" 
                      required 
                      className="bg-white dark:bg-navy-dark border-gray-300 dark:border-white/10 text-navy dark:text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
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
                  <Label htmlFor="password" className="text-navy dark:text-white">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="bg-white dark:bg-navy-dark border-gray-300 dark:border-white/10 text-navy dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-navy dark:text-white">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                    className="bg-white dark:bg-navy-dark border-gray-300 dark:border-white/10 text-navy dark:text-white"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600 dark:text-gray-300"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-cyan hover:text-cyan-light">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-cyan hover:text-cyan-light">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full rounded-full bg-cyan hover:bg-cyan-light"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm">
                <span className="text-gray-600 dark:text-gray-300">Already have an account? </span>
                <Link to="/login" className="text-cyan hover:text-cyan-light font-medium">
                  Sign in
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

export default Signup;
