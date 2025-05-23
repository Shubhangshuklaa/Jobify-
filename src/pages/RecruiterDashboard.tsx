
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Briefcase, Users, UserCog } from "lucide-react";

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'recruiter') {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);

  if (!user || user.role !== 'recruiter') return null;

  return (
    <Layout title="Recruiter Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Jobs</CardTitle>
              <CardDescription>Jobs you have posted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">5</span>
                <Briefcase className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Applications</CardTitle>
              <CardDescription>Received applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">32</span>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Analytics</CardTitle>
              <CardDescription>Job engagement stats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">428</span>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="jobs">
          <TabsList className="mb-4">
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Posted Jobs</h2>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Briefcase className="mr-2 h-4 w-4" /> Post New Job
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Senior Frontend Developer</CardTitle>
                <CardDescription>Posted 2 days ago • 12 applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">We're looking for an experienced frontend developer with React expertise to join our team.</p>
                <div className="flex gap-2">
                  <Badge className="bg-blue-100 text-blue-800">React</Badge>
                  <Badge className="bg-green-100 text-green-800">TypeScript</Badge>
                  <Badge className="bg-purple-100 text-purple-800">Remote</Badge>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm">View Applications</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DevOps Engineer</CardTitle>
                <CardDescription>Posted 5 days ago • 8 applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Looking for a DevOps engineer familiar with AWS, Docker, and CI/CD pipelines.</p>
                <div className="flex gap-2">
                  <Badge className="bg-blue-100 text-blue-800">AWS</Badge>
                  <Badge className="bg-green-100 text-green-800">Docker</Badge>
                  <Badge className="bg-purple-100 text-purple-800">Hybrid</Badge>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm">View Applications</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Manage candidate applications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  You have 32 pending applications to review.
                </p>
                
                {/* Application listings would go here */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">John Doe</h4>
                      <p className="text-sm text-muted-foreground">Applied for: Senior Frontend Developer</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Profile</Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">Schedule Interview</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Jane Smith</h4>
                      <p className="text-sm text-muted-foreground">Applied for: DevOps Engineer</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Profile</Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">Schedule Interview</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Job Performance</CardTitle>
                <CardDescription>Stats and insights about your job postings</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-muted-foreground">Analytics data visualization will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RecruiterDashboard;
