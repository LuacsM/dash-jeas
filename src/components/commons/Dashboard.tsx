import React, { ReactNode, useState } from 'react';
import Link from "next/link";
import { Menu, User, Briefcase, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardProps {
  children: ReactNode;
}

export function Dashboard({ children }: DashboardProps) {
  const [active, setActive] = useState("Estudante");

  const getLinkClasses = (name: string) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
      active === name
        ? "bg-slate-700 text-white"
        : "text-muted-foreground hover:text-primary"
    }`;

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20">
        <nav className="bg-[#0c142c] p-4 shadow-lg relative md:px-8 h-full">
          <div className="container mx-auto flex items-center h-full">
            <div className="flex items-center justify-start w-1/2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5 text-white" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <nav className="grid gap-2 text-lg font-medium p-4">
                    <Link href="/" className="text-white text-2xl md:text-4xl font-bold">JEAS</Link>
                    <Link href="/" className={getLinkClasses("Estudante")} onClick={() => setActive("Estudante")}>
                      <User className="h-4 w-4" />
                      Estudante
                    </Link>
                    <Link href="/servidor" className={getLinkClasses("Servidor")} onClick={() => setActive("Servidor")}>
                      <Briefcase className="h-4 w-4" />
                      Servidor
                    </Link>
                    <Link href="/arbitro" className={getLinkClasses("Árbitro")} onClick={() => setActive("Árbitro")}>
                      <Shield className="h-4 w-4" />
                      Árbitro
                    </Link>
                    <Link href="/externos" className={getLinkClasses("Integrante Externo")} onClick={() => setActive("Integrante Externo")}>
                      <ExternalLink className="h-4 w-4" />
                      Integrante Externo
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <Link href="/" className="text-white text-2xl md:text-4xl font-bold hidden md:block">JEAS</Link>
            </div>
            <div className="flex items-center justify-end w-1/2">
              <picture>
                <source srcSet="/logo.svg" type="image/svg+xml" />
                <source srcSet="/logo@2x.png 2x, /logo.png 1x" type="image/png" />
                <img src="/logo.png" alt="Amazonas Logo" className="h-8 md:h-12" />
              </picture>
            </div>
          </div>
        </nav>
      </header>
      <div className="flex-1 flex flex-col md:flex-row">
        <nav className="hidden md:flex flex-col gap-2 p-4 w-60 bg-slate-800 text-white h-full fixed top-20 md:top-20 left-0">
          <Link href="/" className={getLinkClasses("Estudante")} onClick={() => setActive("Estudante")}>
            <User className="h-4 w-4" />
            Estudante
          </Link>
          <Link href="/servidor" className={getLinkClasses("Servidor")} onClick={() => setActive("Servidor")}>
            <Briefcase className="h-4 w-4" />
            Servidor
          </Link>
          <Link href="/arbitro" className={getLinkClasses("Árbitro")} onClick={() => setActive("Árbitro")}>
            <Shield className="h-4 w-4" />
            Árbitro
          </Link>
          <Link href="/externos" className={getLinkClasses("Integrante Externo")} onClick={() => setActive("Integrante Externo")}>
            <ExternalLink className="h-4 w-4" />
            Integrante Externo
          </Link>
        </nav>
        <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-6 mt-16 md:mt-20 md:ml-60">
          {children}
        </main>
      </div>
    </div>
  );
}
