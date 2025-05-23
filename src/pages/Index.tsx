import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Trophy, Users, Briefcase, Star, ArrowRight, Target, Zap, Award } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950 dark:via-blue-950 dark:to-pink-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Jobify
            </span>
          </div>
          <div className="flex space-x-3 items-center">
            <ThemeToggle />
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
            🎮 Gamified Career Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Turn Your Career Journey Into An Adventure
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Earn points, climb leaderboards, and land your dream job. The first gamified job portal that makes career building fun and rewarding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg"
            >
              Start Earning Points <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/leaderboard')}
              className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg"
            >
              View Leaderboard <Trophy className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Why Choose Jobify?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience career building like never before with our innovative point-based system
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-purple-100 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-purple-900">Gamified Tasks</CardTitle>
              <CardDescription>
                Complete daily challenges, upload resumes, and refer friends to earn points and climb the leaderboard.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-blue-100 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-blue-900">Smart Job Matching</CardTitle>
              <CardDescription>
                AI-powered job recommendations based on your skills, experience, and points earned through platform activities.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-pink-100 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-pink-900">Competitive Rankings</CardTitle>
              <CardDescription>
                Real-time leaderboards filtered by skills, college, and experience level to showcase your achievements.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
            <div className="text-gray-600">Active Students</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Partner Companies</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">2M+</div>
            <div className="text-gray-600">Points Awarded</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-100">
            <div className="text-3xl font-bold text-pink-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg">Simple steps to start your gamified career journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Sign Up & Complete Profile</h3>
            <p className="text-gray-600">Create your account and earn your first 50 points by completing your profile</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Complete Tasks & Earn Points</h3>
            <p className="text-gray-600">Daily check-ins, job applications, referrals - every action earns you points</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Climb Rankings & Get Hired</h3>
            <p className="text-gray-600">Rise through the leaderboards and get noticed by top recruiters</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-purple-100 dark:border-purple-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Jobify
              </span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              © 2024 Jobify. Gamifying careers worldwide.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
