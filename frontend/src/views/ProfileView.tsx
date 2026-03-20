"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Heart,
  User,
  Type,
  Contrast,
  Navigation,
  ShieldCheck,
  Bell,
  Volume2,
  RotateCcw,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

import { usePreferences, type FontSize, type ContrastLevel, type NavigationMode } from "@/contexts/PreferencesContext";

const fontSizeOptions: { value: FontSize; label: string; sample: string }[] = [
  { value: "normal", label: "Normal", sample: "Aa" },
  { value: "large", label: "Grande", sample: "Aa" },
  { value: "extra-large", label: "Extra Grande", sample: "Aa" },
];

const contrastOptions: { value: ContrastLevel; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "high", label: "Alto Contraste" },
];

const navigationOptions: { value: NavigationMode; label: string; description: string }[] = [
  { value: "standard", label: "Padrão", description: "Todas as opções visíveis" },
  { value: "simplified", label: "Simplificado", description: "Apenas o essencial" },
];

export default function ProfileView() {
  const router = useRouter();
  const { preferences, updatePreference, resetPreferences } = usePreferences();

  const handleReset = () => {
    resetPreferences();
    toast.success("Preferências restauradas ao padrão! ✅");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b-2 border-border bg-card shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow">
              <Heart className="h-6 w-6 text-primary-foreground" aria-hidden />
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold text-foreground">Senior Ease</h1>
              <p className="text-sm text-muted-foreground">Meu Perfil</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-base"
              onClick={() => router.push("/dashboard")}
              aria-label="Voltar ao painel"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
              Voltar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-base"
              onClick={() => router.push("/")}
              aria-label="Sair"
            >
              <LogOut className="h-5 w-5" aria-hidden />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 pb-12">
        <Card className="border-2">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
              <User className="h-8 w-8 text-primary" aria-hidden />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">Usuário Senior Ease</p>
              <p className="text-base text-muted-foreground">usuario@email.com</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-display text-xl">
              <Type className="h-6 w-6 text-primary" aria-hidden />
              Tamanho da Fonte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-base text-muted-foreground">Escolha o tamanho de texto mais confortável para leitura.</p>
            <div className="grid grid-cols-3 gap-3">
              {fontSizeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    updatePreference("fontSize", option.value);
                    toast.success(`Fonte alterada para ${option.label}`);
                  }}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 ${
                    preferences.fontSize === option.value
                      ? "border-primary bg-primary-light"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                  aria-pressed={preferences.fontSize === option.value}
                >
                  <span
                    className={`font-bold text-foreground ${
                      option.value === "normal" ? "text-lg" : option.value === "large" ? "text-2xl" : "text-3xl"
                    }`}
                  >
                    {option.sample}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">{option.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-display text-xl">
              <Contrast className="h-6 w-6 text-primary" aria-hidden />
              Nível de Contraste
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-base text-muted-foreground">Aumente o contraste para melhor visibilidade.</p>
            <div className="grid grid-cols-2 gap-3">
              {contrastOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    updatePreference("contrast", option.value);
                    toast.success(`Contraste: ${option.label}`);
                  }}
                  className={`flex items-center justify-center gap-2 rounded-xl border-2 p-4 text-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 ${
                    preferences.contrast === option.value
                      ? "border-primary bg-primary-light text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40"
                  }`}
                  aria-pressed={preferences.contrast === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-display text-xl">
              <Navigation className="h-6 w-6 text-primary" aria-hidden />
              Modo de Navegação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-base text-muted-foreground">Escolha como deseja navegar pelo aplicativo.</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {navigationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    updatePreference("navigationMode", option.value);
                    toast.success(`Navegação: ${option.label}`);
                  }}
                  className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 ${
                    preferences.navigationMode === option.value
                      ? "border-primary bg-primary-light"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                  aria-pressed={preferences.navigationMode === option.value}
                >
                  <span className="text-lg font-semibold text-foreground">{option.label}</span>
                  <span className="text-sm text-muted-foreground">{option.description}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-display text-xl">
              <ShieldCheck className="h-6 w-6 text-primary" aria-hidden />
              Preferências Adicionais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex items-center justify-between rounded-xl border-2 border-border p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 shrink-0 text-primary" aria-hidden />
                <div>
                  <Label htmlFor="extra-confirm" className="cursor-pointer text-lg font-medium text-foreground">
                    Confirmações extras
                  </Label>
                  <p className="text-sm text-muted-foreground">Pedir confirmação antes de ações importantes</p>
                </div>
              </div>
              <Switch
                id="extra-confirm"
                checked={preferences.extraConfirmations}
                onCheckedChange={(value) => updatePreference("extraConfirmations", value)}
                className="h-8 w-14 [&>span]:h-7 [&>span]:w-7 data-[state=checked]:[&>span]:translate-x-6"
              />
            </div>

            <Separator className="my-1" />

            <div className="flex items-center justify-between rounded-xl border-2 border-border p-4">
              <div className="flex items-center gap-3">
                <Bell className="h-6 w-6 shrink-0 text-primary" aria-hidden />
                <div>
                  <Label htmlFor="reminders" className="cursor-pointer text-lg font-medium text-foreground">
                    Lembretes e notificações
                  </Label>
                  <p className="text-sm text-muted-foreground">Receber avisos de tarefas e compromissos</p>
                </div>
              </div>
              <Switch
                id="reminders"
                checked={preferences.remindersEnabled}
                onCheckedChange={(value) => updatePreference("remindersEnabled", value)}
                className="h-8 w-14 [&>span]:h-7 [&>span]:w-7 data-[state=checked]:[&>span]:translate-x-6"
              />
            </div>

            <Separator className="my-1" />

            <div className="flex items-center justify-between rounded-xl border-2 border-border p-4">
              <div className="flex items-center gap-3">
                <Volume2 className="h-6 w-6 shrink-0 text-primary" aria-hidden />
                <div>
                  <Label htmlFor="sound" className="cursor-pointer text-lg font-medium text-foreground">
                    Alertas sonoros
                  </Label>
                  <p className="text-sm text-muted-foreground">Sons ao concluir tarefas e receber lembretes</p>
                </div>
              </div>
              <Switch
                id="sound"
                checked={preferences.soundAlerts}
                onCheckedChange={(value) => updatePreference("soundAlerts", value)}
                className="h-8 w-14 [&>span]:h-7 [&>span]:w-7 data-[state=checked]:[&>span]:translate-x-6"
              />
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" size="lg" className="w-full gap-2 text-lg" onClick={handleReset}>
          <RotateCcw className="h-5 w-5" aria-hidden />
          Restaurar configurações padrão
        </Button>
      </main>
    </div>
  );
}