"use client";
import { useMyContext } from "@/lib/Context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/Button";
import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/CropImage";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "@/components/ui/slider";

interface ImageCropTypes {
  setFor?: string;
  templateName?: string;
}

const ImageCrop: React.FC<ImageCropTypes> = ({ setFor, templateName }) => {
  const {
    setUserImg,
    setBg,
    lang,
    count,
    setMyImg,
    outPutSize,
    templateDatas,
    setTemplateDatas,
  } = useMyContext();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [src, setSrc] = useState("");
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  useEffect(() => {
    if (setFor === "banner") {
      setX(outPutSize.width);
      setY(outPutSize.height);
    } else if (setFor === "background") {
      setX(9);
      setY(16);
    }
  }, [src, outPutSize]);
  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        src,
        croppedAreaPixels,
        rotation
      );
      // @ts-ignore
      setCroppedImage(croppedImage);
      if (setFor === "userImg") {
        setUserImg(croppedImage);
      } else if (setFor === "banner") {
        // console.log("templateName:" + templateName);
        const tempData = templateDatas[templateName ?? ""];
        const item: any = tempData.screenData![lang][count > 1 ? count - 1 : 0];
        item.bannerUrl = croppedImage;
        templateDatas[templateName ?? ""] = tempData;
        const newTemplateDatas = { ...templateDatas };
        setTemplateDatas(newTemplateDatas);
        setMyImg(croppedImage);
      } else {
        setBg(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file: File = event?.target?.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          // if (setFor === "banner") {
          setX(img.width);
          setY(img.height);
          // }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
      setSrc(URL.createObjectURL(file));
    }
  };

  const gettingReady = () => {
    setSrc("");
    setZoom(1);
    setRotation(0);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} size={"sm"} onClick={gettingReady}>
            Upload{" "}
          </Button>
        </DialogTrigger>
        <DialogContent className=" w-fit min-w-[350px] flex flex-col items-center ">
          <DialogHeader>
            <DialogTitle>Crop</DialogTitle>
          </DialogHeader>

          {src ? (
            <>
              <div className="relative w-full h-[400px]">
                <Cropper
                  image={src}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={x / y}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className="p-2 flex flex-col mt-2 w-full gap-2">
                <Label>Zoom</Label>
                {/* @ts-ignore  */}
                <Slider
                  defaultValue={[0]}
                  min={1}
                  max={100}
                  step={0.1}
                  onValueChange={setZoom}
                />
              </div>
              <div className="p-2 flex flex-col mt-2 w-full gap-2">
                <Label>Rotate</Label>
                {/* @ts-ignore  */}
                <Slider
                  defaultValue={[0]}
                  max={100}
                  step={1}
                  onValueChange={setRotation}
                />
              </div>
            </>
          ) : (
            <Input type="file" onChange={selectImage} />
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button
                onClick={showCroppedImage}
                type="button"
                disabled={src.length < 1}
              >
                OK
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageCrop;
