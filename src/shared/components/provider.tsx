"use client";

import { TaskProvider } from "features/tasks/context/TaskContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <TaskProvider>{children}</TaskProvider>;
}
