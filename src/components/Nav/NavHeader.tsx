"use client";
import { TranslationRow, useMyContext } from "@/lib/Context";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { DownloadCloudIcon, FileDown, ImageDown, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
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
import { usePathname } from "next/navigation";
import { languageOptions } from "@/conf/langs";
import JSZip from "jszip";

function NavHeader() {
  const {
    count,
    crouLength,
    selectedLanguage,
    outPutSize,
    setEditting,
    setMoveableId,
    templateName,
    translations,
    templateDatas,
  } = useMyContext();
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<string[]>([]);
  const tempData = templateDatas[templateName];
  const pathname = usePathname();
  const [languages, setLanguages] = useState(
    languageOptions.map((lang) => lang.value)
  );
  const [generatedFiles, setGeneratedFiles] = useState({
    ios: {},
    android: {},
  });
  const convertImg = () => {
    setEditting(false);
    setMoveableId("");
    setLoading(true);
    setImg([]);
    setTimeout(async () => {
      try {
        for (let i = 1; i <= crouLength; i++) {
          const card = document.getElementById(`slide${i}`);
          if (card?.style !== undefined) card.style.display = "flex";
          const canvas = await html2canvas(card as HTMLElement, {
            logging: true,
            useCORS: true,
            allowTaint: true,
            // background: tempData.bgColor,
            scale: 5,
          });
          //resize to outPutSize
          const resizeCanvas = document.createElement("canvas");
          const ctx = resizeCanvas.getContext("2d");
          resizeCanvas.width = outPutSize.width;
          resizeCanvas.height = outPutSize.height;
          ctx!.fillStyle = tempData.bgColor ?? "transparent";
          ctx!.fillRect(0, 0, outPutSize.width, outPutSize.height);
          ctx!.drawImage(canvas, 0, 0, canvas.width, canvas.height);
          const imgUrl = resizeCanvas.toDataURL("image/jpeg");
          if (imgUrl) setImg((v: any) => [...v, imgUrl]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 200);
  };

  const saveAsImg = () => {
    const fileName = outPutSize.name + "_" + selectedLanguage;
    downloadImages(img, fileName);
  };
  const generateLocalizationFiles = () => {
    const iosFiles = {};
    const androidFiles = {};

    languages.forEach((lang) => {
      let iosContent = "";
      let androidContent =
        '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n';
      translations.forEach((newRow: TranslationRow) => {
        iosContent += `"${newRow.key}" = "${newRow[lang] || ""}";\n`;
        androidContent += `    <string name="${newRow.key}">${
          newRow[lang] || ""
        }</string>\n`;
      });
      androidContent += "</resources>";
      iosFiles[`${lang}.lproj/Localizable.strings`] = iosContent;
      androidFiles[`values-${lang === "en" ? "" : lang}/strings.xml`] =
        androidContent;
    });
    dlZip({ ios: iosFiles, android: androidFiles });
    // languages.forEach((lang) => {
    //   let iosContent = "";
    //   Object.entries(translations[lang]).forEach(([key, value]) => {
    //     iosContent += `"${key}" = "${value}";\n`;
    //   });
    //   iosFiles[`${lang}.lproj/Localizable.strings`] = iosContent;
    //   // Generate Android files
    //   let androidContent =
    //     '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n';
    //   Object.entries(translations[lang]).forEach(([key, value]) => {
    //     androidContent += `    <string name="${key}">${value}</string>\n`;
    //   });
    //   androidContent += "</resources>";
    //   androidFiles[`values-${lang === "en" ? "" : lang}/strings.xml`] =
    //     androidContent;
    // });
    // dlZip({ ios: iosFiles, android: androidFiles });
  };
  const dlZip = async (generatedFiles: any) => {
    const zip = new JSZip();
    const files = { ...generatedFiles.ios, ...generatedFiles.android };
    Object.entries(generatedFiles.ios).forEach(([filename, content]) => {
      zip.file("ios/" + filename, content as any);
    });
    Object.entries(generatedFiles.android).forEach(([filename, content]) => {
      zip.file("android/" + filename, content as any);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `localization_files.zip`);
  };
  return (
    <div className="flex w-full items-center">
      <div className="flex w-32  items-center gap-2.5 text-primary">
        {/* <DownloadCloudIcon className="h-8 w-8 " /> */}
      </div>
      <div className="flex-1 h-full flex justify-center gap-2.5">
        {pathname == "/gen/screen/TemplateOne" && <Output />}
        <Languages />
      </div>

      {(pathname == "/gen/localization" || pathname == "/gen/gridlocal") && (
        <div className="flex h-full items-center justify-end gap-2.5">
          <Button
            onClick={() => {
              generateLocalizationFiles();
            }}
            className="ml-2"
          >
            Download All Files (iOS & Android)
          </Button>
        </div>
      )}
      {pathname == "/gen/screen/TemplateOne" && (
        <div className="flex w-32 items-center justify-end gap-2.5">
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={convertImg} className="p-2">
                <ImageDown className="h-8 w-8 " />{" "}
                <div className="ml-2">Download</div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90%] min-w-[600px] ">
              <DialogHeader>
                <DialogTitle className="flex justify-center">
                  Ready to download ?
                </DialogTitle>
                <DialogDescription className="flex justify-center">
                  {outPutSize.name + "," + selectedLanguage}
                </DialogDescription>
                <div className="flex  gap-3   justify-start overflow-auto max-w-[90%] min-w-[600px]">
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
      )}
    </div>
  );
}

export default NavHeader;
