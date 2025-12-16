import { Button } from "@/components/ui/button";
import { PlusCircle, User } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import ThemeToggle from "../theme-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 h-16 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="h-full flex items-center justify-between container mx-auto px-4 sm:px-6">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <NavMenu />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div className="hidden sm:flex items-center gap-3">
            <Link href="#">
              <Button variant="outline" className="text-muted-foreground hover:text-foreground">
                <User className="w-4 h-4 mr-2" />
                Masuk
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
