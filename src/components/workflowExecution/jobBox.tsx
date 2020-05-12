import * as React from "react";
import { makeSafeForCSS } from "./utils";

export const JobBox: React.FC<{
  workflowVisId: number;

  header: JSX.Element;
  headerClassname?: string;

  content: JSX.Element;

  connectorId: string;
}> = ({ workflowVisId, connectorId, content, header, headerClassname }) => {
  return (
    <div
      className={`flex-0 border border-gray-500 rounded bg-white shadow relative m-3 last:mr-0 ${headerClassname}`}
      // style={{ width: "280px" }}
    >
      <div
        className="absolute bg-gray-200 rounded-t-full border border-b-0 border-gray-500"
        style={{
          width: "20px",
          height: "10px",
          top: "-10px",
          left: "20px",
        }}
      >
        <div
          className={`absolute bg-gray-600 rounded-full ci-${workflowVisId}-${makeSafeForCSS(
            connectorId
          )}`}
          style={{
            top: "4px",
            left: "4px",
            width: "10px",
            height: "10px",
          }}
        ></div>
      </div>
      <div
        className="absolute rounded-b-full shadow bg-white border border-t-0"
        style={{
          width: "20px",
          height: "10px",
          bottom: "-9.5px",
          right: "20px",
        }}
      >
        <div
          className={`absolute bg-blue-400 rounded-full co-${workflowVisId}-${makeSafeForCSS(
            connectorId
          )}`}
          style={{
            bottom: "4px",
            left: "4px",
            width: "10px",
            height: "10px",
          }}
        ></div>
      </div>
      <div className="flex flex-row bg-gray-200 rounded rounded-b-none ">
        {header}
      </div>
      <div className="p-2">{content}</div>
    </div>
  );
};
