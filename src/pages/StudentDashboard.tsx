
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { usePoints } from '@/contexts/PointsContext';
import Layout from '@/components/Layout';
import {
  Trophy,
  Target,
  Briefcase,
  Users,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Gift,
  Zap
} from "lucide-react";
import { toast } from "sonner";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { totalPoints, rank, tasks, completeTask, pointsHistory } = usePoints();

  const nextMilestone = 1000;
  const progressToNext = (totalPoints % nextMilestone) / nextMilestone * 100;

  const handleTaskComplete = (taskId: string) => {
    completeTask(taskId);
    toast.success("Task completed! Points earned! 🎉");
  };

  const generateReferralLink = () => {
    const referralCode = Math.random().toString(36).substring(7);
    navigator.clipboard.writeText(`https://jobify.com/signup?ref=${referralCode}`);
    toast.success("Referral link copied to clipboard! Share with friends to earn 200 points!");
  };

  if (!user) return null;

  return (
    <Layout title="Student Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 🚀</h2>
              <p className="text-purple-100">Ready to level up your career today?</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-3xl font-bold">{totalPoints.toLocaleString()}</div>
              <div className="text-purple-100">Total Points</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Trophy className="w-8 h-8 text-purple-600" />
                <Badge className="bg-purple-500 text-white">Rank</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">#{rank}</div>
              <p className="text-purple-600">Global Ranking</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Target className="w-8 h-8 text-blue-600" />
                <Badge className="bg-blue-500 text-white">Tasks</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{tasks.filter(t => t.completed).length}/{tasks.length}</div>
              <p className="text-blue-600">Completed</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <Badge className="bg-green-500 text-white">Progress</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{Math.round(progressToNext)}%</div>
              <p className="text-green-600">To Next Milestone</p>
            </CardContent>
          </Card>

          <Card className="border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Star className="w-8 h-8 text-pink-600" />
                <Badge className="bg-pink-500 text-white">Level</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-900">{Math.floor(totalPoints / 100) + 1}</div>
              <p className="text-pink-600">Current Level</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-600" />
              Progress to Next Milestone
            </CardTitle>
            <CardDescription>
              {nextMilestone - (totalPoints % nextMilestone)} points to reach {Math.ceil(totalPoints / nextMilestone) * nextMilestone} points milestone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progressToNext} className="h-3 mb-4" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{totalPoints % nextMilestone} points</span>
              <span>{nextMilestone} points</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tasks Section */}
          <Card className="border-blue-200" id="tasks">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Available Tasks
              </CardTitle>
              <CardDescription>Complete tasks to earn points and climb the leaderboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-white/50"
                  >
                    <div className="flex items-center gap-3">
                      {task.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                      <div>
                        <div className="font-medium">{task.name}</div>
                        <div className="text-sm text-gray-600">{task.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={task.completed ? "default" : "secondary"}>
                        +{task.points} pts
                      </Badge>
                      {!task.completed && task.type !== 'daily' && (
                        <Button
                          size="sm"
                          onClick={() => handleTaskComplete(task.id)}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest point-earning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pointsHistory.slice(0, 6).map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div>
                      <div className="font-medium">{activity.reason}</div>
                      <div className="text-sm text-gray-500">
                        {activity.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      +{activity.points} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referrals Section */}
        <Card className="border-pink-200" id="referrals">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-pink-600" />
              Refer Friends & Earn Points
            </CardTitle>
            <CardDescription>Earn 200 points for each friend who joins through your referral link</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="text-lg font-semibold mb-2">Share your unique link</div>
                <div className="text-gray-600">Each successful referral earns you 200 points!</div>
              </div>
              <Button 
                onClick={generateReferralLink}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              >
                Generate Referral Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="h-20 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            onClick={() => window.location.href = '/jobs'}
          >
            <div className="text-center">
              <Briefcase className="w-6 h-6 mx-auto mb-1" />
              <div>Browse Jobs</div>
            </div>
          </Button>
          
          <Button 
            className="h-20 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            onClick={() => window.location.href = '/leaderboard'}
          >
            <div className="text-center">
              <Trophy className="w-6 h-6 mx-auto mb-1" />
              <div>View Leaderboard</div>
            </div>
          </Button>
          
          <Button 
            className="h-20 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
            onClick={() => window.location.href = '/profile'}
          >
            <div className="text-center">
              <Target className="w-6 h-6 mx-auto mb-1" />
              <div>Update Profile</div>
            </div>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
