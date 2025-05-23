
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Trophy,
  Briefcase,
  Users,
  Target,
  BarChart3,
  User,
  UserPlus,
  Star
} from "lucide-react";

interface NavigationProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navigation = ({ sidebarOpen, setSidebarOpen }: NavigationProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const getNavigationItems = () => {
    switch (user.role) {
      case 'student':
        return [
          { icon: Home, label: 'Dashboard', path: '/student' },
          { icon: Briefcase, label: 'Job Board', path: '/jobs' },
          { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
          { icon: Target, label: 'Tasks', path: '/student#tasks' },
          { icon: UserPlus, label: 'Referrals', path: '/student#referrals' },
          { icon: User, label: 'Profile', path: '/profile' },
        ];
      case 'recruiter':
        return [
          { icon: Home, label: 'Dashboard', path: '/recruiter' },
          { icon: Briefcase, label: 'My Jobs', path: '/recruiter#jobs' },
          { icon: Users, label: 'Applications', path: '/recruiter#applications' },
          { icon: Star, label: 'Top Candidates', path: '/leaderboard' },
          { icon: BarChart3, label: 'Analytics', path: '/recruiter#analytics' },
        ];
      case 'admin':
        return [
          { icon: Home, label: 'Dashboard', path: '/admin' },
          { icon: Users, label: 'User Management', path: '/admin#users' },
          { icon: Target, label: 'Task Config', path: '/admin#tasks' },
          { icon: Briefcase, label: 'Job Management', path: '/admin#jobs' },
          { icon: BarChart3, label: 'Analytics', path: '/admin#analytics' },
          { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 w-64 bg-sidebar backdrop-blur-md border-r border-sidebar-border transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 pt-20 md:pt-6">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path || 
                             (item.path.includes('#') && location.pathname === item.path.split('#')[0]);
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left",
                    isActive 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
