"use client";
import React from "react";
import {
  BarChart,
  File,
  ImageIcon,
  Languages,
  LucideHome,
  Package2,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

function SideMenuBar() {
  const pathname = usePathname();
  return (
    <aside className="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <a
          href="/"
          className="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
        >
          <LucideHome className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">home</span>
        </a>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="/gen/screen/TemplateOne"
                className={`${
                  pathname == "/gen/screen/TemplateOne"
                    ? "bg-accent text-accent-foreground "
                    : "text-muted-foreground"
                } hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8`}
              >
                <ImageIcon className="h-5 w-5" />
                <span className="sr-only">screen shot</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">screen shot</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="/gen/localization"
                className={`${
                  pathname == "/gen/localization"
                    ? "bg-accent text-accent-foreground "
                    : "text-muted-foreground"
                }  hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8`}
              >
                <File className="h-5 w-5" />
                <span className="sr-only">Localization File</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Localization File</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      {/* <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="##"
            className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
          >
            <LucideHome className="h-5 w-5" />
            <span className="sr-only">Dashboard</span>
          </a>
        </TooltipTrigger>
        <TooltipContent side="right">Dashboard</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </nav> */}
    </aside>
  );
}

export default SideMenuBar;
