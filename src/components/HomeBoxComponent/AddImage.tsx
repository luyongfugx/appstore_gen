"use client";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useMyContext } from "@/lib/Context";
import ImageCrop from "./ImageCrop";

function AddImage({ templateName }) {
  const {
    banner,
    count,
    setMyImg,
    lang,
    crouLength,
    templateDatas,
    setTemplateDatas,
  } = useMyContext();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const img = document.getElementById(`image${count}`);
    if (img?.className !== "hidden") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [count, crouLength]);
  const tempData = templateDatas[templateName ?? ""];
  const item: any = tempData.screenData![lang][count > 1 ? count - 1 : 0];

  return (
    <>
      {show && (
        <div className="space-y-1 flex flex-row justify-around ">
          <div className="bg-gray-400 h-14 aspect-video relative">
            <Image
              src={item.bannerUrl == "" ? banner : item.bannerUrl}
              alt="banner"
              className=""
              fill={true}
            />
          </div>

          <ImageCrop setFor="banner" templateName={templateName} />
          <div className="p-1 rounded-md hover:bg-gray-50">
            <Trash2
              className="h-6 w-6 text-red-500"
              onClick={() => setMyImg(banner)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AddImage;
