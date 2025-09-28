'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  const handleSignIn = async (formData: FormData) => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });
      
      if (error) throw error;
      if (!user) throw new Error('No user returned after sign in');

      setMessage({ type: 'success', text: 'Signed in successfully!' });
      
      // Check if user is admin and redirect accordingly
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('user_id', user.id)
        .single<{ role: string }>();

      if (profileError) throw profileError;

      if (profile?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (formData: FormData) => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
          data: {
            full_name: formData.get('fullName') as string,
          },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error('No user returned after sign up');

      // Create user profile with proper typing
      const userProfile = {
        user_id: data.user.id,
        full_name: formData.get('fullName') as string,
        role: 'user', // Default role
      };
      
      // Use type assertion to bypass the TypeScript error
      const { error: profileError } = await (supabase
        .from('user_profiles') as any)
        .insert([userProfile]);

      if (profileError) throw profileError;

      setMessage({
        type: 'success',
        text: 'Account created successfully! Please check your email to confirm your account.',
      });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F504B] via-[#5A8A84] to-[#D8E3E0] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to FabriiQ
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form action={handleSignIn} className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                handleSignIn(new FormData(e.currentTarget));
              }}>
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input 
                    id="signin-email" 
                    name="email" 
                    type="email" 
                    placeholder="you@example.com"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input 
                    id="signin-password" 
                    name="password" 
                    type="password" 
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#1F504B] hover:bg-[#5A8A84]" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form action={handleSignUp} className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                handleSignUp(new FormData(e.currentTarget));
              }}>
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input 
                    id="signup-name" 
                    name="fullName" 
                    type="text" 
                    placeholder="Your full name"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input 
                    id="signup-email" 
                    name="email" 
                    type="email" 
                    placeholder="you@example.com"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input 
                    id="signup-password" 
                    name="password" 
                    type="password" 
                    required 
                    minLength={6}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#1F504B] hover:bg-[#5A8A84]" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {message && (
            <Alert className={`mt-4 ${message.type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
              <AlertDescription className={message.type === 'error' ? 'text-red-700' : 'text-green-700'}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600">
          <div className="w-full">
            <p>For admin access, please contact your system administrator.</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}