export interface Task {
  id: string;
  label: string;
  done: boolean;
}

export const TASKS_STORAGE_KEY = "senior-ease-tasks";

export const defaultTasks: Task[] = [
  { id: "1", label: "Tomar remédio da manhã", done: false },
  { id: "2", label: "Caminhar por 20 minutos", done: false },
  { id: "3", label: "Beber 2 copos de água", done: true },
  { id: "4", label: "Ligar para a família", done: false },
];

export function loadTasks(): Task[] {
  if (typeof window === "undefined") {
    return defaultTasks;
  }

  try {
    const stored = window.localStorage.getItem(TASKS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultTasks;
  } catch {
    return defaultTasks;
  }
}

export function saveTasks(tasks: Task[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}