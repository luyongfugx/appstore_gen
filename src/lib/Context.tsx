import React, { createContext, useContext, useState } from "react";
import defaultImage from "../../public/banner.png";
import { defaultTemplateDatas } from "@/conf/templateData";
import { Island_Moments } from "next/font/google";

interface OutPutSize {
  name: string;
  width: number;
  height: number;
}
interface box {
  x: number;
  y: number;
  w: any;
  h: any;
  rotate?: number;
}
// fontFamily?: string;
// fontSize?: number;
// fontBold?: string;
// fontItalic?: string;
// fontUnderline?: string;
// fontAlign?: string;
interface fontStyle {
  family?: string;
  color?: string;
  size?: number;
  weight?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: string;
}
// interface TextData {
//   name: string;
//   box: box;
//   font: fontStyle;
// }

// interface ImageData {
//   url?: string;
//   box: box;
// }

export interface boxData {
  type: string;
  name: string;
  box: box;
  font?: fontStyle;
  value?: string;
  zIndex?: number;
}

export interface MockUpData {
  name: string;
  width: number;
  height: number;
  mockWidth: number;
  mockHeight: number;
  borderWidth: number;
  btnWidth: number;
  img: string;
  showIsLand?: boolean;
  // imgWidth: number;
  // imgHeight: number;
}
// export type ScreenDatatype = {
//   className?: string;
//   title?: TextData;
//   subtitle?: TextData;
//   description?: TextData;
//   banner?: ImageData;
// };
export type TemplateData = {
  screenData?: Record<string, boxData[][]>;
  arrow?: boolean;
  bg?: string;
  bgColor?: string;
  primaryColor?: string;
};
//{templateOne:TemplateData,templateTow:TemplateData}
export type TemplateDatas = Record<string, TemplateData>;

interface DataContextTypes {
  // lang: any;
  // setLang: (n: any) => void;
  selectedLanguage: any;
  setSelectedLanguage: (n: any) => void;
  baseLanguage: any;
  setBaseLanguage: (n: any) => void;
  outPutSize: OutPutSize;
  setOutPutSize: (n: OutPutSize) => void;
  templateDatas: TemplateDatas;
  setTemplateDatas: (template: any) => void;
  count: number;
  setCount: (n: any) => void;
  crouLength: number;
  editing: boolean;
  setEditting: (n: boolean) => void;
  setEdittingItem: (n: any) => void;
  editingItem: any;
  editId: string;
  keepRatio: boolean;
  setKeepRatio: (n: boolean) => void;
  setEditId: (n: string) => void;
  moveableId: string;
  setMoveableId: (n: string) => void;
  setCrouLength: (n: number) => void;
  SetCrousalValues: (lang: string, length: number) => void;
  templateName: string;
  setTemplateName: (n: string) => void;
}

const MyContext = createContext<DataContextTypes | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [templateDatas, setTemplateDatas] =
    useState<TemplateDatas>(defaultTemplateDatas);
  const [count, setCount] = useState<number>(0);
  const [outPutSize, setOutPutSize] = useState<OutPutSize>({
    name: "ios6.5",
    width: 1242,
    height: 2688,
  });
  const [moveableId, setMoveableId] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const [crouLength, setCrouLength] = useState<number>(1);
  const [baseLanguage, setBaseLanguage] = useState("en");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  // const [selectedLanguage, setSelectedLanguage] = useState("all");

  const [templateName, setTemplateName] = useState("TemplateOne");
  const [editing, setEditting] = useState(false);
  const [keepRatio, setKeepRatio] = useState(false);
  const [editingItem, setEdittingItem] = useState<any>();

  const SetCrousalValues = (lang: string, length: number) => {
    setSelectedLanguage(lang);
    setCrouLength(length);
  };
  return (
    <MyContext.Provider
      value={{
        templateName,
        setTemplateName,
        keepRatio,
        setKeepRatio,
        editId,
        setEditId,
        moveableId,
        setMoveableId,
        editingItem,
        setEdittingItem,
        editing,
        setEditting,
        outPutSize,
        setOutPutSize,
        selectedLanguage,
        setSelectedLanguage,
        baseLanguage,
        setBaseLanguage,
        templateDatas,
        setTemplateDatas,
        count,
        setCount,
        crouLength,
        setCrouLength,
        SetCrousalValues,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("My context must be used with in a DataProvider");
  }
  return context;
};
