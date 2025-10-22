import type { ReactNode } from "react";

export default function TestLayout({ children }: { children: ReactNode }) {
  // This layout removes the standard dashboard layout (sidebar + header)
  // to provide a full-screen, distraction-free testing experience
  return <div className="bg-background min-h-screen w-full">{children}</div>;
}
