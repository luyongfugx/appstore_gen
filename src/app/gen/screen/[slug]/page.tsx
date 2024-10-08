import HomeBox from "@/components/HomeBoxComponent/HomeBox";
import React from "react";

function page({ params }: { params: { slug: string } }) {
  const param = params.slug;
  return <HomeBox mySlug={param} />;
}

export default page;
