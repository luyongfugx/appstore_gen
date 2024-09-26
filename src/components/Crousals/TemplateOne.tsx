/* eslint-disable @next/next/no-img-element */
"use client";

import { boxData, useMyContext } from "@/lib/Context";
import React, { useEffect, useState } from "react";
import iosImg from "../../../public/ios.jpg";
import { Edit2Icon } from "lucide-react";
import { Button } from "../ui/Button";
import EditorForm from "../HomeBoxComponent/EditorForm";
import Moveable from "react-moveable";
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
  const [checkInput, setCheckInput] = useState(false);
  const [moveableId, setMoveableId] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  return (
    <>
      {tempData.screenData![lang].map((valArray, ix) => {
        indxCount = indxCount + 1;
        const ic = indxCount;
        return (
          <div className="flex" key={ix}>
            <div
              className={`${
                ix == count - 1
                  ? " mr-2 overflow-hidden relative"
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
                {ix == count - 1 && editing && moveableId.length > 0 && (
                  <Moveable
                    target={document.getElementById(moveableId)}
                    container={null}
                    origin={true}
                    checkInput={checkInput}
                    onClick={(e: any) => {
                      const target = e.inputEvent.target;
                      if (e.isDouble && target) {
                        target.focus();
                        setCheckInput(true);
                      }
                    }}
                    /* Resize event edges */
                    edge={true}
                    /* draggable */
                    draggable={true}
                    throttleDrag={0}
                    onDragStart={({ target, clientX, clientY }) => {
                      console.log("onDragStart", target);
                    }}
                    onDrag={({
                      target,
                      beforeDelta,
                      beforeDist,
                      left,
                      top,
                      right,
                      bottom,
                      delta,
                      dist,
                      transform,
                      clientX,
                      clientY,
                    }: any) => {
                      console.log("onDrag left, top", left, top);
                      // target!.style.left = `${left}px`;
                      // target!.style.top = `${top}px`;
                      console.log("onDrag translate", dist);
                      target!.style.transform = transform;
                    }}
                    onDragEnd={({ target, isDrag, clientX, clientY }) => {
                      console.log("onDragEnd", target, isDrag);
                    }}
                    /* When resize or scale, keeps a ratio of the width, height. */
                    // keepRatio={true}
                    /* resizable*/
                    /* Only one of resizable, scalable, warpable can be used. */
                    resizable={true}
                    throttleResize={0}
                    onResizeStart={({ target, clientX, clientY }) => {
                      console.log("onResizeStart", target);
                    }}
                    onResize={({
                      target,
                      width,
                      height,
                      dist,
                      delta,
                      direction,
                      clientX,
                      clientY,
                    }: any) => {
                      console.log("onResize", target);
                      delta[0] && (target!.style.width = `${width}px`);
                      delta[1] && (target!.style.height = `${height}px`);
                    }}
                    onResizeEnd={({ target, isDrag, clientX, clientY }) => {
                      console.log("onResizeEnd", target, isDrag);
                    }}
                    /* scalable */
                    /* Only one of resizable, scalable, warpable can be used. */
                    // scalable={true}
                    // throttleScale={0}
                    // onScaleStart={({ target, clientX, clientY }) => {
                    //   console.log("onScaleStart", target);
                    // }}
                    // onScale={({
                    //   target,
                    //   scale,
                    //   dist,
                    //   delta,
                    //   transform,
                    //   clientX,
                    //   clientY,
                    // }: any) => {
                    //   console.log("onScale scale", scale);
                    //   target!.style.transform = transform;
                    // }}
                    // onScaleEnd={({ target, isDrag, clientX, clientY }) => {
                    //   console.log("onScaleEnd", target, isDrag);
                    // }}
                    /* rotatable */
                    rotatable={true}
                    throttleRotate={0}
                    onRotateStart={({ target, clientX, clientY }) => {
                      console.log("onRotateStart", target);
                    }}
                    onRotate={({
                      target,
                      delta,
                      dist,
                      transform,
                      clientX,
                      clientY,
                    }: any) => {
                      console.log("onRotate", dist);
                      target!.style.transform = transform;
                    }}
                    onRotateEnd={({ target, isDrag, clientX, clientY }) => {
                      console.log("onRotateEnd", target, isDrag);
                    }}
                    // Enabling pinchable lets you use events that
                    // can be used in draggable, resizable, scalable, and rotateable.
                    pinchable={true}
                    onPinchStart={({ target, clientX, clientY, datas }) => {
                      // pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
                      console.log("onPinchStart");
                    }}
                    onPinch={({ target, clientX, clientY, datas }) => {
                      // pinch event occur before drag, rotate, scale, resize
                      console.log("onPinch");
                    }}
                    onPinchEnd={({
                      isDrag,
                      target,
                      clientX,
                      clientY,
                      datas,
                    }) => {
                      // pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
                      console.log("onPinchEnd");
                    }}
                  />
                )}
                <div
                  key={ix}
                  className={`p-2 rounded-sm  h-full w-full  relative `}
                  style={{ borderColor: tempData.primaryColor }}
                >
                  {valArray.map((val, indx) => {
                    const x = indx + 1;
                    const moveId = `${val.name}${ic}${indx}`;
                    return val.type == "text" ? (
                      <div
                        className={
                          val?.value !== null
                            ? ` text-${val?.font?.size} font-${val?.font?.weight}  whitespace-pre-wrap  `
                            : "hidden"
                        }
                        key={indx}
                        contentEditable={editId == moveId ? true : false}
                        onBlur={(evt) => {
                          setTextValue(val.name, evt.target.innerText, indx);
                          setEdittingItem("");
                          setEditId("");
                          setCheckInput(false);
                          setMoveableId("");
                        }}
                        id={moveId}
                        onClick={(e) => {
                          setMoveableId(moveId);
                          setEdittingItem(val.name);
                          setCount(ix + 1);
                          setEditting(true);
                          // setMoveableId(moveId);
                          // // setEdittingItem(val.name);
                          // setCount(ix + 1);
                        }}
                        onDoubleClick={(e: any) => {
                          setMoveableId(moveId);
                          setEditId(moveId);
                          setEditting(true);
                          setEdittingItem(val.name);
                          setCount(ix + 1);
                          setTimeout(() => {
                            e.target.focus();
                          });
                        }}
                        style={{
                          color: val?.font?.color,
                        }}
                      >
                        {val?.value}
                      </div>
                    ) : (
                      <img
                        id={moveId}
                        key={indx}
                        onClick={() => {
                          setEditting(true);
                          setEdittingItem(val.name);
                          setMoveableId(moveId);
                          setCount(ix + 1);
                        }}
                        className={`${
                          editingItem == val.name && ix === count - 1
                            ? "border-green-500  border-2"
                            : ""
                        } rounded-sm`}
                        src={val?.value || iosImg.src}
                        alt={val?.value}
                        style={{
                          top: val.box.y,
                          left: val.box.x,
                          width: val.box.w,
                          height: val.box.h,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* <Button
                onClick={() => {
                  setEditting(true);
                  setCount(ix + 1);
                }}
                className="absolute flex justify-center items-center right-2 w-10 h-10 rounded-full top-2"
              >
                <Edit2Icon className=" h-8 w-8 " />
              </Button> */}
            </div>
            {ix == count - 1 && editing && (
              <div className="flex flex-col h-full p-3 gap-6 w-[40%]">
                <EditorForm templateName={templateName} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default TemplateOne;
