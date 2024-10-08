// utils/downloadImages.js

import JSZip from "jszip";
import "jszip/dist/jszip.min.js";
import "jszip/dist/jszip.min";

const downloadImages = async (imageLinks: Array<any>, fileName: string) => {
  const zip = new JSZip();
  const downloadPromises = imageLinks.map(
    async (link: string, index: number) => {
      const response = await fetch(link);
      const blob = await response.blob();
      zip.file(`${fileName}_screen_${index + 1}.jpg`, blob);
    }
  );
  await Promise.all(downloadPromises);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(zipBlob);
  link.download = fileName + ".zip";
  link.click();
};

export default downloadImages;
