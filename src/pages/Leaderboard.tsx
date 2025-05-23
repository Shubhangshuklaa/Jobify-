import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Trophy, Filter, Star } from "lucide-react";
import { useState } from "react";

// Mock leaderboard data
const mockStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
    college: "Tech University",
    points: 3850,
    rank: 1,
    skills: ["JavaScript", "React", "Node.js"],
    referrals: 5
  },
  {
    id: "2",
    name: "Samantha Lee",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    college: "Code Academy",
    points: 3720,
    rank: 2,
    skills: ["Python", "Django", "AWS"],
    referrals: 4
  },
  {
    id: "3",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    college: "Tech University",
    points: 3540,
    rank: 3,
    skills: ["Java", "Spring", "Docker"],
    referrals: 3
  },
  {
    id: "4",
    name: "Rachel Green",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    college: "Design Institute",
    points: 3210,
    rank: 4,
    skills: ["UI/UX", "Figma", "Sketch"],
    referrals: 6
  },
  {
    id: "5",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    college: "Tech University",
    points: 2980,
    rank: 5,
    skills: ["C++", "Python", "Data Science"],
    referrals: 2
  },
  {
    id: "6",
    name: "Emily Garcia",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    college: "Code Academy",
    points: 2740,
    rank: 6,
    skills: ["JavaScript", "Vue.js", "MongoDB"],
    referrals: 3
  }
];

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCollege, setFilterCollege] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  const [category, setCategory] = useState("points");

  const filteredStudents = mockStudents
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCollege = filterCollege === "" || filterCollege === "all-colleges" || student.college === filterCollege;
      const matchesSkill = filterSkill === "" || filterSkill === "all-skills" || student.skills.includes(filterSkill);
      
      return matchesSearch && matchesCollege && matchesSkill;
    })
    .sort((a, b) => {
      if (category === "points") {
        return b.points - a.points;
      } else if (category === "referrals") {
        return b.referrals - a.referrals;
      }
      return 0;
    });

  return (
    <Layout title="Leaderboard">
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="h-12 w-12 text-yellow-300 mr-3" />
              <h1 className="text-3xl font-bold">Student Leaderboard</h1>
            </div>
            <p className="text-center opacity-90">
              Compete with fellow students and earn points by completing tasks and making referrals!
            </p>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search by name..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:w-2/3">
              <Select value={filterCollege} onValueChange={setFilterCollege}>
                <SelectTrigger>
                  <SelectValue placeholder="College/University" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-colleges">All Colleges</SelectItem>
                  <SelectItem value="Tech University">Tech University</SelectItem>
                  <SelectItem value="Code Academy">Code Academy</SelectItem>
                  <SelectItem value="Design Institute">Design Institute</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterSkill} onValueChange={setFilterSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-skills">All Skills</SelectItem>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="React">React</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Java">Java</SelectItem>
                  <SelectItem value="UI/UX">UI/UX</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs 
            defaultValue="points" 
            value={category}
            onValueChange={setCategory}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="points">By Points</TabsTrigger>
              <TabsTrigger value="referrals">By Referrals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="points" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Top Students by Points</CardTitle>
                  <CardDescription>
                    Students who have accumulated the most task points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Rank</th>
                          <th className="text-left py-3 px-4">Student</th>
                          <th className="text-left py-3 px-4 hidden md:table-cell">College</th>
                          <th className="text-left py-3 px-4 hidden md:table-cell">Skills</th>
                          <th className="text-right py-3 px-4">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((student, index) => (
                          <tr key={student.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                {index === 0 && <Trophy className="h-5 w-5 text-yellow-500 mr-1" />}
                                {index === 1 && <Trophy className="h-5 w-5 text-gray-400 mr-1" />}
                                {index === 2 && <Trophy className="h-5 w-5 text-amber-700 mr-1" />}
                                {index > 2 && <span className="text-gray-600 font-semibold">{index + 1}</span>}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <img 
                                  src={student.avatar} 
                                  alt={student.name} 
                                  className="w-10 h-10 rounded-full mr-3 object-cover"
                                />
                                <span className="font-medium">{student.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 hidden md:table-cell">{student.college}</td>
                            <td className="py-4 px-4 hidden md:table-cell">
                              <div className="flex flex-wrap gap-1">
                                {student.skills.slice(0, 2).map((skill, i) => (
                                  <Badge key={i} variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                                    {skill}
                                  </Badge>
                                ))}
                                {student.skills.length > 2 && (
                                  <Badge variant="outline" className="bg-gray-50 text-gray-600">
                                    +{student.skills.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="font-semibold text-purple-700">{student.points.toLocaleString()}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="referrals" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Top Students by Referrals</CardTitle>
                  <CardDescription>
                    Students who have made the most successful referrals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Rank</th>
                          <th className="text-left py-3 px-4">Student</th>
                          <th className="text-left py-3 px-4 hidden md:table-cell">College</th>
                          <th className="text-right py-3 px-4">Referrals</th>
                          <th className="text-right py-3 px-4">Points Earned</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((student, index) => (
                          <tr key={student.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                {index === 0 && <Star className="h-5 w-5 text-yellow-500 mr-1" />}
                                {index === 1 && <Star className="h-5 w-5 text-gray-400 mr-1" />}
                                {index === 2 && <Star className="h-5 w-5 text-amber-700 mr-1" />}
                                {index > 2 && <span className="text-gray-600 font-semibold">{index + 1}</span>}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <img 
                                  src={student.avatar} 
                                  alt={student.name} 
                                  className="w-10 h-10 rounded-full mr-3 object-cover"
                                />
                                <span className="font-medium">{student.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 hidden md:table-cell">{student.college}</td>
                            <td className="py-4 px-4 text-right">
                              <span className="font-semibold text-blue-700">{student.referrals}</span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="font-semibold text-green-700">{(student.referrals * 200).toLocaleString()}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
