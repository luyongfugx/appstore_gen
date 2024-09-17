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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    const item = tempData.screenData![lang][count > 1 ? count - 1 : 0];
    item[name] = value;
    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
  };

  const title = templateDatas[templateName]
    ? tempData.screenData![lang][count > 1 ? count - 1 : 0].title
    : "please wait...";

  const subtitle = templateDatas[templateName]
    ? tempData.screenData![lang][count > 1 ? count - 1 : 0].subtitle
    : "please wait...";

  const description = templateDatas[templateName]
    ? tempData.screenData![lang][count > 1 ? count - 1 : 0].description
    : "please wait...";
  // useEffect(() => {}, [templateDatas]);

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5" key={"title"}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="title..."
          value={title}
          onChange={handleInput}
        />
      </div>

      <div
        className="grid w-full max-w-sm items-center gap-1.5"
        key={"Subtitle"}
      >
        <Label htmlFor="subtitle">Subtitle</Label>
        <Textarea
          name="subtitle"
          id="subtitle"
          placeholder="subtitle..."
          className="h-fit"
          value={subtitle}
          onChange={handleInput}
        />
      </div>

      <div className="grid w-full gap-1.5" key={"desc"}>
        <Label htmlFor="description">Description</Label>
        <Textarea
          placeholder="Type your description here."
          name="description"
          id="description"
          className="resize-none"
          value={description}
          onChange={handleInput}
        />
      </div>
    </>
  );
}

export default TitleAndDescForm;
