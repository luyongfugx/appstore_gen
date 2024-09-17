/* eslint-disable @next/next/no-img-element */
"use client";

import { useMyContext } from "@/lib/Context";
import React, { useEffect, useState } from "react";
import iosImg from "../../../public/ios.jpg";
import TitleAndDescForm from "../HomeBoxComponent/TitleAndDescForm";
import AddImage from "../HomeBoxComponent/AddImage";

function TemplateOne() {
  const { templateDatas, setCrouLength, count, lang, outPutSize } =
    useMyContext();

  const scale = 5;
  const templateName = "TemplateOne";
  const onCrousalLoad = () => {
    const tempD = templateDatas[templateName];
    setCrouLength(tempD.screenData![lang].length);
  };
  useEffect(() => {
    onCrousalLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateDatas]);

  // CUSTOM INDX
  let indxCount = 0;
  const tempData = templateDatas[templateName];

  return (
    <>
      {tempData.screenData![lang].map((val, indx) => {
        indxCount = indxCount + 1;
        return (
          <div className="flex" key={indx}>
            <div
              className={`${
                indx == count - 1
                  ? "border-red-500 border-dashed border-2 mr-2 overflow-hidden"
                  : "mr-2 overflow-hidden"
              } `}
              key={indx}
            >
              <div
                key={indx}
                id={`slide${indxCount}`}
                className={`rounded-sm  overflow-hidden`}
                style={
                  tempData.bg && tempData?.bg.length > 1
                    ? {
                        backgroundImage: "url(" + tempData?.bg + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: outPutSize.width / scale,
                        height: outPutSize.height / scale,
                      }
                    : {
                        backgroundColor: tempData.bgColor,
                        width: outPutSize.width / scale,
                        height: outPutSize.height / scale,
                      }
                }
              >
                <div
                  className={`p-2 h-full w-full  relative   rounded-sm flex flex-col items-center justify-center `}
                  style={{ borderColor: tempData.primaryColor }}
                >
                  <div
                    className="h-full w-full flex justify-start flex-col"
                    style={{ color: tempData.primaryColor }}
                  >
                    <span
                      id={`title${indxCount}  `}
                      className={
                        val?.title !== null
                          ? " text-3xl text-center font-bold w-full whitespace-pre-wrap"
                          : "hidden"
                      }
                      style={{ color: tempData.primaryColor }}
                    >
                      {val?.title}
                    </span>

                    <span
                      id={`subtitle${indxCount}`}
                      className={
                        val.subtitle !== null
                          ? "text-lg text-start font-medium w-full whitespace-pre-wrap mb-2"
                          : "hidden"
                      }
                      style={{ color: tempData.primaryColor }}
                    >
                      {val.subtitle}
                    </span>

                    <div
                      id={`image${indxCount}`}
                      className={
                        val?.banner
                          ? "relative flex w-full justify-center items-center "
                          : "hidden"
                      }
                    >
                      <img
                        className="rounded-sm"
                        // src={iosImg.src}
                        src={val.bannerUrl || iosImg.src}
                        alt="banners"
                        height={"auto"}
                        width={"80%"}
                        id={`slideImg${indxCount}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {indx == count - 1 && (
              <div className="flex flex-col h-full p-3 gap-6 w-[40%]">
                <TitleAndDescForm templateName={templateName} />
                <AddImage templateName={templateName} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default TemplateOne;
