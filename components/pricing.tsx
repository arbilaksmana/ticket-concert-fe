"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Calendar, MapPin, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { graphqlRequest, GET_PUBLISHED_CONCERTS, Concert } from "@/lib/graphql";

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "-";
  try {
    const timestamp = parseInt(dateString, 10);
    const date = !isNaN(timestamp) ? new Date(timestamp) : new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "-";
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

// Placeholder images for concerts without images
const placeholderImages = [
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f436?q=80&w=2070&auto=format&fit=crop",
];

const Pricing = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConcerts();
  }, []);

  async function fetchConcerts() {
    try {
      const data = await graphqlRequest<{ publishedConcerts: Concert[] }>(
        GET_PUBLISHED_CONCERTS
      );
      // Get first 6 concerts for featured section
      setConcerts(data.publishedConcerts.slice(0, 6));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat konser");
    } finally {
      setIsLoading(false);
    }
  }

  // Get lowest ticket price from concert
  const getLowestPrice = (concert: Concert): number => {
    if (!concert.ticketTypes || concert.ticketTypes.length === 0) return 0;
    return Math.min(...concert.ticketTypes.map((t) => t.price));
  };

  // Get image for concert (use placeholder if not available)
  const getConcertImage = (index: number): string => {
    return placeholderImages[index % placeholderImages.length];
  };

  if (isLoading) {
    return (
      <div id="events" className="max-w-(--breakpoint-xl) mx-auto py-12 xs:py-20 px-6">
        <div className="flex items-center justify-between mb-8 xs:mb-12">
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold tracking-tight">
            Konser Pilihan
          </h2>
        </div>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || concerts.length === 0) {
    return (
      <div id="events" className="max-w-(--breakpoint-xl) mx-auto py-12 xs:py-20 px-6">
        <div className="flex items-center justify-between mb-8 xs:mb-12">
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold tracking-tight">
            Konser Pilihan
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {error || "Belum ada konser tersedia"}
          </p>
          <Link href="/concerts">
            <Button>Jelajahi Konser</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="events" className="max-w-(--breakpoint-xl) mx-auto py-12 xs:py-20 px-6">
      <div className="flex items-center justify-between mb-8 xs:mb-12">
        <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold tracking-tight">
          Konser Pilihan
        </h2>
        <Link href="/concerts">
          <Button variant="ghost" className="hidden sm:flex text-primary">
            Lihat Semua &rarr;
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {concerts.map((concert, index) => {
          const lowestPrice = getLowestPrice(concert);

          return (
            <Link key={concert.id} href={`/concerts/${concert.id}`}>
              <Card className="group relative overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={getConcertImage(index)}
                    alt={concert.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge
                    variant="secondary"
                    className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90"
                  >
                    {concert.status === "PUBLISHED" ? "Tersedia" : concert.status}
                  </Badge>
                </div>

                <CardHeader className="p-4 pb-2">
                  <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
                    {concert.title}
                  </h3>
                </CardHeader>
                <CardContent className="p-4 pt-1 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    {formatDate(concert.startAt)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    {concert.venue}
                  </div>
                  {lowestPrice > 0 && (
                    <div className="flex items-center font-semibold text-lg mt-2 text-primary">
                      Mulai {formatPrice(lowestPrice)}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    Beli Tiket
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
      <div className="mt-8 flex justify-center sm:hidden">
        <Link href="/concerts" className="w-full">
          <Button variant="outline" className="w-full">
            Lihat Semua Event
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Pricing;
