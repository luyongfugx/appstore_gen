import HomeBox from "@/components/HomeBoxComponent/HomeBox";
import NavHeader from "@/components/Nav/NavHeader";
import Slidebar from "@/components/slidebarComponents/Slidebar";
import React from "react";

function page({ params }: { params: { slug: string } }) {
  // console.log(params.slug);
  const param = params.slug;
  return (
    <>
      <header className="py-5 bg-gray-200  fixed h-12 w-full flex justify-end ">
        <NavHeader />
      </header>
      <div className="h-12"></div>
      <main className="h-full w-full flex  items-start justify-start">
        <Slidebar />
        <HomeBox mySlug={param} />
      </main>
    </>
  );
}

export default page;
