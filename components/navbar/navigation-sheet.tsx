"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { VisuallyHidden as VisuallyHiddenPrimitive } from "radix-ui";
import { Menu, User, LogOut, Ticket, LayoutDashboard, ShoppingBag } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const NavigationSheet = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Sheet>
      <VisuallyHiddenPrimitive.Root>
        <SheetTitle>Navigation Drawer</SheetTitle>
      </VisuallyHiddenPrimitive.Root>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <Logo />

        {/* User Profile Section - Only shown when logged in */}
        {isAuthenticated && user && (
          <div className="mt-6 p-4 bg-accent/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <NavMenu orientation="vertical" className="mt-6" />

        <div className="mt-auto pt-8 space-y-3">
          {isLoading ? (
            <div className="h-10 bg-muted animate-pulse rounded-md" />
          ) : isAuthenticated && user ? (
            <>
              {/* Quick Actions for logged in users */}
              <div className="space-y-2 pb-4 border-b">
                <SheetClose asChild>
                  <Link href="/dashboard/tickets" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors">
                    <Ticket className="w-5 h-5 text-primary" />
                    <span>Tiket Saya</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/dashboard/orders" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    <span>Riwayat Pesanan</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors">
                    <LayoutDashboard className="w-5 h-5 text-primary" />
                    <span>Dashboard</span>
                  </Link>
                </SheetClose>
              </div>

              {/* Logout Button */}
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full text-destructive border-destructive/50 hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </Button>
              </SheetClose>
            </>
          ) : (
            <>
              {/* Guest buttons */}
              <SheetClose asChild>
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Masuk
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/register" className="block">
                  <Button className="w-full">
                    Daftar Sekarang
                  </Button>
                </Link>
              </SheetClose>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
