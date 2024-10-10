"use client";
import React from "react";
import { Label } from "../ui/label";
import { useMyContext } from "@/lib/Context";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/Button";
import { languageOptions } from "@/conf/langs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";

function Languages() {
  // const languages = [
  //   { value: "en", label: "English", flag: "🇬🇧" },
  //   { value: "es", label: "Spanish", flag: "🇪🇸" },
  //   { value: "fr", label: "French", flag: "🇫🇷" },
  //   { value: "de", label: "German", flag: "🇩🇪" },
  //   { value: "it", label: "Italian", flag: "🇮🇹" },
  //   { value: "pt", label: "Portuguese", flag: "🇵🇹" },
  //   { value: "ru", label: "Russian", flag: "🇷🇺" },
  //   { value: "zh", label: "Chinese", flag: "🇨🇳" },
  //   { value: "ja", label: "Japanese", flag: "🇯🇵" },
  //   { value: "ko", label: "Korean", flag: "🇰🇷" },
  //   { value: "ar", label: "Arabic", flag: "🇸🇦" },
  //   { value: "hi", label: "Hindi", flag: "🇮🇳" },
  //   { value: "bn", label: "Bengali", flag: "🇧🇩" },
  //   { value: "id", label: "Indonesian", flag: "🇮🇩" },
  //   { value: "tr", label: "Turkish", flag: "🇹🇷" },
  //   { value: "th", label: "Thai", flag: "🇹🇭" },
  //   { value: "vi", label: "Vietlabelse", flag: "🇻🇳" },
  //   { value: "nl", label: "Dutch", flag: "🇳🇱" },
  //   { value: "pl", label: "Polish", flag: "🇵🇱" },
  //   { value: "sv", label: "Swedish", flag: "🇸🇪" },
  //   {
  //     value: "ph",
  //     label: "Philippines",
  //     flag: "🇵🇭",
  //   },
  //   {
  //     value: "ms",
  //     label: "Malaysia",
  //     flag: "🇲🇾",
  //   },
  // ];
  const {
    setSelectedLanguage,
    selectedLanguage,
    setBaseLanguage,
    baseLanguage,
  } = useMyContext();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("en");

  return (
    <div className="items-center  justify-center flex">
      <div className="text-left flex mr-2">
        {
          <div className="text-left flex mr-2 justify-center items-center">
            Base Language:
          </div>
        }
        <div className="flex justify-center">
          <Select onValueChange={setBaseLanguage} value={baseLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="base language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.flag} {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>{" "}
        </div>
      </div>
      {pathname == "/gen/screen/TemplateOne" && (
        <div className="text-left flex mr-2">Selected Language:</div>
      )}
      {pathname == "/gen/screen/TemplateOne" && (
        <div className="flex justify-center">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? languageOptions.find((language) => language.value === value)
                      ?.flag +
                    " " +
                    languageOptions.find((language) => language.value === value)
                      ?.label
                  : "Select language..."}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search language..." />
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {languageOptions.map((language, i) => (
                      <CommandItem
                        key={i}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setSelectedLanguage(currentValue);
                          // console.log("currentValue" + currentValue);
                          setOpen(false);
                        }}
                        value={language.value}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === language.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {language.flag} {language.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}

export default Languages;
