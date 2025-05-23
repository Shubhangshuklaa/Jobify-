
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Briefcase } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import ThemeToggle from '@/components/ThemeToggle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // For the email to include the selected role for role-based login
      const emailWithRole = email.includes('@') 
        ? email 
        : `${email}@${selectedRole}.com`;
      
      await login(emailWithRole, password);
      toast.success('Welcome back! 🎉');
      
      // Navigate based on user role
      if (emailWithRole.includes('admin')) {
        navigate('/admin');
      } else if (emailWithRole.includes('recruiter')) {
        navigate('/recruiter');
      } else {
        navigate('/student');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Welcome to Jobify! 🚀');
      
      // For Google login, default to student role
      navigate('/student');
    } catch (error) {
      toast.error('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    // Pre-fill email with role for demo purposes
    if (!email.includes('@')) {
      setEmail(`demo@${role}.com`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
            Welcome to Jobify
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Start your gamified career journey</p>
        </div>

        <Tabs defaultValue="student" className="w-full" onValueChange={handleRoleChange}>
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Student
            </TabsTrigger>
            <TabsTrigger value="recruiter" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Recruiter
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <Card className="border-purple-200 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-purple-900">
              <CardHeader>
                <CardTitle className="text-purple-900 dark:text-purple-300">Student Login</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Access your dashboard and start earning points!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-purple-200 focus:border-purple-400 dark:border-purple-900 dark:focus:border-purple-700 dark:bg-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="dark:text-gray-300">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-purple-200 focus:border-purple-400 dark:border-purple-900 dark:focus:border-purple-700 dark:bg-gray-900"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/30"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                  >
                    Continue with Google
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recruiter">
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-blue-900">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-300">Recruiter Login</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Find top talent and manage job postings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="recruiter-email" className="dark:text-gray-300">Email</Label>
                    <Input
                      id="recruiter-email"
                      type="email"
                      placeholder="recruiter@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-blue-200 focus:border-blue-400 dark:border-blue-900 dark:focus:border-blue-700 dark:bg-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="recruiter-password" className="dark:text-gray-300">Password</Label>
                    <Input
                      id="recruiter-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-blue-200 focus:border-blue-400 dark:border-blue-900 dark:focus:border-blue-700 dark:bg-gray-900"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                  >
                    Continue with Google
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card className="border-green-200 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-green-900">
              <CardHeader>
                <CardTitle className="text-green-900 dark:text-green-300">Admin Login</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Manage platform and monitor analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="admin-email" className="dark:text-gray-300">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@jobify.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-green-200 focus:border-green-400 dark:border-green-900 dark:focus:border-green-700 dark:bg-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-password" className="dark:text-gray-300">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-green-200 focus:border-green-400 dark:border-green-900 dark:focus:border-green-700 dark:bg-gray-900"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          <p>Demo credentials:</p>
          <p>Student: demo@student.com / any password</p>
          <p>Recruiter: demo@recruiter.com / any password</p>
          <p>Admin: demo@admin.com / any password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
