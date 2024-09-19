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
function Languages() {
  const languages = [
    {
      value: "cn",
      label: "Chinese",
      flag: "🇨🇳",
    },
    {
      value: "en",
      label: "English",
      flag: "🇬🇧",
    },
    {
      value: "es",
      label: "Español",
      flag: "🇪🇸",
    },
    {
      value: "fr",
      label: "Français",
      flag: "🇫🇷",
    },
    {
      value: "de",
      label: "Deutsch",
      flag: "🇩🇪",
    },
    {
      value: "it",
      label: "Italiano",
      flag: "🇮🇹",
    },
  ];
  const { setLang, lang } = useMyContext();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("en");

  return (
    <div className="items-center  justify-center flex">
      {<div className="text-left flex mr-2">languages:</div>}
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
                ? languages.find((language) => language.value === value)?.flag +
                  " " +
                  languages.find((language) => language.value === value)?.label
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
                  {languages.map((language, i) => (
                    <CommandItem
                      key={i}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setLang(currentValue);
                        console.log("currentValue" + currentValue);
                        setOpen(false);
                      }}
                      value={language.value}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === language.value ? "opacity-100" : "opacity-0"
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
    </div>
  );
}

export default Languages;
