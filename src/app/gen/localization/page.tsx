"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Globe, RefreshCw, Check, X } from "lucide-react";
import { languageOptions } from "@/conf/langs";
import { TranslationRow, useMyContext } from "@/lib/Context";
import doFetch from "@/aiboot_cloud/uselib/do-fetch";
import { translateWithGemini } from "@/lib/translate";
// const genAI = new GoogleGenerativeAI("AIzaSyAs4y5XGQ24c-m-rf6_Pv8qcqEnd7cFCJQ");

// const translateWithGemini = async (
//   baseLanguage: any,
//   selectedLanguage: any,
//   value: any
// ) => {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//     });
//     const prompt = `Translate the following text from ${baseLanguage} to ${selectedLanguage}  and please return the translated text only : "${value}"`;
//     const result = await model.generateContent(prompt);
//     const response = result.response;
//     const translatedText = response.text();
//     const reText = translatedText
//       .replace(/^["']|["']$/g, "")
//       .replace(/\n/g, "");
//     return reText;
//   } catch (e) {
//     return "translate error";
//   }
// };

// export const changePass = async (password: string) => {
//   const changePassApi = "/api/profile/changepass";
//   try {
//     const response = await doFetch(changePassApi, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ password }),
//     });

//     const user = await response.json();
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };
// 模拟从服务器获取数据的函数
const fetchInitialData = async () => {
  const dataApi = "/api/localization/get";
  try {
    const response = await doFetch(dataApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ password }),
    });
    const res = await response.json();
    if (res.data.length > 0) {
      return res.data[res.data.length - 1].json;
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
    return [];
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000)); // 模拟网络延迟
  // return [
  //   { key: "hello", en: "Hello", zh: "你好", es: "" },
  //   { key: "goodbye", en: "Goodbye", zh: "再见", es: "" },
  //   { key: "thank_you", en: "Thank you", zh: "谢谢", es: "" },
  // ];
};

// 模拟保存函数
const saveTranslations = async (data: any) => {
  const dataApi = "/api/localization/new";
  try {
    const response = await doFetch(dataApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {}
};

export default function MultiLanguageTable() {
  //   const [data, setData] = useState<TranslationRow[]>([]);
  // const [languages, setLanguages] = useState(["en", "zh", "es"]);
  const [languages, setLanguages] = useState(languageOptions);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [newKey, setNewKey] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const { selectedLanguage, translations, setTranslations, baseLanguage } =
    useMyContext();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [editingCell, setEditingCell] = useState<{
    rowIndex: number;
    lang: string;
  } | null>(null);

  const [editValue, setEditValue] = useState("");
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const initialData = await fetchInitialData();
        setTranslations(initialData);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const translateRow = async (rowIndex: number) => {
    setLoading((prev) => ({ ...prev, [`row-${rowIndex}`]: true }));
    const updatedRow = { ...translations[rowIndex] };
    const value = updatedRow[baseLanguage];
    for (const lang of languages) {
      updatedRow[lang.value] = await translateWithGemini(
        baseLanguage,
        lang.value,
        value
      );
      setTranslations((prev: any) => [
        ...prev.slice(0, rowIndex),
        updatedRow,
        ...prev.slice(rowIndex + 1),
      ]);
      //}
    }

    setLoading((prev) => ({ ...prev, [`row-${rowIndex}`]: false }));
  };

  const translateColumn = async (lang: string) => {
    setLoading((prev) => ({ ...prev, [`col-${lang}`]: true }));
    const updatedData = [...translations];
    for (let i = 0; i < updatedData.length; i++) {
      //   if (!updatedData[i][lang]) {
      const value = updatedData[i][baseLanguage];
      updatedData[i][lang] = await translateWithGemini(
        baseLanguage,
        lang,
        value
      );
      setTranslations(updatedData);
      // }
    }

    setLoading((prev) => ({ ...prev, [`col-${lang}`]: false }));
  };

  const translateCell = async (rowIndex: number, lang: string) => {
    setLoading((prev) => ({ ...prev, [`cell-${rowIndex}-${lang}`]: true }));
    const updatedData = [...translations];
    const value = updatedData[rowIndex][baseLanguage];
    updatedData[rowIndex][lang] = await translateWithGemini(
      baseLanguage,
      lang,
      value
    );
    setTranslations(updatedData);
    setLoading((prev) => ({ ...prev, [`cell-${rowIndex}-${lang}`]: false }));
  };

  const handleSave = async () => {
    setLoading((prev) => ({ ...prev, save: true }));
    await saveTranslations(translations);
    setLoading((prev) => ({ ...prev, save: false }));
  };

  const handleAddKey = () => {
    if (newKey && !translations.some((row) => row.key === newKey)) {
      const newRow: TranslationRow = { key: newKey };
      languages.forEach((lang) => (newRow[lang.value] = newKey));
      setTranslations((prev) => [...prev, newRow]);
      setNewKey("");
    }
  };

  const handleAddLanguage = () => {
    // if (newLanguage && !languages.includes(newLanguage)) {
    //   setLanguages((prev) => [...prev, newLanguage]);
    //   setData((prev) => prev.map((row) => ({ ...row, [newLanguage]: "" })));
    //   setNewLanguage("");
    // }
  };

  const startEditing = (rowIndex: number, lang: string, value: string) => {
    setEditingCell({ rowIndex, lang });
    setEditValue(value);
  };

  const saveEdit = () => {
    if (editingCell) {
      const { rowIndex, lang } = editingCell;
      const updatedData = [...translations];
      updatedData[rowIndex][lang] = editValue;
      setTranslations(updatedData);
      setEditingCell(null);
    }
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue("");
  };

  if (isInitialLoading) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-lg">Loading translations...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="m-4 flex  justify-end">
        <Input
          type="text"
          placeholder="Enter new key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="max-w-xs"
        />
        <Button
          onClick={handleAddKey}
          disabled={!newKey || translations.some((row) => row.key === newKey)}
          className="ml-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Key
        </Button>
        <Button onClick={handleSave} disabled={loading.save} className="ml-4">
          {loading.save ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          Save Translations
        </Button>
      </div>
      <Table className="w-full border">
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            {languages.map((lang) => (
              <TableHead key={lang.value} className="text-center border py-2">
                <span className="flex items-center justify-center">
                  {lang.flag || "🏳️"} {lang.value.toUpperCase()}
                </span>
                {lang.value != baseLanguage && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2 mt-1"
                    onClick={() => translateColumn(lang.value)}
                    disabled={loading[`col-${lang.value}`]}
                  >
                    {loading[`col-${lang.value}`] ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Translate"
                    )}
                  </Button>
                )}
              </TableHead>
            ))}
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {translations.map((row, rowIndex) => (
            <TableRow key={row.key}>
              <TableCell>{row.key}</TableCell>
              {languages.map((lang) => (
                <TableCell key={lang.value} className="text-center border">
                  <div className="flex items-center justify-center space-x-2">
                    {editingCell?.rowIndex === rowIndex &&
                    editingCell?.lang === lang.value ? (
                      <div className="flex items-center space-x-1  min-w-[400px]">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full"
                        />
                        <Button variant="ghost" size="sm" onClick={saveEdit}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={cancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span
                          onClick={() =>
                            startEditing(rowIndex, lang.value, row[lang.value])
                          }
                          className="cursor-pointer"
                        >
                          {row[lang.value] || "---"}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => translateCell(rowIndex, lang.value)}
                          disabled={loading[`cell-${rowIndex}-${lang.value}`]}
                        >
                          {loading[`cell-${rowIndex}-${lang.value}`] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="h-4 w-4" />
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              ))}
              <TableCell className="text-center min-w-[200px]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => translateRow(rowIndex)}
                  disabled={loading[`row-${rowIndex}`]}
                >
                  {loading[`row-${rowIndex}`] ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Translate Key"
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex flex-wrap items-center gap-2"></div>
    </div>
  );
}
