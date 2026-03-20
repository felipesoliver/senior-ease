"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  CheckCircle2,
  Clock,
  Bell,
  ListTodo,
  ChevronRight,
  PartyPopper,
  History,
  LogOut,
  Sun,
  User,
} from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  label: string;
  done: boolean;
}

interface GuidedStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface ActivityEntry {
  id: string;
  label: string;
  date: string;
}

const initialTasks: Task[] = [
  { id: "1", label: "Tomar remédio da manhã", done: false },
  { id: "2", label: "Caminhar por 20 minutos", done: false },
  { id: "3", label: "Beber 2 copos de água", done: true },
  { id: "4", label: "Ligar para a família", done: false },
];

const initialSteps: GuidedStep[] = [
  { id: 1, title: "Passo 1", description: "Pegue o remédio na caixa azul", completed: true },
  { id: 2, title: "Passo 2", description: "Tome com um copo cheio de água", completed: false },
  { id: 3, title: "Passo 3", description: "Anote no caderno que já tomou", completed: false },
];

const reminders = [
  { id: "r1", text: "Consulta médica amanhã às 14h", icon: Clock },
  { id: "r2", text: "Tomar remédio às 20h", icon: Bell },
  { id: "r3", text: "Reunião familiar no domingo", icon: Heart },
];

const initialHistory: ActivityEntry[] = [
  { id: "h1", label: "Tomou remédio da manhã", date: "Hoje, 08:15" },
  { id: "h2", label: "Caminhou 25 minutos", date: "Ontem, 09:00" },
  { id: "h3", label: "Bebeu 6 copos de água", date: "Ontem" },
  { id: "h4", label: "Ligou para a família", date: "03/03/2026" },
];

export default function DashboardView() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [steps, setSteps] = useState<GuidedStep[]>(initialSteps);
  const [history, setHistory] = useState<ActivityEntry[]>(initialHistory);

  const completedTasks = tasks.filter((task) => task.done).length;
  const progressPercent = Math.round((completedTasks / tasks.length) * 100);

  const toggleTask = (id: string) => {
    setTasks((previousTasks) => {
      const updatedTasks = previousTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      );
      const task = updatedTasks.find((currentTask) => currentTask.id === id);
      if (task?.done) {
        toast.success(`Muito bem! "${task.label}" concluída! 🎉`);
        setHistory((previousHistory) => [
          { id: `h-${Date.now()}`, label: task.label, date: "Agora" },
          ...previousHistory,
        ]);
      }
      return updatedTasks;
    });
  };

  const advanceStep = () => {
    setSteps((previousSteps) => {
      const nextIndex = previousSteps.findIndex((step) => !step.completed);
      if (nextIndex === -1) {
        return previousSteps;
      }

      const updatedSteps = previousSteps.map((step, index) =>
        index === nextIndex ? { ...step, completed: true } : step,
      );
      const isLast = nextIndex === previousSteps.length - 1;
      if (isLast) {
        toast.success("Parabéns! Você completou todas as etapas! 🎊");
      } else {
        toast.success(`"${previousSteps[nextIndex].title}" concluído!`);
      }
      return updatedSteps;
    });
  };

  const currentStepIndex = steps.findIndex((step) => !step.completed);
  const allStepsDone = currentStepIndex === -1;
  const stepsProgress = Math.round((steps.filter((step) => step.completed).length / steps.length) * 100);

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
              <p className="text-sm text-muted-foreground">Bom dia! ☀️</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-base"
              onClick={() => router.push("/profile")}
              aria-label="Meu Perfil"
            >
              <User className="h-5 w-5" aria-hidden />
              Perfil
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
            <Sun className="h-10 w-10 shrink-0 text-primary" aria-hidden />
            <div className="flex-1 space-y-2">
              <p className="text-lg font-semibold text-foreground">
                Progresso de hoje: {completedTasks} de {tasks.length} tarefas
              </p>
              <Progress value={progressPercent} className="h-4" aria-label={`${progressPercent}% concluído`} />
            </div>
            <span className="text-2xl font-bold text-primary">{progressPercent}%</span>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-display text-xl">
                <ListTodo className="h-6 w-6 text-primary" aria-hidden />
                Minhas Tarefas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 ${
                    task.done
                      ? "border-success/40 bg-success/10"
                      : "border-border bg-card hover:border-primary/40 hover:bg-primary-light"
                  }`}
                  aria-label={`${task.done ? "Concluída" : "Marcar como concluída"}: ${task.label}`}
                >
                  <Checkbox
                    checked={task.done}
                    tabIndex={-1}
                    aria-hidden
                    className="h-6 w-6 rounded-md border-2"
                  />
                  <span
                    className={`flex-1 text-lg font-medium ${
                      task.done ? "text-muted-foreground line-through" : "text-foreground"
                    }`}
                  >
                    {task.label}
                  </span>
                  {task.done && <CheckCircle2 className="h-6 w-6 text-success" aria-hidden />}
                </button>
              ))}
              <Button
                size="lg"
                className="w-full text-lg"
                onClick={() => router.push("/tasks")}
              >
                Gerenciar
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-display text-xl">
                <ChevronRight className="h-6 w-6 text-primary" aria-hidden />
                Etapas Guiadas
              </CardTitle>
              <Progress value={stepsProgress} className="mt-2 h-3" aria-label={`${stepsProgress}% das etapas concluídas`} />
            </CardHeader>
            <CardContent className="space-y-3">
              {steps.map((step, index) => {
                const isCurrent = index === currentStepIndex;
                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 rounded-xl border-2 p-4 transition-all ${
                      step.completed
                        ? "border-success/40 bg-success/10"
                        : isCurrent
                          ? "border-primary bg-primary-light"
                          : "border-border bg-card opacity-60"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                        step.completed
                          ? "bg-success text-primary-foreground"
                          : isCurrent
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.completed ? "✓" : step.id}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">{step.title}</p>
                      <p className="text-base text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                );
              })}

              {allStepsDone ? (
                <div className="flex items-center gap-3 rounded-xl border-2 border-success/40 bg-success/10 p-4">
                  <PartyPopper className="h-8 w-8 text-success" aria-hidden />
                  <p className="text-lg font-bold text-foreground">Todas as etapas concluídas! Parabéns! 🎉</p>
                </div>
              ) : (
                <Button size="lg" className="w-full text-lg" onClick={advanceStep}>
                  Concluir "{steps[currentStepIndex].title}"
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-display text-xl">
              <Bell className="h-6 w-6 text-primary" aria-hidden />
              Lembretes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center gap-4 rounded-xl border-2 border-border bg-card p-4"
              >
                <reminder.icon className="h-7 w-7 shrink-0 text-primary" aria-hidden />
                <p className="text-lg font-medium text-foreground">{reminder.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-display text-xl">
              <History className="h-6 w-6 text-primary" aria-hidden />
              Histórico de Atividades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.map((entry, index) => (
                <div key={entry.id}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" aria-hidden />
                      <span className="text-lg text-foreground">{entry.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-sm font-medium">
                      {entry.date}
                    </Badge>
                  </div>
                  {index < history.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}