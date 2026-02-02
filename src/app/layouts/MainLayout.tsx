import type { ReactNode } from "react";
import { AppHeaderNavigation } from "@/app/components/AppHeaderNavigation";

interface Props {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <article className="w-full min-h-lvh bg-primary">
      <AppHeaderNavigation />
      {children}
    </article>
  );
}
