"use client";

import { TaskProvider } from "features/tasks/context/TaskContext";
import ErrorBoundary from "./ErrorBoundary";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <TaskProvider>{children}</TaskProvider>
    </ErrorBoundary>
  );
}
