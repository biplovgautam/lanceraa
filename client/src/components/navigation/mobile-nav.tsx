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

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  categories: Categories;
  mainLinks: Array<{ href: string; label: string }>;
}

export function MobileNav({ open, onClose, categories, mainLinks }: MobileNavProps) {
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
        </nav>
      </SheetContent>
    </Sheet>
  );
}