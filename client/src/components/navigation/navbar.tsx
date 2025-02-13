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

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="flex-none">
          <Link href="/">
            <Button variant="ghost" className="p-0">
              <span className="font-bold text-xl">FreelanceHub</span>
            </Button>
          </Link>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:space-x-6">
          {/* Centered main links */}
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
          <Link href="/auth/login">
            <Button variant="ghost" className="hidden md:inline-flex hover:bg-primary/10">
              Login
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="hidden md:inline-flex bg-primary hover:bg-[#EE4932] transition-colors">
              Sign Up
            </Button>
          </Link>

          <ThemeToggle />

          {/* Profile Dropdown - Only show when logged in */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>FH</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileNavOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
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