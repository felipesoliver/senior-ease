"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn, Heart } from "lucide-react";
import { toast } from "sonner";
import { setLoggedIn, isLoggedIn } from "@/lib/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha todos os campos.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoggedIn(email.trim().toLowerCase());
      toast.success("Bem-vindo de volta!");
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo / Brand */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Heart className="h-10 w-10 text-primary-foreground" aria-hidden="true" />
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground">
            Senior Ease
          </h1>
          <p className="text-lg text-muted-foreground">
            Bem vindo! Por favor, faça login para iniciar.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border-2 border-border bg-card p-8 shadow-xl space-y-6"
          aria-label="Login form"
        >
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-semibold text-foreground">
              Endereço de email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              aria-required="true"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-lg font-semibold text-foreground">
              Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                aria-required="true"
                className="pr-14"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Forgot password link */}
          <div className="text-right">
            <Button variant="link" type="button" className="text-base px-0 h-auto">
              Esqueceu a senha?
            </Button>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="xl"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-pulse">Iniciando…</span>
            ) : (
              <>
                <LogIn aria-hidden="true" />
                Login
              </>
            )}
          </Button>

          {/* Sign up prompt */}
          <p className="text-center text-lg text-muted-foreground">
            Não possui uma conta?{" "}
            <Button variant="link" type="button" className="text-lg px-0 h-auto font-bold">
              Crie uma
            </Button>
          </p>
        </form>

        {/* Accessibility note */}
        <p className="text-center text-base text-muted-foreground">
          Precisa de ajuda? Entre em contato{" "}
          <a
            href="tel:+08001234567"
            className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            0-800-123-4567
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
