import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Category {
  label: string;
  href: string;
}

interface Categories {
  work: Category[];
  freelancer: Category[];
}

import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  categories: Categories;
  mainLinks: Array<{ href: string; label: string }>;
}

export function MobileNav({ open, onClose, categories, mainLinks }: MobileNavProps) {
  const { user } = useAuth();
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={onClose}
            >
              Home
            </Button>
          </Link>
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={onClose}
              >
                {link.label}
              </Button>
            </Link>
          ))}

          <Accordion type="single" collapsible>
            <AccordionItem value="work">
              <AccordionTrigger>Work Categories</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  {categories.work.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start pl-4"
                        onClick={onClose}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="freelancer">
              <AccordionTrigger>Freelancer</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  {categories.freelancer.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start pl-4"
                        onClick={onClose}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Profile Section */}
          {user && (
            <div className="mt-4 pt-4 border-t">
              <Accordion type="single" collapsible>
                <AccordionItem value="profile">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatar || undefined} />
                        <AvatarFallback>
                          {user.username?.slice(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.username}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      <Link href="/dashboard">
                        <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/profile">
                        <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
                          Profile
                        </Button>
                      </Link>
                      <Link href="/settings">
                        <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
                          Settings
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => {
                          logoutMutation.mutate();
                          onClose();
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}