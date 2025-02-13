import { Link } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { MobileNav } from "./mobile-nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const categories = {
  work: [
    { label: "Development & IT", href: "/work/development" },
    { label: "Design & Creative", href: "/work/design" },
    { label: "Sales & Marketing", href: "/work/marketing" },
    { label: "Writing & Translation", href: "/work/writing" },
  ],
  freelancer: [
    { label: "Find Work", href: "/freelancer/find-work" },
    { label: "Saved Jobs", href: "/freelancer/saved" },
    { label: "Proposals", href: "/freelancer/proposals" },
  ],
};

export function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { user, logoutMutation } = useAuth();

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu Button - Left */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileNavOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Logo - Center in mobile, left in desktop */}
        <div className="flex-1 md:flex-none text-center md:text-left md:pl-4">
          <Link href="/">
            <Button variant="ghost" className="px-2">
              <span className="font-bold text-xl bg-gradient-to-r from-primary-dark to-secondary-dark bg-clip-text text-transparent dark:from-primary-light dark:to-secondary-light">
                TASKURE
              </span>
            </Button>
          </Link>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:space-x-6">
          <Link href="/">
            <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-colors">
              Home
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-colors">
              About
            </Button>
          </Link>

          {/* Work Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-colors">
                Work <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {categories.work.map((item) => (
                <DropdownMenuItem key={item.href} asChild className="py-2">
                  <Link href={item.href}>
                    <span className="w-full">{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Freelancer Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-colors">
                Freelancer <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {categories.freelancer.map((item) => (
                <DropdownMenuItem key={item.href} asChild className="py-2">
                  <Link href={item.href}>
                    <span className="w-full">{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Side Actions */}
        <div className="flex flex-none items-center justify-end space-x-4">
          {!user && (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" className="hidden md:inline-flex hover:bg-button hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="hidden md:inline-flex bg-button hover:bg-button-hover-dark dark:hover:bg-button-hover-light text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          <ThemeToggle />

          {user && (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-colors">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar || undefined} />
                      <AvatarFallback>
                        {user.username?.slice(0, 2).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span>Profile</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Mobile controls are already on the right side */}
        </div>
      </div>

      <MobileNav 
        open={mobileNavOpen} 
        onClose={() => setMobileNavOpen(false)} 
        categories={categories}
        mainLinks={[{ href: "/about", label: "About" }]}
      />
    </nav>
  );
}