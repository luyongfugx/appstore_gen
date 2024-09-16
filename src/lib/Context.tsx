import React, { createContext, useContext, useState } from "react";
import defaultImage from "../../public/banner.png";
import { defaultTemplateDatas } from "@/conf/templateData";
interface userHandletypes {
  fullname: string;
  username: string;
}

interface OutPutSize {
  name: string;
  width: number;
  height: number;
}

interface slideDatatypes {
  className?: string;
  Title?: string;
  subtitle?: string;
  description?: string;
  banner: boolean;
  bannerUrl?: string;
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
  defaultBg?: string;
  primaryColor?: string;
};
//{templateOne:TemplateData,templateTow:TemplateData}
export type TemplateDatas = Record<string, TemplateData>;

interface showFormTypes {
  title?: boolean;
  subtitle?: boolean;
  description?: boolean;
}
interface DataContextTypes {
  crousalHandle: userHandletypes;
  lang: any;
  setLang: (n: any) => void;

  outPutSize: OutPutSize;
  setOutPutSize: (n: OutPutSize) => void;

  templateDatas: TemplateDatas;
  setTemplateDatas: (template: any) => void;
  slideData: any;
  setSlideData: (v: any) => void;
  setCrousalHandle: (v: any) => void;
  count: number;
  setCount: (n: any) => void;
  crouLength: number;
  setCrouLength: (n: number) => void;
  bgColor: any;
  setBgColor: (v: any) => void;
  primaryColor: any;
  setPrimaryColor: (v: any) => void;
  banner: any;
  setBanner: (v: any) => void;
  userImg: string;
  setUserImg: (val: any) => void;
  myImg: any;
  setMyImg: (v: any) => void;
  crousal: any;
  setCrousal: (v: any) => void;
  bg: string;
  setBg: (v: any) => void;
  SetCrousalValues: (
    lang: string,
    BgColor: string,
    PrimaryColor: string,
    length: number,
    haveimage: boolean
  ) => void;
  haveImg: boolean;
  setHaveImg: (v: any) => void;
  link: string;
  setLink: (v: any) => void;
  showForm: showFormTypes;
  setShowForm: (v: any) => void;
}

const MyContext = createContext<DataContextTypes | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [crousalHandle, setCrousalHandle] = useState<userHandletypes>({
    fullname: "John Michle",
    username: "john_michle_123",
  });

  const [templateDatas, setTemplateDatas] =
    useState<TemplateDatas>(defaultTemplateDatas);
  const [count, setCount] = useState<number>(0);
  const [outPutSize, setOutPutSize] = useState<OutPutSize>({
    name: "ios5.5",
    width: 1242,
    height: 2208,
  });

  const [crouLength, setCrouLength] = useState<number>(1);
  const [bgColor, setBgColor] = useState("");
  const [bg, setBg] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#fff");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [slideData, setSlideData] = useState<
    Map<string, Array<slideDatatypes>>
  >(new Map<string, Array<slideDatatypes>>());
  const [banner, setBanner] = useState(defaultImage);
  const [haveImg, setHaveImg] = useState(false);
  const [myImg, setMyImg] = useState<string>("");
  const [link, setLink] = useState("");
  const [lang, setLang] = useState("en");
  const [crousal, setCrousal] = useState();
  const [showForm, setShowForm] = useState({
    title: true,
    subtitle: true,
    description: true,
  });
  const [userImg, setUserImg] = useState(
    "https://firebasestorage.googleapis.com/v0/b/projectfriendz-45b49.appspot.com/o/images%2FLogo%20img%20me.png?alt=media&token=a6386667-06a8-45ba-8035-20604a0551e4"
  );

  // CROUSAL VALUE SETTING FUNCTION
  const SetCrousalValues = (
    lang: string,
    BgColor: string,
    PrimaryColor: string,
    length: number,
    haveimage: boolean
  ) => {
    setHaveImg(haveimage);
    setLang(lang);
    setCrouLength(length);
    setBgColor(BgColor);
    setPrimaryColor(PrimaryColor);
  };
  return (
    <MyContext.Provider
      value={{
        crousalHandle,
        haveImg,
        outPutSize,
        setOutPutSize,
        setHaveImg,
        lang,
        setLang,
        templateDatas,
        setTemplateDatas,
        link,
        setLink,
        setCrousalHandle,
        count,
        setCount,
        crouLength,
        setCrouLength,
        showForm,
        setShowForm,
        slideData,
        bg,
        SetCrousalValues,
        setBg,
        setSlideData,
        bgColor,
        setBgColor,
        primaryColor,
        setPrimaryColor,
        banner,
        setBanner,
        userImg,
        setUserImg,
        myImg,
        setMyImg,
        crousal,
        setCrousal,
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
