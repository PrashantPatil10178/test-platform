import type { ReactNode } from "react";

export default function TestLayout({ children }: { children: ReactNode }) {
  return <div className="bg-background min-h-screen w-full">{children}</div>;
}
