"use client";
import Provider from "@/components/Provider";
import NavHeader from "@/components/Nav/NavHeader";
import Slidebar from "@/components/slidebarComponents/Slidebar";
import SideMenuBar from "@/components/slidebarComponents/SiderMenuBar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Provider>
      <div className="flex h-screen flex-col">
        <header className="z-10 flex h-[60px] shrink-0 items-center border-b bg-background px-4">
          <NavHeader />
        </header>
        <main className="flex h-full w-full overflow-hidden">
          <div className="h-full z-30">
            <SideMenuBar />
          </div>
          <div className="ml-14 w-full flex overflow-scroll z-0">
            {pathname == "/gen/screen/TemplateOne" && <Slidebar />}

            {children}
          </div>
        </main>
      </div>
    </Provider>
  );
}
