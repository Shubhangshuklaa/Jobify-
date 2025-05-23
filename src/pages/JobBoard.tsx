
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, Building, Clock, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Job interface
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  description: string;
  skills: string[];
  salary: string;
}

const JobBoard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs from API
    const fetchJobs = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use mock data instead of API
        setJobs(mockJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs(mockJobs);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  // Format posted date (e.g., "2 days ago")
  const formatPostedDate = (dateString: string) => {
    const postedDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = filterLocation === "" || filterLocation === "all-locations" || job.location.includes(filterLocation);
    const matchesType = filterType === "" || filterType === "all-types" || job.type === filterType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  const handleApplyJob = async (jobId: string) => {
    if (!user) {
      toast.error("Please login to apply for jobs");
      navigate('/login');
      return;
    }
    
    try {
      // Mock successful application
      toast.success("Application submitted successfully! +5 points earned!");
    } catch (error) {
      console.error('Error applying for job:', error);
      toast.error("An error occurred while applying for the job");
    }
  };

  // Mock job data
  const mockJobs = [
    {
      id: "1",
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "2 days ago",
      description: "We're looking for a skilled frontend developer with experience in React and TypeScript to join our team.",
      skills: ["React", "TypeScript", "Tailwind CSS"],
      salary: "$80,000 - $120,000"
    },
    {
      id: "2",
      title: "Backend Engineer",
      company: "InnovateTech",
      location: "New York, NY",
      type: "Full-time",
      posted: "3 days ago",
      description: "Seeking a backend engineer proficient in Node.js and MongoDB to help build scalable services.",
      skills: ["Node.js", "MongoDB", "Express"],
      salary: "$90,000 - $130,000"
    },
    {
      id: "3",
      title: "DevOps Specialist",
      company: "Cloud Systems",
      location: "Remote",
      type: "Contract",
      posted: "1 week ago",
      description: "Looking for a DevOps engineer familiar with AWS, Docker, and CI/CD pipelines.",
      skills: ["AWS", "Docker", "Kubernetes"],
      salary: "$100,000 - $140,000"
    },
    {
      id: "4",
      title: "UI/UX Designer",
      company: "Creative Solutions",
      location: "Austin, TX",
      type: "Part-time",
      posted: "5 days ago",
      description: "Join our design team to create beautiful, intuitive user interfaces for our products.",
      skills: ["Figma", "Adobe XD", "User Research"],
      salary: "$70,000 - $100,000"
    },
    {
      id: "5",
      title: "Full Stack Developer",
      company: "WebSolutions Inc",
      location: "Chicago, IL",
      type: "Full-time",
      posted: "1 day ago",
      description: "Seeking a full stack developer with experience in React, Node.js, and MongoDB to work on our e-commerce platform.",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      salary: "$85,000 - $125,000"
    },
    {
      id: "6",
      title: "Mobile App Developer",
      company: "AppGenius",
      location: "Seattle, WA",
      type: "Full-time",
      posted: "4 days ago",
      description: "Join our mobile team to develop innovative iOS and Android applications using React Native.",
      skills: ["React Native", "JavaScript", "Mobile Development"],
      salary: "$90,000 - $130,000"
    }
  ];

  return (
    <Layout title="Job Board">
      <div className="space-y-6">
        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4 dark:bg-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search job title, company, or keywords..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Location" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-locations">All Locations</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Austin">Austin</SelectItem>
                  <SelectItem value="Chicago">Chicago</SelectItem>
                  <SelectItem value="Seattle">Seattle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Job Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Job listings */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-white">
            {filteredJobs.length} Jobs Available
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Briefcase className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No jobs found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden border border-purple-100 hover:border-purple-300 transition-colors dark:border-gray-700 dark:hover:border-gray-600 dark:bg-gray-800">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-semibold dark:text-white">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 dark:text-gray-300">
                        <Building className="h-3 w-3" /> {job.company}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800">
                      {job.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-3 space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1" /> {job.location}
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" /> {job.posted}
                  </div>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} className="bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">{job.salary}</p>
                </CardContent>
                
                <CardFooter className="pt-2 flex justify-end">
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => handleApplyJob(job.id)}
                  >
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobBoard;
