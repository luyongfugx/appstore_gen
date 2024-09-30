"use client";
import React, { useEffect, useState } from "react";

import { MockUpData, useMyContext } from "@/lib/Context";

function MockUp(mockData: MockUpData) {
  return (
    <div
      className={`rounded-sm relative`}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
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
            viewBox={`0 0  ${mockData.mockWidth} ${mockData.mockHeight}`}
            fill="green"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <rect
                x={mockData.borderWidth / 2 + mockData.btnWidth}
                y={mockData.borderWidth / 2}
                width={
                  mockData.mockWidth -
                  mockData.borderWidth -
                  mockData.btnWidth * 2
                }
                height={
                  mockData.mockHeight - mockData.borderWidth - mockData.btnWidth
                }
                rx="170"
                stroke="currentColor"
                fill="none"
                strokeWidth={mockData.borderWidth}
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
                d={`M${mockData.mockWidth - mockData.btnWidth} 967V967C${
                  mockData.mockWidth - mockData.btnWidth / 2
                } 967 ${mockData.mockWidth} 975.954 ${
                  mockData.mockWidth
                } 987V1277C${mockData.mockWidth} 1288.05 1394.05 1297 ${
                  mockData.mockWidth - mockData.btnWidth
                } 1297V1297V967Z`}
                fill="currentColor"
              ></path>
              <foreignObject
                x={mockData.borderWidth + mockData.btnWidth}
                y={mockData.borderWidth}
                rx="170"
                width={
                  mockData.mockWidth -
                  mockData.btnWidth * 2 -
                  mockData.borderWidth * 2
                }
                height={mockData.mockHeight - mockData.borderWidth * 2}
              >
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={mockData.img}
                    alt="Screen content"
                    className="object-cover w-full h-full rounded-[120px]"
                  />
                </div>
              </foreignObject>
              <rect
                x="500"
                y="119"
                width="404"
                height="112"
                rx="56"
                fill="currentColor"
              ></rect>
            </g>
            <defs>
              {
                <clipPath id="clip0_86_55">
                  <rect
                    width={mockData.mockWidth}
                    height={mockData.mockHeight}
                    fill="white"
                  ></rect>
                </clipPath>
              }
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default MockUp;
