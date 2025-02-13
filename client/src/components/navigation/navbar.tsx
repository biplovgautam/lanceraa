import { Link } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { MobileNav } from "./mobile-nav";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/recruit", label: "Recruit" },
  { href: "/work", label: "Work" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <a className="mr-8 flex items-center space-x-2">
            <span className="font-bold text-xl">FreelanceHub</span>
          </a>
        </Link>

        <div className="hidden md:flex md:space-x-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="text-sm font-medium transition-colors hover:text-primary">
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileNavOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} links={links} />
    </nav>
  );
}
