import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Link } from "wouter";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string }>;
}

export function MobileNav({ open, onClose, links }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left">
        <div className="flex flex-col space-y-4 mt-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={onClose}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
