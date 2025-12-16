import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Ticket,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const footerSections = [
  {
    title: "Tentang Kami",
    links: [
      { title: "Tentang ConcertTicketing", href: "#" },
      { title: "Blog", href: "#" },
      { title: "Karir", href: "#" },
      { title: "Partner", href: "#" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { title: "Pusat Bantuan", href: "#" },
      { title: "Syarat & Ketentuan", href: "#" },
      { title: "Kebijakan Privasi", href: "#" },
      { title: "Hubungi Kami", href: "#" },
    ],
  },
  {
    title: "Kategori Event",
    links: [
      { title: "Konser Musik", href: "#" },
      { title: "Festival", href: "#" },
      { title: "Teater & Seni", href: "#" },
      { title: "Atraksi", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-16 bg-card border-t pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-1.5 rounded-lg">
                <Ticket className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">ConcertTicketing</span>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-sm">
              Platform pembelian tiket konser terpercaya no. 1 di Indonesia.
              Nikmati kemudahan akses ke ribuan event musik spektakuler dengan transaksi aman dan cepat.
            </p>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Jl. Jend. Sudirman No. Kav 52-53, Jakarta Selatan</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@concertticketing.id</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>(021) 500-123</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-6 text-foreground">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-border/50" />

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} ConcertTicketing Indonesia. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} />
            <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
            <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} />
            <SocialLink href="#" icon={<Youtube className="h-5 w-5" />} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <Link
    href={href}
    className="h-10 w-10 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
  >
    {icon}
  </Link>
);

export default Footer;
