/* eslint-disable @next/next/no-img-element */
"use client";

import { boxData, useMyContext } from "@/lib/Context";
import React, { useEffect } from "react";
import iosImg from "../../../public/ios.jpg";
import { Edit2Icon } from "lucide-react";
import { Button } from "../ui/Button";
import EditorForm from "../HomeBoxComponent/EditorForm";
function TemplateOne() {
  const {
    templateDatas,
    setCrouLength,
    count,
    lang,
    setCount,
    outPutSize,
    setEditting,
    editing,
    editingItem,
    setEdittingItem,
    setTemplateDatas,
  } = useMyContext();
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

  const setTextValue = (name: string, value: string, index: number) => {
    const item: boxData[] =
      tempData.screenData![lang][count > 1 ? count - 1 : 0];
    item[index].value = value;
    templateDatas[templateName] = tempData;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
  };
  // CUSTOM INDX
  let indxCount = 0;
  const tempData = templateDatas[templateName];

  return (
    <>
      {tempData.screenData![lang].map((valArray, ix) => {
        indxCount = indxCount + 1;
        return (
          <div className="flex" key={ix}>
            <div
              className={`${
                ix == count - 1
                  ? "border-blue-500  border-2 mr-2 overflow-hidden relative"
                  : "mr-2 overflow-hidden relative"
              } `}
              key={ix}
            >
              <div
                key={ix}
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
                  key={ix}
                  className={`p-2 rounded-sm  h-full w-full  relative `}
                  style={{ borderColor: tempData.primaryColor }}
                >
                  {valArray.map((val, indx) => {
                    const x = indx + 1;
                    return val.type == "text" ? (
                      <div
                        key={indx}
                        contentEditable
                        onBlur={(evt) => {
                          setTextValue(val.name, evt.target.innerText, indx);
                          setEdittingItem("");
                        }}
                        id={`${val.name}${indxCount}  `}
                        onClick={() => {
                          setEdittingItem(val.name);
                          setCount(ix + 1);
                        }}
                        className={
                          val?.value !== null
                            ? `${
                                editingItem == val.name && ix === count - 1
                                  ? "border-green-500  border-2"
                                  : ""
                              } text-${val?.font?.size} font-${
                                val?.font?.weight
                              }  whitespace-pre-wrap cursor-text absolute  overflow-hidden ] `
                            : "hidden"
                        }
                        style={{
                          color: val?.font?.color,
                          zIndex: val.zIndex,
                          top: val.box.y,
                          width: val.box.w,
                          // height: val.box.h,
                          left: val.box.x,
                        }}
                      >
                        {val?.value}
                      </div>
                    ) : (
                      <div
                        id={`${val.name}${indxCount}  `}
                        key={indx}
                        onClick={() => {
                          setEdittingItem(val.name);
                          setCount(ix + 1);
                        }}
                        className={
                          val?.value
                            ? `  absolute flex w-full justify-center items-start `
                            : "hidden"
                        }
                        style={{
                          top: val.box.y,
                          left: val.box.x,
                          zIndex: val.zIndex,
                        }}
                      >
                        <img
                          className={`${
                            editingItem == val.name && ix === count - 1
                              ? "border-green-500  border-2"
                              : ""
                          } rounded-sm`}
                          src={val?.value || iosImg.src}
                          alt={val?.value}
                          id={`slideImg${indxCount}`}
                          style={{
                            width: val.box.w,
                            height: val.box.h,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button
                onClick={() => {
                  setEditting(true);
                  setCount(ix + 1);
                }}
                className="absolute flex justify-center items-center right-2 w-10 h-10 rounded-full top-2"
              >
                <Edit2Icon className=" h-8 w-8 " />
              </Button>
            </div>
            {ix == count - 1 && editing && (
              <div className="flex flex-col h-full p-3 gap-6 w-[40%]">
                <EditorForm templateName={templateName} />
                {/* <AddImage templateName={templateName} /> */}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default TemplateOne;
