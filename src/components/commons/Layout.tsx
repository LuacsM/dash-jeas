// Layout.tsx

import { ReactNode } from "react";
import { Dashboard } from "./Dashboard";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Dashboard>
      {children}
    </Dashboard>
  );
};
