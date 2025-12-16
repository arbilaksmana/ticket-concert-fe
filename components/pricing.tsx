import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Calendar, MapPin, Ticket } from "lucide-react";
import Image from "next/image";

const events = [
  {
    id: 1,
    name: "Sheila on 7 - Tunggu Aku Di...",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1974&auto=format&fit=crop",
    date: "12 Agt 2025",
    location: "GBK Senayan, Jakarta",
    price: "Rp 450.000",
    category: "Pop",
    isSellingFast: true,
  },
  {
    id: 2,
    name: "Java Jazz Festival 2025",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070&auto=format&fit=crop",
    date: "28 Feb 2025",
    location: "JIExpo Kemayoran",
    price: "Rp 1.250.000",
    category: "Jazz",
    isSellingFast: false,
  },
  {
    id: 3,
    name: "Dewa 19 - Pesta Rakyat",
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=2070&auto=format&fit=crop",
    date: "15 Sep 2025",
    location: "JIS, Jakarta",
    price: "Rp 350.000",
    category: "Rock",
    isSellingFast: true,
  },
  {
    id: 4,
    name: "Raisa Live in Concert",
    image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
    date: "10 Nov 2025",
    location: "Tennis Indoor Senayan",
    price: "Rp 600.000",
    category: "Pop",
    isSellingFast: false,
  },
  {
    id: 5,
    name: "DWP 2025 - Djakarta Warehouse",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop",
    date: "13 Des 2025",
    location: "GWK Cultural Park, Bali",
    price: "Rp 1.800.000",
    category: "EDM",
    isSellingFast: true,
  },
  {
    id: 6,
    name: "Soundrenaline 2025",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f436?q=80&w=2070&auto=format&fit=crop",
    date: "20 Okt 2025",
    location: "Allianz Ecopark Ancol",
    price: "Rp 950.000",
    category: "Festival",
    isSellingFast: false,
  },
];

const Pricing = () => {
  return (
    <div id="events" className="max-w-(--breakpoint-xl) mx-auto py-12 xs:py-20 px-6">
      <div className="flex items-center justify-between mb-8 xs:mb-12">
        <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold tracking-tight">
          Konser Pilihan
        </h2>
        <Button variant="ghost" className="hidden sm:flex text-primary">
          Lihat Semua &rarr;
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card
            key={event.id}
            className="group relative overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Badge variant="secondary" className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90">
                {event.category}
              </Badge>
              {event.isSellingFast && (
                <Badge variant="destructive" className="absolute top-3 right-3 shadow-md">
                  Terlaris
                </Badge>
              )}
            </div>

            <CardHeader className="p-4 pb-2">
              <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
                {event.name}
              </h3>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                {event.date}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                {event.location}
              </div>
              <div className="flex items-center font-semibold text-lg mt-2 text-primary">
                {event.price}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                Beli Tiket
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center sm:hidden">
        <Button variant="outline" className="w-full">
          Lihat Semua Event
        </Button>
      </div>
    </div>
  );
};

export default Pricing;
