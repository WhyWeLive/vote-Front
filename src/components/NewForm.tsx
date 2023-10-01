import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import remarkGfm from "remark-gfm";
import { DateTime } from "luxon";
import * as luxon from "luxon";
import { FaPencilAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { Slide } from "./UI/Slide";

luxon.Settings.defaultLocale = "ru";
luxon.Settings.defaultZone = "UTC+7";

export const NewForm = ({
  grup,
  header,
  content,
  createdAt,
  userData,
  id,
  getCounter,
  setShowModalUpdate,
  getNews,
}) => {
  const image = 3;

  function time() {
    const day = DateTime.fromMillis(DateTime.now() - createdAt * 1000);
    if (day <= 86400000) {
      return (
        "Сегодня в " + DateTime.fromMillis(createdAt * 1000).toFormat("HH:mm ")
      );
    } else if (day < 172800000) {
      return (
        "Вчера в " + DateTime.fromMillis(createdAt * 1000).toFormat("HH:mm ")
      );
    } else {
      return DateTime.fromMillis(createdAt * 1000).toFormat(
        "dd' 'LLL' в 'HH':'mm",
      );
    }
  }

  function deleteNews() {
    axios
      .delete(`http://localhost:3000/news/${id}`, {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "Delete",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "Delete",
        },
      })
      .then(() => getCounter());
  }

  return (
    <div
      className={
        "my-5 w-300 h-auto border border-2 rounded-lg bg-white flex flex-col "
      }
    >
      <div className={"border-b-2 p-4 flex flex-row items-center z-0"}>
        <img
          src={
            "https://i.pinimg.com/736x/4a/3e/0d/4a3e0d42d6624ae55ab94fa69eaa542a.jpg"
          }
          className="h-12 w-12 rounded-3xl select-none"
        />
        <div className={"flex flex-row justify-between items-center w-full"}>
          <div className={"font-medium text-xl ml-2 flex flex-col text-sans"}>
            {grup}
            <div className={"text-xs text-gray-700 text-sans "}> {time()}</div>
          </div>
          {userData.roles.find((item) => item === "Editor") ? (
            <div className={"flex flex-row items-center gap-2"}>
              <FaPencilAlt
                size={20}
                className={"hover:opacity-100 opacity-50 duration-500 cursor-pointer"}
                onClick={() => {
                  setShowModalUpdate(true);
                  getNews({
                    id,
                    grup,
                    createdAt,
                    content,
                    header,
                  });
                }}
              />

              <TiDelete
                size={30}
                className={"hover:opacity-100 opacity-50 duration-500 cursor-pointer"}
                onClick={() => deleteNews()}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className={"text-sans font-medium px-4"}>
        <div className={"mt-4 prose max-w-full text-sans prose-lg w-full"}>
          <h1 className={"text-start w-full leading-tight"}>{header}</h1>
          <div className={"whitespace-pre-line not-prose max-w-full"}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {JSON.parse(content)}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div className={"px-4 m-auto h-auto w-full py-8"}>
        {image > 6 ? (
          <img
            className={"w-full h-[600px]  rounded-2xl pointer-events-none"}
            src={
              "https://i.pinimg.com/736x/2a/16/34/2a16347f21bf569a23094e074fff0f6b.jpg"
            }
          />
        ) : (
          <Slide />
        )}
      </div>
    </div>
  );
};
