"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

// Menu items for guests (not logged in)
const guestMenuItems = [
  { href: "/", label: "Beranda" },
  { href: "/concerts", label: "Konser" },
  { href: "#features", label: "Tentang Kami" },
  { href: "#testimonials", label: "Ulasan" },
  { href: "#faq", label: "Bantuan" },
];

// Menu items for authenticated users
const userMenuItems = [
  { href: "/concerts", label: "Jelajahi Konser" },
  { href: "/dashboard/tickets", label: "Tiket Saya" },
  { href: "/dashboard/orders", label: "Riwayat Pesanan" },
  { href: "/dashboard", label: "Profil Saya" },
];

export const NavMenu = (props: NavigationMenuProps) => {
  const { isAuthenticated } = useAuth();

  const menuItems = isAuthenticated ? userMenuItems : guestMenuItems;

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-1 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {menuItems.map((item) => (
          <NavItem key={item.href} href={item.href} label={item.label} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

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
