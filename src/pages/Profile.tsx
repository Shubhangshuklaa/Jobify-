import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState("I'm a passionate student looking for opportunities in tech.");
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [education, setEducation] = useState(user?.college || "");
  const [experience, setExperience] = useState(user?.experience || "");
  
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <Layout title="My Profile">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Your Profile</CardTitle>
                <CardDescription>Manage your personal information and settings</CardDescription>
              </div>
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-100">
                <img 
                  src={user.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`} 
                  alt={user.name} 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="personal">
          <TabsList className="mb-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
            <TabsTrigger value="settings">Account Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    value={user.email}
                    readOnly 
                    disabled
                  />
                  <p className="text-xs text-gray-500">Your email cannot be changed</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="education">College / University</Label>
                  <Input 
                    id="education" 
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600" onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Experience</CardTitle>
                <CardDescription>Add your skills and work experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                      >
                        {skill}
                        <button 
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-purple-700 hover:text-purple-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a new skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <Button onClick={handleAddSkill} variant="outline">Add</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select
                    value={experience}
                    onValueChange={setExperience}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fresher">Fresher</SelectItem>
                      <SelectItem value="1-2 years">1-2 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="5+ years">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume / CV</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 p-4 border border-dashed rounded-md text-center">
                      <p className="text-sm text-gray-500">
                        Drag and drop your resume here, or click to select a file
                      </p>
                      <Input 
                        type="file" 
                        id="resume" 
                        className="hidden" 
                      />
                    </div>
                    <Button variant="outline">Upload</Button>
                  </div>
                  <p className="text-xs text-gray-500">Maximum file size: 5MB. Accepted formats: PDF, DOCX</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600" onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Notifications</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="newJobs" className="rounded text-purple-600" defaultChecked />
                      <Label htmlFor="newJobs">Notify me about new job postings</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="pointUpdates" className="rounded text-purple-600" defaultChecked />
                      <Label htmlFor="pointUpdates">Point updates and achievements</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="referrals" className="rounded text-purple-600" defaultChecked />
                      <Label htmlFor="referrals">Referral conversions</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Change Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Current password" />
                </div>
                
                <div className="space-y-2">
                  <Input placeholder="New password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Input placeholder="Confirm new password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  Delete Account
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
