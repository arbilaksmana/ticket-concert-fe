import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Ticket } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative min-h-[600px] lg:min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"
          fill
          alt="Concert Experience"
          className="object-cover opacity-70"
          priority
        />
        {/* Dark gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <Badge className="rounded-full py-1.5 px-4 text-sm font-medium bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-md mb-8">
          🎉 Platform Tiket Konser #1 di Indonesia
        </Badge>

        <h1 className="max-w-4xl text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl">
          Rasakan Energi <span className="bg-yellow-400 text-white px-4 rounded-lg inline-block transform -rotate-1 mt-2 lg:mt-0">Musik Langsung</span>
        </h1>

        <p className="max-w-2xl text-lg xs:text-xl text-gray-200 mb-10 leading-relaxed drop-shadow-md">
          Temukan tiket konser termurah, jadwal tur artis favorit, dan pengalaman festival musik tak terlupakan di kotamu.
        </p>

        {/* Search Bar Container */}
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-full shadow-2xl">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              <Input
                placeholder="Cari artis, konser, atau venue..."
                className="pl-12 h-14 w-full rounded-full bg-transparent border-transparent text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:bg-white/5 transition-all text-base"
              />
            </div>
            <Button size="lg" className="h-14 rounded-full px-8 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all">
              Cari Tiket
            </Button>
          </div>
        </div>

        {/* Stats / Quick Info */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-12 text-white/90">
          <div className="flex items-center gap-2">
            <Ticket className="h-5 w-5 text-yellow-400" />
            <span className="font-medium">1000+ Event Aktif</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-yellow-400" />
            <span className="font-medium">1 Juta+ Pengguna</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-yellow-400" />
            <span className="font-medium">Jaminan Uang Kembali</span>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <span className="text-sm text-gray-300 py-1">Sedang Tren:</span>
          {['Sheila on 7', 'Coldplay', 'Java Jazz', 'DWP 2025'].map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-white border-white/30 hover:bg-white/20 cursor-pointer transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

import { ShieldCheck, Users } from "lucide-react";

export default Hero;
