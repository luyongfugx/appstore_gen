"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { languageOptions } from "@/conf/langs";
// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

// const languageOptions = [
//   { code: "en", name: "English", flag: "🇬🇧" },
//   { code: "es", name: "Spanish", flag: "🇪🇸" },
//   { code: "fr", name: "French", flag: "🇫🇷" },
//   { code: "de", name: "German", flag: "🇩🇪" },
//   { code: "it", name: "Italian", flag: "🇮🇹" },
//   { code: "pt", name: "Portuguese", flag: "🇵🇹" },
//   { code: "ru", name: "Russian", flag: "🇷🇺" },
//   { code: "zh", name: "Chinese", flag: "🇨🇳" },
//   { code: "ja", name: "Japanese", flag: "🇯🇵" },
//   { code: "ko", name: "Korean", flag: "🇰🇷" },
//   { code: "ar", name: "Arabic", flag: "🇸🇦" },
//   { code: "hi", name: "Hindi", flag: "🇮🇳" },
//   { code: "bn", name: "Bengali", flag: "🇧🇩" },
//   { code: "id", name: "Indonesian", flag: "🇮🇩" },
//   { code: "tr", name: "Turkish", flag: "🇹🇷" },
//   { code: "th", name: "Thai", flag: "🇹🇭" },
//   { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
//   { code: "nl", name: "Dutch", flag: "🇳🇱" },
//   { code: "pl", name: "Polish", flag: "🇵🇱" },
//   { code: "sv", name: "Swedish", flag: "🇸🇪" },
// ];

export default function Home() {
  const [languages, setLanguages] = useState(
    languageOptions.map((lang) => lang.value)
  );
  const [translations, setTranslations] = useState(
    Object.fromEntries(languageOptions.map((lang) => [lang.value, {}]))
  );
  const [key, setKey] = useState("");
  const [generatedFiles, setGeneratedFiles] = useState({
    ios: {},
    android: {},
  });
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [baseLanguage, setBaseLanguage] = useState("en");

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

  const handleTranslationChange = (lang, key, value) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [key]: value },
    }));
  };

  const generateLocalizationFiles = () => {
    const iosFiles = {};
    const androidFiles = {};

    languages.forEach((lang) => {
      // Generate iOS files
      let iosContent = "";
      Object.entries(translations[lang]).forEach(([key, value]) => {
        iosContent += `"${key}" = "${value}";\n`;
      });
      iosFiles[`${lang}.lproj/Localizable.strings`] = iosContent;

      // Generate Android files
      let androidContent =
        '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n';
      Object.entries(translations[lang]).forEach(([key, value]) => {
        androidContent += `    <string name="${key}">${value}</string>\n`;
      });
      androidContent += "</resources>";
      androidFiles[`values-${lang === "en" ? "" : lang}/strings.xml`] =
        androidContent;
    });

    setGeneratedFiles({ ios: iosFiles, android: androidFiles });
  };

  const downloadZip = async (platform) => {
    const zip = new JSZip();
    const files =
      platform === "all"
        ? { ...generatedFiles.ios, ...generatedFiles.android }
        : generatedFiles[platform];

    Object.entries(files).forEach(([filename, content]) => {
      zip.file(filename, content as any);
    });

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(
      blob,
      platform === "all"
        ? `localization_files.zip`
        : `${platform}_localization_files.zip`
    );
  };

  const translateAll = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const updatedTranslations = { ...translations };

    for (const lang of languages) {
      if (lang !== baseLanguage) {
        for (const [key, value] of Object.entries(translations[baseLanguage])) {
          if (!updatedTranslations[lang][key]) {
            try {
              const prompt = `Translate the following text from ${baseLanguage} to ${lang}: "${value}"`;
              const result = await model.generateContent(prompt);
              const response = await result.response;
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

    setTranslations(updatedTranslations);
  };

  const languagesToRender =
    selectedLanguage === "all" ? languages : [selectedLanguage];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Mobile App Localization File Generator
      </h1>

      <div className="mb-4">
        <Label htmlFor="key">New Key</Label>
        <div className="flex">
          <Input
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter key"
            className="mr-2"
          />
          <Button onClick={handleAddTranslation}>Add</Button>
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor="base-language">Base Language</Label>
        <Select onValueChange={setBaseLanguage} value={baseLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select base language" />
          </SelectTrigger>
          <SelectContent>
            {languageOptions.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.flag} {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <Label htmlFor="language-select">Select Language to Display</Label>
        <Select onValueChange={setSelectedLanguage} value={selectedLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">🌐 All Languages</SelectItem>
            {languageOptions.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.flag} {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={translateAll} className="mb-4">
        Translate All
      </Button>

      {languagesToRender.map((lang) => {
        const langInfo = languageOptions.find((l) => l.value === lang);
        return (
          <div key={lang} className="mb-4">
            <h2 className="text-xl font-semibold mb-2">
              {langInfo!.flag} {langInfo!.label}
            </h2>
            {Object.entries(translations[lang]).map(([key, value]) => (
              <div key={key} className="mb-2">
                <Label htmlFor={`${lang}-${key}`}>{key}</Label>
                <Input
                  id={`${lang}-${key}`}
                  value={value as any}
                  onChange={(e) =>
                    handleTranslationChange(lang, key, e.target.value)
                  }
                  placeholder={`Enter ${langInfo!.label} translation`}
                />
              </div>
            ))}
          </div>
        );
      })}

      <Button onClick={generateLocalizationFiles} className="mt-4 mr-2">
        Generate Localization Files
      </Button>

      {Object.entries(generatedFiles.ios).length > 0 && (
        <div className="mt-4">
          <Tabs defaultValue="ios">
            <TabsList>
              <TabsTrigger value="ios">iOS</TabsTrigger>
              <TabsTrigger value="android">Android</TabsTrigger>
            </TabsList>
            <TabsContent value="ios">
              <h2 className="text-xl font-semibold mb-2">
                Generated iOS Files
              </h2>
              {Object.entries(generatedFiles.ios).map(([filename, content]) => (
                <div key={filename} className="mb-4">
                  <h3 className="text-lg font-medium mb-1">{filename}</h3>
                  <Textarea value={content as any} readOnly className="h-32" />
                </div>
              ))}
              <Button onClick={() => downloadZip("ios")} className="mt-2 mr-2">
                Download iOS ZIP
              </Button>
            </TabsContent>
            <TabsContent value="android">
              <h2 className="text-xl font-semibold mb-2">
                Generated Android Files
              </h2>
              {Object.entries(generatedFiles.android).map(
                ([filename, content]) => (
                  <div key={filename} className="mb-4">
                    <h3 className="text-lg font-medium mb-1">{filename}</h3>
                    <Textarea
                      value={content as any}
                      readOnly
                      className="h-32"
                    />
                  </div>
                )
              )}
              <Button
                onClick={() => downloadZip("android")}
                className="mt-2 mr-2"
              >
                Download Android ZIP
              </Button>
            </TabsContent>
          </Tabs>
          <Button onClick={() => downloadZip("all")} className="mt-4">
            Download All Files (iOS & Android)
          </Button>
        </div>
      )}
    </div>
  );
}
