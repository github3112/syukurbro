"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Feather } from "lucide-react";


export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(email, password);
      toast({
        title: "Asik! Akun berhasil dibuat.",
        description: "Sekarang lo bisa login, bro.",
      });
      router.push("/login");
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Gagal Daftar",
        description: error.message,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="flex items-center gap-3 mb-8">
          <Feather className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-headline font-bold text-foreground tracking-tight">
              SyukurBro
          </h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Daftar Akun</CardTitle>
          <CardDescription>
            Bikin akun baru buat mulai nyatet rasa syukur lo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@bro.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Bentar..." : "Daftar"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Udah punya akun?{' '}
            <Link href="/login" className="underline">
              Login di sini
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
