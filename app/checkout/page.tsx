"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import {
    Calendar,
    MapPin,
    Ticket,
    ArrowLeft,
    CreditCard,
    Loader2,
    ShieldCheck,
    Clock,
    CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { graphqlRequest, CREATE_ORDER } from "@/lib/graphql";
import Script from "next/script";

// Midtrans Client Key from environment
const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "SB-Mid-client-YOUR_CLIENT_KEY";

// Extend window for Midtrans Snap
declare global {
    interface Window {
        snap: {
            pay: (
                token: string,
                options: {
                    onSuccess: (result: unknown) => void;
                    onPending: (result: unknown) => void;
                    onError: (result: unknown) => void;
                    onClose: () => void;
                }
            ) => void;
        };
    }
}

interface OrderItem {
    ticketTypeId: string;
    name: string;
    quantity: number;
    price: number;
}

interface PendingOrder {
    concertId: string;
    concertTitle: string;
    items: OrderItem[];
    totalPrice: number;
}

function formatPrice(price: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(price);
}

export default function CheckoutPage() {
    const router = useRouter();
    const { user, token, isAuthenticated, isLoading: authLoading } = useAuth();
    const [pendingOrder, setPendingOrder] = useState<PendingOrder | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snapReady, setSnapReady] = useState(false);

    useEffect(() => {
        // Redirect if not authenticated
        if (!authLoading && !isAuthenticated) {
            router.push("/login");
            return;
        }

        // Load pending order from localStorage
        const stored = localStorage.getItem("pendingOrder");
        if (stored) {
            try {
                const order = JSON.parse(stored) as PendingOrder;
                if (order.items.length === 0) {
                    router.push("/concerts");
                    return;
                }
                setPendingOrder(order);
            } catch {
                router.push("/concerts");
            }
        } else {
            router.push("/concerts");
        }
    }, [authLoading, isAuthenticated, router]);

    const getTotalItems = () => {
        if (!pendingOrder) return 0;
        return pendingOrder.items.reduce((sum, item) => sum + item.quantity, 0);
    };

    const handlePayment = async () => {
        if (!pendingOrder || !user || !token) return;

        setIsProcessing(true);
        setError(null);

        try {
            // Create expiration time (30 minutes from now)
            const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

            // Prepare order items for GraphQL
            const orderItems = pendingOrder.items.map((item) => ({
                ticketTypeId: item.ticketTypeId,
                qty: item.quantity,
                unitPrice: item.price,
                subtotal: item.quantity * item.price,
            }));

            // Step 1: Create order via GraphQL
            const orderResult = await graphqlRequest<{
                createOrder: {
                    id: string;
                    midtransOrderId: string;
                    status: string;
                    grossAmount: number;
                };
            }>(CREATE_ORDER, {
                input: {
                    userId: user.id,
                    concertId: pendingOrder.concertId,
                    grossAmount: pendingOrder.totalPrice,
                    expiresAt,
                    items: orderItems,
                },
            });

            const orderId = orderResult.createOrder.id;

            // Step 2: Create Midtrans payment token
            const paymentResponse = await fetch(
                `http://localhost:4000/payments/${orderId}/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const paymentData = await paymentResponse.json();

            if (!paymentResponse.ok) {
                throw new Error(paymentData.message || "Gagal membuat pembayaran");
            }

            const snapToken = paymentData.data.token;

            // Step 3: Open Midtrans Snap popup
            if (window.snap && snapReady) {
                window.snap.pay(snapToken, {
                    onSuccess: async (result) => {
                        console.log("Payment success:", result);

                        // Verify payment and generate tickets
                        try {
                            const verifyResponse = await fetch(
                                `http://localhost:4000/payments/${orderId}/verify`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );
                            const verifyData = await verifyResponse.json();
                            console.log("Payment verification:", verifyData);
                        } catch (verifyError) {
                            console.error("Verification error:", verifyError);
                        }

                        // Store completed order for success page
                        localStorage.setItem(
                            "completedOrder",
                            JSON.stringify({
                                orderId: orderId,
                                midtransOrderId: orderResult.createOrder.midtransOrderId,
                                concertTitle: pendingOrder.concertTitle,
                                items: pendingOrder.items,
                                totalPrice: pendingOrder.totalPrice,
                            })
                        );
                        localStorage.removeItem("pendingOrder");
                        router.push("/payment/success");
                    },
                    onPending: async (result) => {
                        console.log("Payment pending:", result);

                        // Store order info for pending state
                        localStorage.setItem(
                            "completedOrder",
                            JSON.stringify({
                                orderId: orderId,
                                midtransOrderId: orderResult.createOrder.midtransOrderId,
                                concertTitle: pendingOrder.concertTitle,
                                items: pendingOrder.items,
                                totalPrice: pendingOrder.totalPrice,
                                isPending: true,
                            })
                        );
                        localStorage.removeItem("pendingOrder");
                        router.push("/payment/success");
                    },
                    onError: (result) => {
                        console.error("Payment error:", result);
                        setError("Pembayaran gagal. Silakan coba lagi.");
                        setIsProcessing(false);
                    },
                    onClose: () => {
                        console.log("Payment popup closed");
                        setIsProcessing(false);
                    },
                });
            } else {
                throw new Error("Midtrans Snap belum siap. Silakan refresh halaman.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Gagal memproses pesanan");
            setIsProcessing(false);
        }
    };

    if (authLoading || !pendingOrder) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">Memuat checkout...</p>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            {/* Midtrans Snap Script */}
            <Script
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key={MIDTRANS_CLIENT_KEY}
                onLoad={() => {
                    console.log("Midtrans Snap loaded");
                    setSnapReady(true);
                }}
                onError={() => {
                    console.error("Failed to load Midtrans Snap");
                    setError("Gagal memuat payment gateway");
                }}
            />

            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
                <div className="container mx-auto max-w-4xl py-8 px-6">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href={`/concerts/${pendingOrder.concertId}`}
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Detail Konser
                        </Link>
                        <h1 className="text-3xl font-bold">Checkout</h1>
                        <p className="text-muted-foreground mt-1">
                            Selesaikan pembelian tiket Anda
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Left Column - Order Details */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Event Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Ticket className="w-5 h-5" />
                                        Detail Event
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <h3 className="text-xl font-bold mb-3">{pendingOrder.concertTitle}</h3>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-primary" />
                                            <span>Lihat detail tanggal di halaman konser</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-primary" />
                                            <span>Lihat detail lokasi di halaman konser</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Ticket Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Detail Tiket</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {pendingOrder.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center py-3 border-b last:border-0"
                                            >
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {formatPrice(item.price)} × {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="font-semibold">
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Buyer Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informasi Pembeli</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Nama</span>
                                            <span className="font-medium">{user?.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Email</span>
                                            <span className="font-medium">{user?.email}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-4">
                                        E-Ticket akan dikirim ke email di atas setelah pembayaran berhasil.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Payment Summary */}
                        <div className="lg:col-span-2">
                            <Card className="sticky top-20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="w-5 h-5" />
                                        Ringkasan Pembayaran
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Subtotal ({getTotalItems()} tiket)
                                            </span>
                                            <span>{formatPrice(pendingOrder.totalPrice)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Biaya Admin</span>
                                            <span className="text-green-600">Gratis</span>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="flex justify-between">
                                            <span className="font-semibold">Total Bayar</span>
                                            <span className="text-2xl font-bold text-primary">
                                                {formatPrice(pendingOrder.totalPrice)}
                                            </span>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <Button
                                        className="w-full h-12 text-base"
                                        onClick={handlePayment}
                                        disabled={isProcessing || !snapReady}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Memproses...
                                            </>
                                        ) : !snapReady ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Memuat Payment...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                Bayar Sekarang
                                            </>
                                        )}
                                    </Button>

                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <ShieldCheck className="w-4 h-4 text-green-600" />
                                            <span>Transaksi aman & terenkripsi</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Clock className="w-4 h-4 text-yellow-600" />
                                            <span>Selesaikan dalam 30 menit</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <CreditCard className="w-4 h-4 text-blue-600" />
                                            <span>Powered by Midtrans</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
