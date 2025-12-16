"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import {
    Settings,
    Loader2,
    CheckCircle2,
    ArrowLeft,
    Shield,
    User,
    Mail,
    Calendar,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

function formatDate(dateString: string | null | undefined): string {
    if (!dateString) return "-";
    try {
        const timestamp = parseInt(dateString, 10);
        const date = !isNaN(timestamp) ? new Date(timestamp) : new Date(dateString);
        if (isNaN(date.getTime())) return "-";
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    } catch {
        return "-";
    }
}

export default function SettingsPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/");
        }
    }, [authLoading, isAuthenticated, router]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    if (authLoading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">Memuat...</p>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background">
                <div className="container mx-auto max-w-2xl py-8 px-6">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Dashboard
                        </Link>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Settings className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-3xl font-bold">Pengaturan</h1>
                        </div>
                        <p className="text-muted-foreground">
                            Lihat informasi akun Anda
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Account Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Informasi Akun
                                </CardTitle>
                                <CardDescription>
                                    Data profil Anda yang terdaftar di sistem
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Nama</p>
                                            <p className="font-medium">{user?.name || "-"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="font-medium">{user?.email || "-"}</p>
                                        </div>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Bergabung Sejak</p>
                                            <p className="font-medium">{formatDate(user?.createdAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Security */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    Keamanan
                                </CardTitle>
                                <CardDescription>
                                    Kelola keamanan akun Anda
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Status Akun</p>
                                        <p className="text-sm text-muted-foreground">Akun Anda aktif dan terverifikasi</p>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Role</p>
                                        <p className="text-sm text-muted-foreground capitalize">
                                            {user?.role?.toLowerCase() || "User"}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Logout */}
                        <Card className="border-destructive/20">
                            <CardHeader>
                                <CardTitle className="text-destructive">Zona Bahaya</CardTitle>
                                <CardDescription>
                                    Tindakan yang tidak dapat dibatalkan
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Keluar dari Akun</p>
                                        <p className="text-sm text-muted-foreground">
                                            Anda akan keluar dari sesi ini
                                        </p>
                                    </div>
                                    <Button variant="destructive" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
