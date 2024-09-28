import HomeBox from "@/components/HomeBoxComponent/HomeBox";
import NavHeader from "@/components/Nav/NavHeader";
import Slidebar from "@/components/slidebarComponents/Slidebar";
import React from "react";

function page({ params }: { params: { slug: string } }) {
  const param = params.slug;
  return (
    <div className="flex h-screen flex-col">
      <header className="z-50 flex h-[60px] shrink-0 items-center border-b bg-background px-4">
        <NavHeader templateName={param} />
      </header>
      <main className="flex h-full w-full overflow-hidden">
        <Slidebar templateName={param} />
        <HomeBox mySlug={param} />
      </main>
    </div>
  );
}

export default page;
