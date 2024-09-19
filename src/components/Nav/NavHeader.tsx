"use client";
import { useMyContext } from "@/lib/Context";
import React, { useRef, useState } from "react";
import { Button } from "../ui/Button";
import { DownloadCloudIcon, FileDown, ImageDown, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import downloadImages from "@/lib/ImageToZip";
import Output from "./Output";
import Languages from "./Languages";

function NavHeader() {
  const { count, crouLength, lang, outPutSize } = useMyContext();
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<string[]>([]);
  const convertImg = async () => {
    setLoading(true);
    setImg([]);
    try {
      for (let i = 1; i <= crouLength; i++) {
        const card = document.getElementById(`slide${i}`);
        if (card?.style !== undefined) card.style.display = "flex";
        const dataUrl = await html2canvas(card as HTMLElement, {
          logging: true,
          useCORS: true,
          //   background: "transparent",
          scale: 5,
        });
        const imgUrl = await dataUrl.toDataURL("image/jpeg");
        if (imgUrl) setImg((v: any) => [...v, imgUrl]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveAsImg = () => {
    const fileName = outPutSize.name + "_" + lang;
    downloadImages(img, fileName);
  };
  return (
    <div className="flex w-full items-center">
      <div className="flex w-32  items-center gap-2.5">
        <DownloadCloudIcon className="h-8 w-8 " />
      </div>
      <div className="flex-1 h-full flex justify-center gap-2.5">
        <Output />
        <Languages />
      </div>
      <div className="flex w-32 items-center justify-end gap-2.5">
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={convertImg} className="p-2">
              <ImageDown className="h-8 w-8 " />{" "}
              <div className="ml-2">Download</div>
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[800px] ">
            <DialogHeader>
              <DialogTitle className="flex justify-center">
                Ready to download ?
              </DialogTitle>
              <DialogDescription className="flex justify-center">
                {outPutSize.name + "," + lang}
              </DialogDescription>
              <div className="flex  gap-3   justify-start overflow-x-scroll">
                {img.map((itm, indx) => {
                  return (
                    <Image
                      key={indx}
                      src={itm}
                      loading="eager"
                      priority
                      alt="emage"
                      height={200}
                      width={300}
                      className="aspect-auto"
                    />
                  );
                })}
                {loading && (
                  <div className="h-full min-h-[200px] w-full absolute opacity-50 p-4 aspect-auto bg-gray-50 flex justify-center items-center ">
                    <Loader2 className="text-black h-4 w-4 animate-spin" />
                  </div>
                )}
              </div>
              <div className="w-full p-2 flex flex-row items-center gap-4 justify-center">
                <Button isLoading={loading} onClick={saveAsImg}>
                  Download
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default NavHeader;
