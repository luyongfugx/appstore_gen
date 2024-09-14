/* eslint-disable @next/next/no-img-element */
"use client";

import { useMyContext } from "@/lib/Context";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserHandleCard from "./UserHandleCard";
import bannerImg from "../../../public/banner.png";
import iosImg from "../../../public/ios.jpg";
function TemplateOne() {
  const {
    setCrouLength,
    bgColor,
    setBgColor,
    primaryColor,
    setPrimaryColor,
    myImg,
    bg,
    count,
    setHaveImg,
    banner,
    setShowForm,
  } = useMyContext();

  const [templateData, setTemplateData] = useState({
    crousal: [
      {
        className: "",
        Title: "Stand out from the crowd.",
        subtitle: `App subtitle text, intuitive design and powerful features.`,
        description: null,
        banner: true,
        bannerUrl: banner,
      },
      {
        className: "",

        Title: "TOPICAL AND CONTROVERSIAL",
        subtitle: `IS ELON MUSK RUINING TWITTER?`,
        description: `People love controversial current events. Keep an eye out for what's happening in the world - even better if it's in your niche - then use it as the hook to share your idea.`,
        banner: true,
        bannerUrl: banner,
      },
      // {
      //   className: "",

      //   Title: "USE AS A MENTOR",
      //   subtitle: `THE DAY NAVAL RAVIKANT SLAPPED ME IN THE FACE`,
      //   description: `Build authority by association by using names in your niche. BUT make sure you're the star of the show. People are here for your ideas.`,
      //   banner: true,
      //   bannerUrl: banner,
      // },
      // {
      //   className: "",

      //   Title: "USE THE COMPETITION",
      //   subtitle: `I GOT INTO A BAR FIGHT WITH JUSTIN WELSH AND DAN KOE`,
      //   description: `You need a different point of view to stand out. But the secret isn't to attack other creators. It's to shed new light on an old concept.`,
      //   banner: true,
      //   bannerUrl: banner,
      // },
      // {
      //   className: "",

      //   Title: "Thanks for reading!",
      //   subtitle: `If you enjoyed this, come join 25,000+ creators reading my newsletter Digital Freedom and get weekly actionable advice to build your creator business`,
      //   description: ` 💖 🔥 🔗`,
      //   banner: false,
      //   bannerUrl: null,
      // },
    ],
    arrow: true,
    defaultBg: "#000",
    primaryColor: "#f2ffd5",
  });

  useEffect(() => {
    if (count >= 1) {
      const len = count - 1;
      const handleShow = {
        title: templateData.crousal[len].Title !== null ? true : false,
        subtitle: templateData.crousal[len]?.subtitle !== null ? true : false,
        description:
          templateData.crousal[len]?.description !== null ? true : false,
      };
      setShowForm(handleShow);
    }
  }, [count]);

  // Function to update the bannerUrl for a specific item
  const updateBannerUrl = (index: number, newUrl: string) => {
    // Create a copy of the templateData
    const updatedTemplateData = { ...templateData };

    // Update the bannerUrl of the specified item
    updatedTemplateData.crousal[index] = {
      ...updatedTemplateData.crousal[index],
      bannerUrl: newUrl,
    };

    // Update the state with the modified data
    setTemplateData(updatedTemplateData);
  };
  // IT WILL RUN WHEN THE USER UPLOAD IMG FOR BANNER
  useEffect(() => {
    if (count !== null) {
      const indx = count - 1;
      if (myImg !== templateData.crousal[indx]?.bannerUrl) {
        updateBannerUrl(indx, myImg);
      }
    }
  }, [myImg]);

  const onCrousalLoad = () => {
    setCrouLength(templateData.crousal.length);
    setBgColor(templateData.defaultBg);
    setPrimaryColor(templateData.primaryColor);
  };

  // OPENING USE-EFFECT
  useEffect(() => {
    setHaveImg(false);
    onCrousalLoad();
  }, []);

  // CUSTOM INDX
  let indxCount = 0;

  return (
    <>
      {templateData.crousal.map((val, indx) => {
        indxCount = indxCount + 1;

        return (
          <div
            key={indx}
            id={`slide${indxCount}`}
            className="h-[699px]  block w-[322px] rounded-sm"
            style={
              bg.length > 1
                ? {
                    backgroundImage: "url(" + bg + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : { backgroundColor: bgColor }
            }
          >
            <div
              className={`p-5 h-full   relative   rounded-sm flex flex-col items-center justify-between gap-4`}
              style={{ borderColor: primaryColor }}
            >
              <div
                className="h-full w-[90%] flex justify-start flex-col"
                style={{ color: primaryColor }}
              >
                <span
                  id={`title${indxCount}`}
                  className={
                    val?.Title !== null
                      ? " text-3xl text-start font-bold w-full whitespace-pre-wrap text-white"
                      : "hidden"
                  }
                >
                  {val?.Title}
                </span>

                <span
                  id={`subtitle${indxCount}`}
                  className={
                    val.subtitle !== null
                      ? "text-lg text-start font-medium w-full whitespace-pre-wrap text-white mb-2"
                      : "hidden"
                  }
                >
                  {val.subtitle}
                </span>

                <div
                  id={`image${indxCount}`}
                  className={
                    val?.banner
                      ? "relative w-[256px] h-[555px] flex justify-center "
                      : "hidden"
                  }
                >
                  <img
                    src={iosImg.src}
                    alt="banners"
                    height={"auto"}
                    width={"100%"}
                    id={`slideImg${indxCount}`}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TemplateOne;
