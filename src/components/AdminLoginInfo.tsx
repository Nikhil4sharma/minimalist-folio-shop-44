
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, CheckCircle } from 'lucide-react';
import { getAdminCredentials, createAndLoginAdmin } from '@/utils/adminUtils';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export function AdminLoginInfo() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [copied, setCopied] = useState<{ email: boolean; password: boolean }>({ email: false, password: false });
  const { email, password } = getAdminCredentials();

  const copyToClipboard = async (text: string, field: 'email' | 'password') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied({ ...copied, [field]: true });
      
      toast({
        title: 'Copied to clipboard',
        description: `${field === 'email' ? 'Email' : 'Password'} has been copied to clipboard.`,
      });
      
      setTimeout(() => {
        setCopied({ ...copied, [field]: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleLoginAsAdmin = async () => {
    const success = await createAndLoginAdmin(email, password);
    
    if (success) {
      toast({
        title: 'Admin login successful',
        description: 'You have been granted admin privileges.',
      });
      navigate('/admin');
    } else {
      toast({
        title: 'Admin login failed',
        description: 'Failed to create or login as admin. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-cyan/10 hover:bg-cyan/20 text-cyan border-cyan">
          Admin Access
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Access</DialogTitle>
          <DialogDescription>
            Use these credentials to log in with admin privileges
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Admin Credentials</CardTitle>
            <CardDescription>These are for demonstration purposes only</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <div className="flex">
                <Input
                  id="admin-email"
                  value={email}
                  readOnly
                  className="rounded-r-none"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-l-none border-l-0"
                  onClick={() => copyToClipboard(email, 'email')}
                >
                  {copied.email ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <div className="flex">
                <Input
                  id="admin-password"
                  value={password}
                  type="password"
                  readOnly
                  className="rounded-r-none"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-l-none border-l-0"
                  onClick={() => copyToClipboard(password, 'password')}
                >
                  {copied.password ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLoginAsAdmin} className="w-full bg-cyan hover:bg-cyan-light">
              Login as Admin
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
