/* eslint-disable @next/next/no-img-element */
"use client";

import { boxData, TemplateData, useMyContext } from "@/lib/Context";
import React, { useEffect, useRef, useState } from "react";
import iosImg from "../../../public/ios.jpg";
import {
  AlignCenter,
  BringToFront,
  Copy,
  Edit2Icon,
  ImageDown,
  SendToBack,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/Button";
import EditorForm from "../HomeBoxComponent/EditorForm";
import Moveable, { MoveableManagerInterface, Renderer } from "react-moveable";
import MockUp from "../screen/mockup";

function TemplateOne() {
  const {
    templateDatas,
    setCrouLength,
    count,
    selectedLanguage,
    keepRatio,
    setKeepRatio,
    setCount,
    outPutSize,
    setEditting,
    moveableId,
    setMoveableId,
    editId,
    setEditId,
    editing,
    editingItem,
    setEdittingItem,
    setTemplateDatas,
  } = useMyContext();
  const scale = 5;
  const templateName = "TemplateOne";
  const onCrousalLoad = () => {
    const tempD = templateDatas[templateName];
    setCrouLength(tempD.screenData![selectedLanguage].length);
  };
  useEffect(() => {
    onCrousalLoad();
    // setTempData(templateDatas[templateName]);
  }, [templateDatas]);

  // const [tempData, setTempData] = useState<TemplateData>();
  const setTextValue = (value: string, index: number) => {
    const item: boxData[] =
      templateDatas[templateName]!.screenData![selectedLanguage][
        count > 1 ? count - 1 : 0
      ];
    item[index].value = value;
    templateDatas[templateName] = templateDatas[templateName]!;
    const newTemplateDatas = { ...templateDatas };
    setTemplateDatas(newTemplateDatas);
  };

  // CUSTOM INDX
  let indxCount = 0;
  const [checkInput, setCheckInput] = useState(false);
  interface CustomAbleProps {
    moveableId: string;
    // rotate: number;
  }

  const DimensionViewable = {
    name: "dimensionViewable",
    props: ["moveableId", "rotate"],
    events: [],
    css: ["moveable-dimension"],
    render(
      moveable: MoveableManagerInterface<CustomAbleProps>,
      React: Renderer
    ) {
      const rect = moveable.getRect();
      return React.createElement(
        "div",
        {
          class: "moveable-dimension",
          style: {
            cursor: "pointer",
            position: "absolute",
            left: rect.width - 4 * 24,
            top: -24,
            background: "#4af",
            // borderRadius: "4px",
            // padding: "2px 4px",
            color: "white",
            fontSize: "20px",
            whiteSpace: "nowrap",
            fontWeight: "bold",
            willChange: "transform",
            // transform: "translate(-50%, 0px)",
            transform: "rotate(" + editingItem.box.rotate + "deg)",
          },
          key: "dimension-viewer",
        },
        // <svg aria-hidden="true" viewBox="0 0 24 24">
        //   <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        // </svg>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              display: "flex",
              borderWidth: 1,
              borderColor: "white",
              padding: 2,
              justifyContent: "center",
            }}
            onClick={() => {
              const nArray = moveableId.split("_");
              const ic = parseInt(nArray[0]);
              const indx = parseInt(nArray[1]);
              const nowItem =
                templateDatas[templateName]!.screenData![selectedLanguage][
                  ic > 1 ? ic - 1 : 0
                ][indx];
              const d = {
                ...nowItem,
              };
              delete templateDatas[templateName]!.screenData![selectedLanguage][
                ic > 1 ? ic - 1 : 0
              ][indx];
              const newTemplateDatas = { ...templateDatas };
              const tempData3 = newTemplateDatas[templateName];
              tempData3.screenData![selectedLanguage][
                ic > 1 ? ic - 1 : 0
              ].unshift(d);
              setTemplateDatas(newTemplateDatas);
              setTimeout(() => {
                const nId = ic + "_" + 0;
                setMoveableId(nId);
                setEditting(true);
                setEdittingItem(
                  tempData3.screenData![selectedLanguage][
                    ic > 1 ? ic - 1 : 0
                  ][0]
                );
              }, 200);
            }}
          >
            <SendToBack className="h-5 w-5 " />
          </div>
          <div
            style={{
              width: 24,
              height: 24,
              borderWidth: 1,
              borderColor: "white",
              padding: 2,
              display: "flex",
              justifyContent: "center",
            }}
            onClick={() => {
              const nArray = moveableId.split("_");
              const ic = parseInt(nArray[0]);
              const indx = parseInt(nArray[1]);
              const nowItem =
                templateDatas[templateName]!.screenData![selectedLanguage][
                  ic > 1 ? ic - 1 : 0
                ][indx];
              const d = {
                ...nowItem,
              };
              delete templateDatas[templateName]!.screenData![selectedLanguage][
                ic > 1 ? ic - 1 : 0
              ][indx];
              const newTemplateDatas = { ...templateDatas };
              const tempData3 = newTemplateDatas[templateName];
              tempData3.screenData![selectedLanguage][ic > 1 ? ic - 1 : 0].push(
                d
              );
              setTemplateDatas(newTemplateDatas);
              setTimeout(() => {
                const len =
                  tempData3.screenData![selectedLanguage][ic > 1 ? ic - 1 : 0]
                    .length - 1;
                const nId = ic + "_" + len;
                setMoveableId(nId);
                setEditting(true);
                setEdittingItem(
                  tempData3.screenData![selectedLanguage][ic > 1 ? ic - 1 : 0][
                    indx + 1
                  ]
                );
              }, 200);
            }}
          >
            <BringToFront className="h-5 w-5 " />
          </div>
          <div
            style={{
              width: 24,
              height: 24,
              display: "flex",
              borderWidth: 1,
              borderColor: "white",
              padding: 2,
              justifyContent: "center",
            }}
            onClick={() => {
              const nArray = moveableId.split("_");
              const ic = parseInt(nArray[0]);
              const indx = parseInt(nArray[1]);
              const nowItem =
                templateDatas[templateName]!.screenData![selectedLanguage][
                  ic > 1 ? ic - 1 : 0
                ][indx];
              const d = {
                ...nowItem,
              };
              d.box = {
                ...d.box,
              };
              d.box.x = d.box.x + 30;
              d.box.y = d.box.y + 100;
              const newTemplateDatas = { ...templateDatas };
              const tempData3 = newTemplateDatas[templateName];
              tempData3.screenData![selectedLanguage][ic > 1 ? ic - 1 : 0].push(
                d
              );
              setTemplateDatas(newTemplateDatas);
              setTimeout(() => {
                const len =
                  tempData3.screenData![selectedLanguage][ic > 1 ? ic - 1 : 0]
                    .length - 1;
                const nId = ic + "_" + len;
                setMoveableId(nId);
                setEditting(true);
                setEdittingItem(
                  tempData3.screenData![selectedLanguage][ic > 1 ? ic - 1 : 0][
                    indx + 1
                  ]
                );
              }, 200);

              // setCount(ix + 1);
              //setKeepRatio(true);
              //console.log("delete moveableId:" + moveable.props.moveableId);
            }}
          >
            <Copy className="h-5 w-5 " />
          </div>
          <div
            onClick={() => {
              const nArray = moveableId.split("_");
              // const name = nArray[0];
              const ic = parseInt(nArray[0]);
              const indx = parseInt(nArray[1]);
              delete templateDatas[templateName]!.screenData![selectedLanguage][
                ic > 1 ? ic - 1 : 0
              ][indx];
              templateDatas[templateName] = templateDatas[templateName]!;
              const newTemplateDatas = { ...templateDatas };
              setTemplateDatas(newTemplateDatas);
              setEditting(false);
              setMoveableId("");
              //console.log("delete moveableId:" + moveable.props.moveableId);
            }}
            style={{
              width: 24,
              height: 24,
              display: "flex",
              borderWidth: 1,
              borderColor: "white",
              padding: 2,
              justifyContent: "center",
            }}
          >
            <Trash2 className="h-5 w-5 " />
          </div>
        </div>

        // Math.round(rect.offsetWidth) + "X" + Math.round(rect.offsetHeight)
      );
    },
  };

  return (
    <>
      {templateDatas[templateName] &&
        templateDatas[templateName].screenData![selectedLanguage].map(
          (valArray, ix) => {
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
                    className={`rounded-sm  overflow-hidden `}
                    style={
                      templateDatas[templateName].bg &&
                      templateDatas[templateName]?.bg.length > 1
                        ? {
                            backgroundImage:
                              "url(" + templateDatas[templateName]?.bg + ")",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: outPutSize.width / scale,
                            height: outPutSize.height / scale,
                          }
                        : {
                            backgroundColor:
                              templateDatas[templateName].bgColor,
                            width: outPutSize.width / scale,
                            height: outPutSize.height / scale,
                          }
                    }
                  >
                    {ix == count - 1 && editing && moveableId.length > 0 && (
                      <Moveable
                        ables={[DimensionViewable]}
                        dimensionViewable={true}
                        props={{
                          moveableId: moveableId,
                        }}
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
                          // console.log("onDragStart", target);
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
                          target!.style.left = `${left}px`;
                          target!.style.top = `${top}px`;
                          const nArray = moveableId.split("_");
                          const ic1 = parseInt(nArray[0]);
                          const indx1 = parseInt(nArray[1]);
                          const item: boxData[] =
                            templateDatas[templateName].screenData![
                              selectedLanguage
                            ][ic1 > 1 ? ic1 - 1 : 0];
                          item[indx1].box.x = left;
                          item[indx1].box.y = top;
                          templateDatas[templateName] =
                            templateDatas[templateName];
                          const newTemplateDatas = { ...templateDatas };
                          setTemplateDatas(newTemplateDatas);
                        }}
                        onDragEnd={({ target, isDrag, clientX, clientY }) => {
                          // console.log("onDragEnd", target, isDrag);
                        }}
                        /* When resize or scale, keeps a ratio of the width, height. */
                        keepRatio={keepRatio}
                        /* resizable*/
                        /* Only one of resizable, scalable, warpable can be used. */
                        resizable={true}
                        throttleResize={0}
                        onResizeStart={({ target, clientX, clientY }) => {
                          // console.log("onResizeStart", target);
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
                          const nArray = moveableId.split("_");
                          // const name = nArray[0];
                          const ic1 = parseInt(nArray[0]);
                          const indx1 = parseInt(nArray[1]);
                          const item: boxData[] =
                            templateDatas[templateName].screenData![
                              selectedLanguage
                            ][ic1 > 1 ? ic1 - 1 : 0];
                          item[indx1].box.w = width;
                          item[indx1].box.h = height;
                          templateDatas[templateName] =
                            templateDatas[templateName];
                          const newTemplateDatas = { ...templateDatas };
                          setTemplateDatas(newTemplateDatas);
                          delta[0] && (target!.style.width = `${width}px`);
                          delta[1] && (target!.style.height = `${height}px`);
                        }}
                        onResizeEnd={({ target, isDrag, clientX, clientY }) => {
                          // console.log("onResizeEnd", target, isDrag);
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
                          //console.log("onRotateStart", target);
                        }}
                        onRotate={({
                          target,
                          delta,
                          dist,
                          transform,
                          clientX,
                          clientY,
                        }: any) => {
                          const nArray = moveableId.split("_");
                          // const name = nArray[0];
                          const ic1 = parseInt(nArray[0]);
                          const indx1 = parseInt(nArray[1]);
                          const item: boxData[] =
                            templateDatas[templateName].screenData![
                              selectedLanguage
                            ][ic1 > 1 ? ic1 - 1 : 0];
                          item[indx1].box.rotate = dist;
                          // setRotate(dist);
                          templateDatas[templateName] =
                            templateDatas[templateName];
                          const newTemplateDatas = { ...templateDatas };
                          setTemplateDatas(newTemplateDatas);
                          console.log("tram", transform);
                          // console.log(
                          //   "onRotate",
                          //   target,
                          //   delta,
                          //   dist,
                          //   transform,
                          //   clientX,
                          //   clientY
                          // );
                          // target!.style.transform = transform;
                        }}
                        onRotateEnd={({ target, isDrag, clientX, clientY }) => {
                          // console.log("onRotateEnd", target, isDrag);
                        }}
                        // Enabling pinchable lets you use events that
                        // can be used in draggable, resizable, scalable, and rotateable.
                        pinchable={true}
                        onPinchStart={({ target, clientX, clientY, datas }) => {
                          // pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
                          // console.log("onPinchStart");
                        }}
                        onPinch={({ target, clientX, clientY, datas }) => {
                          // pinch event occur before drag, rotate, scale, resize
                          //console.log("onPinch");
                        }}
                        onPinchEnd={({
                          isDrag,
                          target,
                          clientX,
                          clientY,
                          datas,
                        }) => {
                          // pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
                          // console.log("onPinchEnd");
                        }}
                      />
                    )}
                    <div
                      key={ix}
                      className={`p-2 rounded-sm  h-full w-full  relative `}
                      style={{
                        borderColor: templateDatas[templateName].primaryColor,
                      }}
                    >
                      {valArray.map((val, indx) => {
                        const x = indx + 1;
                        //const moveId = `${val.name}_${ic}_${indx}`;
                        const moveId = `${ic}_${indx}`;
                        return val.type == "text" ? (
                          <div
                            className={
                              val?.value !== null
                                ? ` flex absolute justify-${val.font?.align} `
                                : "hidden"
                            }
                            key={indx}
                            contentEditable={editId == moveId ? true : false}
                            onBlur={(evt) => {
                              setTextValue(evt.target.innerText, indx);
                              setEdittingItem("");
                              setEditId("");
                              setCheckInput(false);
                              setMoveableId("");
                            }}
                            id={moveId}
                            onClick={(e) => {
                              setMoveableId(moveId);
                              setEdittingItem(val);
                              setCount(ix + 1);
                              setEditting(true);
                              setKeepRatio(false);
                            }}
                            onDoubleClick={(e: any) => {
                              setMoveableId(moveId);
                              setEditId(moveId);
                              setEditting(true);
                              setEdittingItem(val);
                              setCount(ix + 1);
                              setTimeout(() => {
                                e.target.focus();
                              });
                            }}
                            style={{
                              color: val?.font?.color,
                              fontSize: val?.font?.size,
                              fontFamily: val?.font?.family,
                              fontStyle: val.font?.italic ? "italic" : "normal",
                              fontWeight: val.font?.bold ? "bolder" : "lighter",
                              textAlign: "center",
                              top: val.box.y,
                              left: val.box.x,
                              width: val.box.w,
                              transform: "rotate(" + val.box.rotate + "deg)",
                              textDecoration: val.font?.underline
                                ? "underline"
                                : "auto",
                            }}
                          >
                            {val?.value}
                          </div>
                        ) : (
                          <div
                            id={moveId}
                            key={indx}
                            onClick={() => {
                              setEditting(true);
                              setEdittingItem(val);
                              setMoveableId(moveId);
                              setCount(ix + 1);
                              setKeepRatio(true);
                            }}
                            className={`rounded-sm absolute `}
                            style={{
                              top: val.box.y,
                              left: val.box.x,
                              width: (1280 + 50) / 6,
                              height: (2744 + 30) / 6,
                              transform: "rotate(" + val.box.rotate + "deg)",
                            }}
                          >
                            <MockUp
                              name={"ios6.5"}
                              width={(1280 + 50) / 6}
                              height={(2744 + 30) / 6}
                              mockWidth={1280 + 50}
                              mockHeight={2744 + 30}
                              borderWidth={60}
                              img={val.value!}
                              btnWidth={20}
                              showIsLand={true}
                            />
                            {/* <div
                          className={`rounded-sm relative`}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <div
                            className="absolute"
                            style={{
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: val.box.h,
                            }}
                          >
                            <img
                              className={`absolute`}
                              src={val?.value || iosImg.src}
                              alt={val?.value}
                              style={{
                                top: 30 * (val.box.w / 2688),
                                left: 30 * (val.box.h / 1242),
                                width: val.box.w - 2 * 30 * (val.box.w / 1242),
                                height: val.box.h - 2 * 30 * (val.box.h / 2688),
                              }}
                              // style={{
                              //   top: 30 * (val.box.w / 2688),
                              //   left: 30 * (val.box.h / 1242),
                              //   width: val.box.w - 2 * 30 * (val.box.w / 1242),
                              //   height: val.box.h - 2 * 30 * (val.box.h / 2688),
                              // }}
                            />
                          </div>
                          <div
                            className="rounded-sm absolute"
                            style={{
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <div>
                              <svg
                                viewBox="0 0 1342 2748"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_86_55)">
                                  <rect
                                    x="50"
                                    y="30"
                                    width="1242"
                                    height="2688"
                                    rx="170"
                                    stroke="currentColor"
                                    strokeWidth="60"
                                  ></rect>
                                  <rect
                                    x="500"
                                    y="119"
                                    width="404"
                                    height="112"
                                    rx="56"
                                    fill="currentColor"
                                  ></rect>
                                  <path
                                    d="M0 800C0 788.954 8.95431 780 20 780V780V1010V1010C8.95431 1010 0 1001.05 0 990V800Z"
                                    fill="currentColor"
                                  ></path>
                                  <path
                                    d="M0 1080C0 1068.95 8.95431 1060 20 1060V1060V1290V1290C8.95431 1290 0 1281.05 0 1270V1080Z"
                                    fill="currentColor"
                                  ></path>
                                  <path
                                    d="M0 550C0 538.954 8.95431 530 20 530V530V650V650C8.95431 650 0 641.046 0 630V550Z"
                                    fill="currentColor"
                                  ></path>
                                  <path
                                    d="M1322 967V967C1394.05 967 1342 975.954 1342 987V1277C1342 1288.05 1394.05 1297 1322 1297V1297V967Z"
                                    fill="currentColor"
                                  ></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_86_55">
                                    <rect
                                      width="1342"
                                      height="2748"
                                      fill="white"
                                    ></rect>
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                        </div> */}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* {ix == count - 1 && editing && (
              <div className="flex flex-col h-full p-3 gap-6 w-[40%] ">
                <EditorForm templateName={templateName} />
              </div>
            )} */}
              </div>
            );
          }
        )}
    </>
  );
}

export default TemplateOne;
