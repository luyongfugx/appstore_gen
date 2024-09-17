import React, { createContext, useContext, useState } from "react";
import defaultImage from "../../public/banner.png";
import { defaultTemplateDatas } from "@/conf/templateData";

interface OutPutSize {
  name: string;
  width: number;
  height: number;
}

export type ScreenDatatype = {
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  banner: boolean;
  bannerUrl?: string;
};
export type TemplateData = {
  screenData?: Record<string, ScreenDatatype[]>;
  arrow?: boolean;
  bg?: string;
  bgColor?: string;
  primaryColor?: string;
};
//{templateOne:TemplateData,templateTow:TemplateData}
export type TemplateDatas = Record<string, TemplateData>;

interface DataContextTypes {
  lang: any;
  setLang: (n: any) => void;
  outPutSize: OutPutSize;
  setOutPutSize: (n: OutPutSize) => void;
  templateDatas: TemplateDatas;
  setTemplateDatas: (template: any) => void;
  count: number;
  setCount: (n: any) => void;
  crouLength: number;
  editing: boolean;
  setEditting: (n: boolean) => void;
  setCrouLength: (n: number) => void;
  SetCrousalValues: (lang: string, length: number) => void;
}

const MyContext = createContext<DataContextTypes | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [templateDatas, setTemplateDatas] =
    useState<TemplateDatas>(defaultTemplateDatas);
  const [count, setCount] = useState<number>(0);
  const [outPutSize, setOutPutSize] = useState<OutPutSize>({
    name: "ios6.5",
    width: 1242,
    height: 2268,
  });

  const [crouLength, setCrouLength] = useState<number>(1);
  const [lang, setLang] = useState("en");
  const [editing, setEditting] = useState(false);
  // CROUSAL VALUE SETTING FUNCTION
  const SetCrousalValues = (lang: string, length: number) => {
    setLang(lang);
    setCrouLength(length);
  };
  return (
    <MyContext.Provider
      value={{
        editing,
        setEditting,
        outPutSize,
        setOutPutSize,
        lang,
        setLang,
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
