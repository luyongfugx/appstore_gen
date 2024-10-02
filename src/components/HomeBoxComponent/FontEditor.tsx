"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bold,
  Italic,
  Underline,
  Minus,
  Plus,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "../ui/separator";
import { boxData, useMyContext } from "@/lib/Context";

// interface FontSetting {
//   fontFamily?: string;
//   fontSize?: number;
//   fontBold?: string;
//   fontItalic?: string;
//   fontUnderline?: string;
//   fontAlign?: string;
// }
interface FontProps {
  templateName: string;
}
const FontEditorToolbar: React.FC<FontProps> = ({ templateName }) => {
  const { count, lang, templateDatas, setTemplateDatas, moveableId } =
    useMyContext();

  const [item, setItem] = useState<any>();
  const [ix, setIx] = useState<number>(0);
  const [fontStyles, setFontStyles] = useState<string[]>([]);
  useEffect(() => {
    const tempData = templateDatas[templateName];
    const items = templateDatas[templateName]
      ? tempData.screenData![lang][count > 1 ? count - 1 : 0]
      : [];

    items.forEach((im, indx) => {
      const mId = count + "_" + indx;
      if (mId === moveableId) {
        setItem(im);
        setIx(indx);
        const fontStyles: string[] = [];
        if (im.font?.bold) {
          fontStyles.push("bold");
        }
        if (im.font?.italic) {
          fontStyles.push("italic");
        }
        if (im.font?.underline) {
          fontStyles.push("underline");
        }
        setFontStyles(fontStyles);
      }
    });
  }, [moveableId, item, ix, count, templateDatas, lang, templateName]);
  //   const [fontSize, setFontSize] = useState(item.font?.size ?? 12);
  const fontFamilies = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Bookman",
    "Comic Sans MS",
    "Trebuchet MS",
    "Arial Black",
    "Impact",
  ];

  const setTempFontFamily = (family: string) => {
    const tempData = templateDatas[templateName];
    const items = templateDatas[templateName]
      ? tempData.screenData![lang][count > 1 ? count - 1 : 0]
      : [];
    items.forEach((im, indx) => {
      const mId = count + "_" + indx;
      if (mId === moveableId) {
        im.font!.family = family;
        setItem(im);
      }
    });
    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
  };
  const setTempFontStyles = (fontStyles: string[]) => {
    const tempData = templateDatas[templateName];
    const items = templateDatas[templateName]
      ? tempData.screenData![lang][count > 1 ? count - 1 : 0]
      : [];
    items.forEach((im, indx) => {
      const mId = count + "_" + indx;
      if (mId === moveableId) {
        im.font!.bold = false;
        im.font!.italic = false;
        im.font!.underline = false;
        fontStyles.forEach((s) => {
          if (s === "bold") {
            im.font!.bold = true;
          } else if (s === "italic") {
            im.font!.italic = true;
          } else if (s === "underline") {
            im.font!.underline = true;
          }
        });
        // if (im.font?.bold) {
        //   fontStyles.push("bold");
        // }
        // if (im.font?.italic) {
        //   fontStyles.push("italic");
        // }
        // if (im.font?.underline) {
        //   fontStyles.push("underline");
        // }
        setFontStyles(fontStyles);
        setItem(im);
      }
    });
    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
  };

  const setTempFontAlign = (align: string) => {
    const tempData = templateDatas[templateName];
    const items = templateDatas[templateName]
      ? tempData.screenData![lang][count > 1 ? count - 1 : 0]
      : [];
    items.forEach((im, indx) => {
      const mId = count + "_" + indx;
      if (mId === moveableId) {
        im.font!.align = align;
        setItem(im);
      }
    });
    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
  };
  const setFontSize = (size: any) => {
    const tempData = templateDatas[templateName];
    const items = templateDatas[templateName]
      ? tempData.screenData![lang][count > 1 ? count - 1 : 0]
      : [];
    items.forEach((im, indx) => {
      const mId = count + "_" + indx;
      if (mId === moveableId) {
        im.font!.size = size;
        setItem(im);
      }
    });
    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
  };
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize) && newSize > 0) {
      setFontSize(newSize);
    }
  };

  const incrementFontSize = () => {
    const next = Math.min(item.font.size + 1, 100);
    setFontSize(next);
  };

  const decrementFontSize = () => {
    const next = Math.max(item.font.size - 1, 1);
    setFontSize(next);
  };

  return (
    <>
      {item ? (
        <div className="flex flex-wrap items-center gap-2 p-2 bg-background border rounded-md shadow-sm justify-center">
          <p className="text-xs text-black">Font Family</p>
          <Select
            defaultValue={item.font.family}
            onValueChange={(value) => {
              setTempFontFamily(value);
              // console.log("family " + value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem
                  key={font}
                  value={font}
                  // value={font.toLowerCase().replace(/\s+/g, "-")}
                >
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Separator className="my-1" />
          <p className="text-xs text-black">Font Size</p>
          <div className="flex items-center w-full justify-center">
            <Button
              variant="outline"
              className="rounded-r-none"
              onClick={decrementFontSize}
              aria-label="Decrease font size"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={item.font?.size ?? 12}
              onChange={handleFontSizeChange}
              className="w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min="1"
              max="100"
            />
            <Button
              variant="outline"
              className="rounded-l-none"
              onClick={incrementFontSize}
              aria-label="Increase font size"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Separator className="my-1" />
          <p className="text-xs text-black">Font Style</p>
          <div className="flex justify-center items-center w-full">
            <ToggleGroup
              variant="outline"
              type="multiple"
              value={fontStyles}
              onValueChange={(value) => {
                setTempFontStyles(value);
              }}
            >
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>

              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>

              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Separator className="my-1" />
          <p className="text-xs text-black">Font Alignment</p>
          <div className="  flex justify-center items-center w-full">
            <ToggleGroup
              variant="outline"
              type="single"
              value={item.font?.align ?? "center"}
              onValueChange={(value) => {
                setTempFontAlign(value);
              }}
            >
              <ToggleGroupItem aria-label="Toggle left" value="start">
                <AlignLeft className="h-4 w-4" />
              </ToggleGroupItem>

              <ToggleGroupItem aria-label="Toggle center" value="center">
                <AlignCenter className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem aria-label="Toggle right" value="end">
                <AlignRight className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default FontEditorToolbar;
