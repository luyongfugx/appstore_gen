"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
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

function FullNameHandle() {
  const languages = [
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
  const { setCrousalHandle, crousalHandle } = useMyContext();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCrousalHandle((v: any) => ({ ...v, ["fullname"]: value }));
  };
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="fullname">language</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value ? value : "Select language..."}
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
                      setOpen(false);
                    }}
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
      {/* <Input
        type="text"
        id="fullname"
        name="fullname"
        placeholder="John Michle"
        defaultValue={crousalHandle.fullname}
        onChange={handleInput}
      /> */}
    </div>
  );
}

export default FullNameHandle;
