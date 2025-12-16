import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-1 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      <NavItem href="/" label="Beranda" />
      <NavItem href="#events" label="Konser" />
      <NavItem href="#features" label="Tentang Kami" />
      <NavItem href="#testimonials" label="Ulasan" />
      <NavItem href="#faq" label="Bantuan" />
    </NavigationMenuList>
  </NavigationMenu>
);

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <NavigationMenuItem>
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className={cn(
          "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
        )}
      >
        {label}
      </Link>
    </NavigationMenuLink>
  </NavigationMenuItem>
);
