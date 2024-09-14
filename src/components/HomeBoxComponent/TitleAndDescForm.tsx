"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useMyContext } from "@/lib/Context";
import { Button } from "../ui/Button";
import { title } from "process";

function TitleAndDescForm() {
  const { count, crouLength, showForm, slideData, lang } = useMyContext();
  const [values, setValues] = useState({
    title: "please wait...",
    subtitle: "please wait...",
    description: "please wait...",
  });

  useEffect(() => {
    console.log(slideData);
    if (slideData[lang]) {
      const title = slideData[lang].title;
      const subtitle = slideData[lang].subtitle;
      const description = slideData[lang].description;
      const newData = {
        title: title,
        subtitle: subtitle,
        description: description,
      };
      setValues(newData);
    }

    // const Title = document.getElementById(`title${count}`);
    // const subtitle = document.getElementById(`subtitle${count}`);
    // const description = document.getElementById(`description${count}`);
  }, [count, crouLength, lang, slideData]);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    const data = document.getElementById(`${name}${count}`);
    if (data?.innerHTML !== undefined) data.innerHTML = value;
    setValues(() => ({
      ...values,
      [name]: value,
    }));
  };

  return (
    <>
      {showForm.title === true && (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="title..."
            value={
              slideData[lang] ? slideData[lang][count].title : "please wait...3"
            }
            onChange={handleInput}
          />
        </div>
      )}
      {showForm.subtitle === true && (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Textarea
            name="subtitle"
            id="subtitle"
            placeholder="subtitle..."
            className="h-fit"
            value={values.subtitle}
            onChange={handleInput}
          />
        </div>
      )}
      {showForm.description === true && (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            placeholder="Type your description here."
            name="description"
            id="description"
            className="resize-none"
            value={values.description}
            onChange={handleInput}
          />
        </div>
      )}
    </>
  );
}

export default TitleAndDescForm;
