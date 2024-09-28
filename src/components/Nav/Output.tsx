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
function Output() {
  const outPutSizes = [
    {
      data: {
        name: "ios6.5",
        width: 1242,
        height: 2688,
      },
      value: "ios6.5",
      label: "ios6.5(1242*2688)",
    },
    {
      data: {
        name: "ios6.9",
        width: 1320,
        height: 2868,
      },
      value: "ios6.9",
      label: "ios6.9(1320*2868)",
    },
  ];
  const { setOutPutSize, outPutSize } = useMyContext();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("ios6.5");
  return (
    <div className="items-center  justify-center flex">
      {<div className="text-left flex mr-2">output size:</div>}
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
                ? outPutSizes.find((output) => output.value === value)?.label
                : "Select output size..."}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search size..." />
              <CommandEmpty>No size found.</CommandEmpty>
              <CommandGroup>
                <CommandList>
                  {outPutSizes.map((outPutSize, i) => (
                    <CommandItem
                      key={i}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        const data = outPutSizes.find(
                          (output) => output.value === currentValue
                        )?.data;

                        setOutPutSize(data as any);
                        setOpen(false);
                      }}
                      value={outPutSize.value}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === outPutSize.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {outPutSize.label}
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

export default Output;
