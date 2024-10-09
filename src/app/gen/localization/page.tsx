"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { languageOptions } from "@/conf/langs";
import { useMyContext } from "@/lib/Context";
import { Loader2, X } from "lucide-react";
const genAI = new GoogleGenerativeAI("AIzaSyAs4y5XGQ24c-m-rf6_Pv8qcqEnd7cFCJQ");

export default function Home() {
  const [languages] = useState(languageOptions.map((lang) => lang.value));
  const [key, setKey] = useState("");
  const [translateAllFromBaseLoading, setTranslateAllFromBaseLoading] =
    useState<boolean>(false);
  const [translateKeyFromBaseLoading, setTranslateKeyFromBaseLoading] =
    useState<boolean>(false);
  const [translateKeyBaseToAllLoading, setTranslateKeyBaseToAllLoading] =
    useState<boolean>(false);
  const [translateBaseToAllLoading, setTranslateBaseToAllLoading] =
    useState<boolean>(false);

  const [traningKey, setTraningKey] = useState("");
  const { selectedLanguage, translations, setTranslations, baseLanguage } =
    useMyContext();
  const handleAddTranslation = () => {
    if (key) {
      const updatedTranslations = { ...translations };
      languages.forEach((lang) => {
        updatedTranslations[lang][key] = updatedTranslations[lang][key] || "";
      });
      setTranslations(updatedTranslations);
      setKey("");
    }
  };

  const handleDelTranslation = (k: string) => {
    if (k) {
      const updatedTranslations = { ...translations };
      languages.forEach((lang) => {
        delete updatedTranslations[lang][k];
        // updatedTranslations[lang][key] = updatedTranslations[lang][key] || "";
      });
      setTranslations(updatedTranslations);
      setKey("");
    }
  };

  const handleTranslationChange = (lang, key, value) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [key]: value },
    }));
  };

  // const generateLocalizationFiles = () => {
  //   const iosFiles = {};
  //   const androidFiles = {};

  //   languages.forEach((lang) => {
  //     let iosContent = "";
  //     Object.entries(translations[lang]).forEach(([key, value]) => {
  //       iosContent += `"${key}" = "${value}";\n`;
  //     });
  //     iosFiles[`${lang}.lproj/Localizable.strings`] = iosContent;

  //     // Generate Android files
  //     let androidContent =
  //       '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n';
  //     Object.entries(translations[lang]).forEach(([key, value]) => {
  //       androidContent += `    <string name="${key}">${value}</string>\n`;
  //     });
  //     androidContent += "</resources>";
  //     androidFiles[`values-${lang === "en" ? "" : lang}/strings.xml`] =
  //       androidContent;
  //   });
  //   dlZip({ ios: iosFiles, android: androidFiles });
  // };
  // const dlZip = async (generatedFiles: any) => {
  //   const zip = new JSZip();
  //   const files = { ...generatedFiles.ios, ...generatedFiles.android };
  //   Object.entries(generatedFiles.ios).forEach(([filename, content]) => {
  //     zip.file("ios/" + filename, content as any);
  //   });
  //   Object.entries(generatedFiles.android).forEach(([filename, content]) => {
  //     zip.file("android/" + filename, content as any);
  //   });
  //   const blob = await zip.generateAsync({ type: "blob" });
  //   saveAs(blob, `localization_files.zip`);
  // };
  // const downloadZip = async (platform) => {
  //   const zip = new JSZip();
  //   const files =
  //     platform === "all"
  //       ? { ...generatedFiles.ios, ...generatedFiles.android }
  //       : generatedFiles[platform];

  //   Object.entries(files).forEach(([filename, content]) => {
  //     zip.file(filename, content as any);
  //   });

  //   const blob = await zip.generateAsync({ type: "blob" });
  //   saveAs(
  //     blob,
  //     platform === "all"
  //       ? `localization_files.zip`
  //       : `${platform}_localization_files.zip`
  //   );
  // };

  const translateAllFromBase = async () => {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const updatedTranslations = { ...translations };
    setTranslateAllFromBaseLoading(true);
    if (selectedLanguage !== baseLanguage) {
      for (const [key, value] of Object.entries(translations[baseLanguage])) {
        try {
          const prompt = `Translate the following text from ${baseLanguage} to ${selectedLanguage} and please return the translated text only : "${value}"`;
          const result = await model.generateContent(prompt);
          const response = result.response;
          const translatedText = response.text();
          updatedTranslations[selectedLanguage][key] = translatedText.replace(
            /^["']|["']$/g,
            ""
          );
        } catch (error) {
          console.error(
            `Error translating ${key} to ${selectedLanguage}:`,
            error
          );
          updatedTranslations[selectedLanguage][
            key
          ] = `[Translation Error: ${baseLanguage} -> ${selectedLanguage}]`;
        }
      }
    }
    setTranslateAllFromBaseLoading(false);
    setTranslations(updatedTranslations);
  };
  const translateBaseToAll = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const updatedTranslations = { ...translations };

    setTranslateBaseToAllLoading(true);
    for (const lang of languages) {
      if (lang !== baseLanguage) {
        for (const [key, value] of Object.entries(translations[baseLanguage])) {
          if (!updatedTranslations[lang][key]) {
            try {
              const prompt = `Translate the following text from ${baseLanguage} to ${lang}:  and please return the translated text only  "${value}"`;
              const result = await model.generateContent(prompt);
              const response = result.response;
              const translatedText = response.text();
              updatedTranslations[lang][key] = translatedText.replace(
                /^["']|["']$/g,
                ""
              );
            } catch (error) {
              console.error(`Error translating ${key} to ${lang}:`, error);
              updatedTranslations[lang][
                key
              ] = `[Translation Error: ${baseLanguage} -> ${lang}]`;
            }
          }
        }
      }
    }
    setTranslateBaseToAllLoading(false);
    setTranslations(updatedTranslations);
  };
  const translateKeyFromBase = async (tKey: string) => {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const updatedTranslations = { ...translations };
    setTranslateKeyFromBaseLoading(true);
    setTraningKey(tKey);
    if (selectedLanguage !== baseLanguage) {
      for (const [key, value] of Object.entries(translations[baseLanguage])) {
        if (tKey == key) {
          try {
            const prompt = `Translate the following text from ${baseLanguage} to ${selectedLanguage}  and please return the translated text only : "${value}"`;
            const result = await model.generateContent(prompt);
            const response = result.response;
            const translatedText = response.text();
            updatedTranslations[selectedLanguage][key] = translatedText.replace(
              /^["']|["']$/g,
              ""
            );
          } catch (error) {
            console.error(
              `Error translating ${key} to ${selectedLanguage}:`,
              error
            );
            updatedTranslations[selectedLanguage][
              key
            ] = `[Translation Error: ${baseLanguage} -> ${selectedLanguage}]`;
          }
        }
      }
    }

    setTranslations(updatedTranslations);
    setTranslateKeyFromBaseLoading(false);
    setTraningKey("");
  };
  const translateKeyBaseToAll = async (tKey: string) => {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const updatedTranslations = { ...translations };
    setTranslateKeyBaseToAllLoading(true);
    setTraningKey(tKey);
    for (const lang of languages) {
      if (lang !== baseLanguage) {
        for (const [key, value] of Object.entries(translations[baseLanguage])) {
          if (key == tKey) {
            try {
              const prompt = `Translate the following text from ${baseLanguage} to ${lang}  and please return the translated text only : "${value}"`;
              const result = await model.generateContent(prompt);
              const response = result.response;
              const translatedText = response.text();
              updatedTranslations[lang][key] = translatedText.replace(
                /^["']|["']$/g,
                ""
              );
            } catch (error) {
              console.error(`Error translating ${key} to ${lang}:`, error);
              updatedTranslations[lang][
                key
              ] = `[Translation Error: ${baseLanguage} -> ${lang}]`;
            }
          }
        }
      }
    }
    setTranslateKeyBaseToAllLoading(false);
    setTraningKey("");
    setTranslations(updatedTranslations);
  };
  const languagesToRender =
    selectedLanguage === "all" ? languages : [selectedLanguage];

  return (
    <div className="container mx-auto p-4 flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4 flex justify-center min-w-full mt-2">
        Mobile App Localization File Generator
      </h1>

      <div className="flex justify-end w-[90%] ">
        <div className="flex justify-center items-center mr-2">New Key:</div>
        <div className="flex justify-center items-center">
          <Input
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter key"
            className="mr-2"
          />
        </div>
        <div className="flex justify-center items-center">
          <Button onClick={handleAddTranslation}>Add</Button>
        </div>
      </div>
      <div className="flex justify-center w-full  ">
        {languagesToRender.map((lang) => {
          const langInfo = languageOptions.find((l) => l.value === lang);
          return (
            <div key={lang} className="mb-4  w-[80%]">
              <div className="flex justify-start items-center mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  {langInfo!.flag} {langInfo!.label}
                </h2>{" "}
                <div className="flex justify-center items-center">
                  {lang !== baseLanguage ? (
                    <Button
                      onClick={translateAllFromBase}
                      className="ml-3 w-[400]"
                    >
                      {translateAllFromBaseLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Translate All from Base Language
                    </Button>
                  ) : (
                    <Button
                      onClick={translateBaseToAll}
                      className="ml-3 w-[400]"
                    >
                      {translateBaseToAllLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Translate to All Language
                    </Button>
                  )}
                </div>
              </div>
              {Object.entries(translations[lang]).map(([key, value]) => (
                <div key={key} className="mb-2 flex w-full">
                  <div className="relative  w-2/3">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500">
                      {key}:
                    </span>
                    <Input
                      id={`${lang}-${key}`}
                      value={value as any}
                      onChange={(e) =>
                        handleTranslationChange(lang, key, e.target.value)
                      }
                      placeholder={`Enter ${langInfo!.label} translation`}
                      className="pl-52"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center  text-sm text-gray-500">
                      <Button
                        onClick={() => handleDelTranslation(key)}
                        className="ml-3"
                      >
                        <X />
                      </Button>
                    </span>
                  </div>

                  <div className="flex justify-center items-center">
                    {lang == baseLanguage ? (
                      <Button
                        onClick={() => {
                          translateKeyBaseToAll(key);
                        }}
                        className="ml-3 w-[400]"
                      >
                        {translateKeyBaseToAllLoading && traningKey == key && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Translate to All Language
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          translateKeyFromBase(key);
                        }}
                        className="ml-3 w-[400]"
                      >
                        {translateKeyFromBaseLoading && traningKey == key && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Translate from Base Language
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
