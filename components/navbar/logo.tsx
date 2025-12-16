import { Ticket } from "lucide-react";
import Link from "next/link";

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2">
    <div className="bg-primary p-1.5 rounded-lg">
      <Ticket className="h-6 w-6 text-primary-foreground" />
    </div>
    <span className="font-bold text-xl tracking-tight">ConcertTicketing</span>
  </Link>
);
