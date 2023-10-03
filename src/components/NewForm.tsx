import React, {useEffect, useState} from "react";
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
  image,
  createdAt,
  userData,
  id,
  getCounter,
  setShowModalUpdate,
  getNews,
}) => {
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
        "my-5 w-[800px] h-auto border border-2 rounded-lg bg-white flex flex-col "
      }
    >
      <div className={"border-b-2 p-4 flex flex-row items-center z-0 h-full w-full"}>
        <div
          src={
            "https://i.pinimg.com/564x/ed/1f/41/ed1f41959e7e9aa7fb0a18b76c6c2755.jpg"
          }
          className="h-12 w-12 rounded-full select-none flex items-center justify-center bg-gradient-to-br from-indigo-500 via-sky-500 via-30% to-emerald-500 text-white font-bold"
        >
          {grup}
        </div>
        <div className={"flex flex-row justify-between items-center w-full"}>
          <div className={"font-medium text-xl ml-2 flex flex-col text-sans"}>
            {grup}
            <div className={"text-xs text-gray-700 text-sans "}> {time()}</div>
          </div>
          {userData.roles.find((item) => item === "Editor") ? (
            <div className={"flex flex-row items-center gap-2"}>
              <FaPencilAlt
                size={20}
                className={
                  "hover:opacity-100 opacity-50 duration-500 cursor-pointer"
                }
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
                className={
                  "hover:opacity-100 opacity-50 duration-500 cursor-pointer"
                }
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
          <h1 className={"text-start w-full leading-tight text-2xl"}>{header}</h1>
          <div className={"whitespace-pre-line not-prose max-w-full"}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {JSON.parse(content)}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      { image.length ?
        <div className={"px-4 m-auto h-auto w-full py-8"}>

          <img className={"w-full h-[600px]  rounded-2xl pointer-events-none"} src={`http://localhost:3000/files/${image}`}/>

        </div>
        : <div className={"py-4"}> </div>
      }
    </div>
  );
};
