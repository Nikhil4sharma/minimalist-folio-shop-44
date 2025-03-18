
import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Signup = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup submitted');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-navy text-white">
        <Navbar />
        
        <section className="pt-28 pb-12 px-4">
          <div className="container mx-auto max-w-md">
            <Card className="bg-navy-light border border-white/10">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-white">Create an account</CardTitle>
                <CardDescription className="text-gray-300">
                  Enter your information to create an account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-white">First Name</Label>
                      <Input 
                        id="first-name" 
                        placeholder="John" 
                        required 
                        className="bg-navy-dark border-white/10 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-white">Last Name</Label>
                      <Input 
                        id="last-name" 
                        placeholder="Doe" 
                        required 
                        className="bg-navy-dark border-white/10 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
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
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      className="bg-navy-dark border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      required 
                      className="bg-navy-dark border-white/10 text-white"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
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
                  <Button type="submit" className="w-full rounded-full bg-cyan hover:bg-cyan-light">
                    Create Account
                  </Button>
                </form>
                
                <div className="mt-4 text-center text-sm">
                  <span className="text-gray-300">Already have an account? </span>
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
    </ThemeProvider>
  );
};

export default Signup;
