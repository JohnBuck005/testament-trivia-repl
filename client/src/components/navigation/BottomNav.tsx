import { Church, Play, Users, UserCircle, ScrollText, Home } from "lucide-react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Church, label: "Home", href: "/" },
    { icon: Play, label: "Play", href: "/game" },
    { icon: Users, label: "Versus", href: "/versus", tooltip: "Thou shalt not lose" },
    { icon: ScrollText, label: "Knowledge", href: "/knowledge" },
    { icon: UserCircle, label: "Profile", href: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 nav-glass z-50">
      <div className="flex justify-around items-center py-3 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <button
                className={cn(
                  "flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300",
                  isActive 
                    ? "text-yellow-400 bg-white/10 scale-105" 
                    : "text-white/70 hover:text-white hover:bg-white/5 hover:scale-105"
                )}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}