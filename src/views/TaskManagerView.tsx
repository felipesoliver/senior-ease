"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCurrentUser, isLoggedIn } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Heart,
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  ListTodo,
  CheckCircle2,
  Circle,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner";
import { defaultTasks, loadTasks, saveTasks, type Task } from "@/lib/tasks";

export default function TaskManagerView() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/");
    }
  }, [router]);

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [hasLoadedTasks, setHasLoadedTasks] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskLabel, setTaskLabel] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setTasks(loadTasks(getCurrentUser()));
    setHasLoadedTasks(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedTasks) {
      return;
    }

    saveTasks(tasks, getCurrentUser());
  }, [hasLoadedTasks, tasks]);

  const updateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  const openCreate = () => {
    setEditingTask(null);
    setTaskLabel("");
    setDialogOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setTaskLabel(task.label);
    setDialogOpen(true);
  };

  const handleSave = () => {
    const trimmed = taskLabel.trim();
    if (!trimmed) {
      toast.error("Por favor, digite o nome da tarefa.");
      return;
    }

    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? { ...task, label: trimmed } : task,
      );
      updateTasks(updatedTasks);
      toast.success("Tarefa atualizada com sucesso! ✏️");
    } else {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        label: trimmed,
        done: false,
      };
      updateTasks([...tasks, newTask]);
      toast.success("Nova tarefa criada! 🎉");
    }

    setDialogOpen(false);
    setTaskLabel("");
    setEditingTask(null);
  };

  const handleDelete = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    updateTasks(updatedTasks);
    setDeleteConfirm(null);
    toast.success("Tarefa removida.");
  };

  const toggleDone = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    );
    updateTasks(updatedTasks);
    const task = updatedTasks.find((currentTask) => currentTask.id === id);
    if (task?.done) {
      toast.success(`"${task.label}" marcada como concluída! ✅`);
    }
  };

  const pendingTasks = tasks.filter((task) => !task.done);
  const completedTasks = tasks.filter((task) => task.done);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b-2 border-border bg-card shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow">
              <Heart className="h-6 w-6 text-primary-foreground" aria-hidden />
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold text-foreground">Gerenciar Tarefas</h1>
              <p className="text-sm text-muted-foreground">Crie, edite ou remova suas tarefas</p>
            </div>
          </div>
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
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 pb-12">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-foreground">
            {tasks.length} {tasks.length === 1 ? "tarefa" : "tarefas"} no total
          </p>
          <Button size="lg" className="gap-2 text-lg" onClick={openCreate}>
            <Plus className="h-6 w-6" aria-hidden />
            Nova Tarefa
          </Button>
        </div>

        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-display text-xl">
              <ListTodo className="h-6 w-6 text-primary" aria-hidden />
              Tarefas Pendentes
              <Badge variant="secondary" className="ml-auto text-base">
                {pendingTasks.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-success" aria-hidden />
                <p className="text-lg font-semibold text-foreground">Nenhuma tarefa pendente! 🎉</p>
                <p className="text-base text-muted-foreground">
                  Todas as tarefas foram concluídas ou você pode criar uma nova.
                </p>
              </div>
            ) : (
              pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 rounded-xl border-2 border-border bg-card p-4 transition-all hover:border-primary/40 hover:bg-primary-light"
                >
                  <GripVertical className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
                  <button
                    onClick={() => toggleDone(task.id)}
                    className="shrink-0 rounded-full p-1 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
                    aria-label={`Marcar "${task.label}" como concluída`}
                  >
                    <Circle className="h-6 w-6 text-muted-foreground" />
                  </button>
                  <span className="flex-1 text-lg font-medium text-foreground">{task.label}</span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(task)} aria-label={`Editar tarefa "${task.label}"`}>
                      <Pencil className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteConfirm(task.id)}
                      aria-label={`Remover tarefa "${task.label}"`}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {completedTasks.length > 0 && (
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-display text-xl">
                <CheckCircle2 className="h-6 w-6 text-success" aria-hidden />
                Tarefas Concluídas
                <Badge variant="secondary" className="ml-auto text-base">
                  {completedTasks.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {completedTasks.map((task, index) => (
                <div key={task.id}>
                  <div className="flex items-center gap-3 rounded-xl border-2 border-success/30 bg-success/5 p-4">
                    <button
                      onClick={() => toggleDone(task.id)}
                      className="shrink-0 rounded-full p-1 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
                      aria-label={`Desmarcar "${task.label}"`}
                    >
                      <CheckCircle2 className="h-6 w-6 text-success" />
                    </button>
                    <span className="flex-1 text-lg font-medium text-muted-foreground line-through">{task.label}</span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(task)} aria-label={`Editar tarefa "${task.label}"`}>
                        <Pencil className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteConfirm(task.id)}
                        aria-label={`Remover tarefa "${task.label}"`}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  {index < completedTasks.length - 1 && <Separator className="my-1" />}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{editingTask ? "Editar Tarefa" : "Nova Tarefa"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <label className="block text-lg font-semibold text-foreground">Nome da tarefa</label>
            <Input
              value={taskLabel}
              onChange={(event) => setTaskLabel(event.target.value)}
              placeholder="Ex: Tomar remédio às 8h"
              autoFocus
              onKeyDown={(event) => event.key === "Enter" && handleSave()}
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button variant="outline" size="lg" className="text-lg">
                Cancelar
              </Button>
            </DialogClose>
            <Button size="lg" className="text-lg" onClick={handleSave}>
              {editingTask ? "Salvar" : "Criar Tarefa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirm !== null} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Remover Tarefa</DialogTitle>
          </DialogHeader>
          <p className="text-lg text-foreground">
            Tem certeza que deseja remover esta tarefa? Esta ação não pode ser desfeita.
          </p>
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button variant="outline" size="lg" className="text-lg">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              size="lg"
              className="text-lg"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Sim, Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}