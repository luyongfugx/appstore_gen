"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useMyContext } from "@/lib/Context";
import { Button } from "../ui/Button";
import { title } from "process";

function TitleAndDescForm({ templateName }) {
  const { count, lang, templateDatas, setTemplateDatas } = useMyContext();
  const tempData = templateDatas[templateName];
  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    indx: number
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    const item = tempData.screenData![lang][count > 1 ? count - 1 : 0];
    item[indx].value = value;
    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
  };

  // const title = templateDatas[templateName]
  //   ? tempData.screenData![lang][count > 1 ? count - 1 : 0].title?.text
  //   : "please wait...";

  // const subtitle = templateDatas[templateName]
  //   ? tempData.screenData![lang][count > 1 ? count - 1 : 0].subtitle?.text
  //   : "please wait...";

  // const description = templateDatas[templateName]
  //   ? tempData.screenData![lang][count > 1 ? count - 1 : 0].description?.text
  //   : "please wait...";
  // useEffect(() => {}, [templateDatas]);

  const items = templateDatas[templateName]
    ? tempData.screenData![lang][count > 1 ? count - 1 : 0]
    : [];
  return (
    <>
      {items.map((item, indx) => {
        return (
          <div
            className="grid w-full max-w-sm items-center gap-1.5"
            key={item.name}
          >
            <Label htmlFor={item.name}>{item.name}</Label>
            <Input
              type="text"
              name={item.name}
              id={item.name}
              placeholder={item.name}
              value={item.value}
              onChange={(value) => {
                handleInput(value, indx);
              }}
            />
          </div>
        );
      })}
    </>
  );
}

export default TitleAndDescForm;
