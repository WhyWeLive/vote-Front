import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { InfoModals } from "./InfoModals";

export const ModalCreateNews = ({ isVisable, setShowModal }) => {
  const [news, setNews] = useState({
    grup: "",
    header: "",
    content: "",
    photos: [],
  });
  const [error, setError] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  const [urlFile, setUrlFile] = useState("");

  function preview(event) {
    setSelectedFile(event.target.files[0]);
    setUrlFile(URL.createObjectURL(event.target.files[0]));
  }

  function createNews() {
    axios.post(
      "http://localhost:3000/news",
      {
        image: selectedFile,
        grup: news.grup,
        header: news.header,
        content: news.content,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data`,
        },
      },
    );
  }

  if (!isVisable) return null;
  const handleClose = (e) => {
    if (e.target.id === "exit") {
      setShowModal(false);
    }
  };

  return (
    <div
      className={
        "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10"
      }
      id="exit1"
      onClick={handleClose}
    >
      <div className={"w-1/2 h-1/8 inset-0 flex justify-center"}>
        <div
          className={
            "shadow w-full h-auto max-h-[900px] my-8 flex flex-col gap-4 p-4 bg-white rounded-lg"
          }
        >
          <div className={"flex items-center justify-between"}>
            <div className={"text-xl font-semibold opacity-70"}>
              Создание новости
            </div>
            <div>
              <TiDelete
                size={30}
                className={
                  "hover:opacity-100 opacity-50 duration-500 cursor-pointer"
                }
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
          <div className={"flex flex-row justify-between"}>
            <div
              className={
                "flex border border-black/20 rounded-lg w-1/4 h-12 focus-within:border-blue-600 duration-500"
              }
            >
              <textarea
                className={
                  "w-full h-auto p-2 text-xl resize-none rounded-lg outline-none"
                }
                placeholder={"Группа"}
                maxLength={4}
                onChange={(e) => setNews({ ...news, grup: e.target.value })}
              />
            </div>
          </div>

          <div
            className={
              "flex border border-black/20 rounded-lg w-full h-12 focus-within:border-blue-600 duration-500"
            }
          >
            <textarea
              className={
                "h-full w-full p-2 text-xl resize-none rounded-lg outline-none"
              }
              placeholder={"Заголовок"}
              maxLength={255}
              onChange={(e) => setNews({ ...news, header: e.target.value })}
            />
          </div>

          <div
            className={
              "flex border border-black/20 rounded-lg w-auto h-[400px] focus-within:border-blue-600 duration-500"
            }
          >
            <textarea
              className={
                "w-full h-full p-2 text-xl resize-none rounded-lg outline-none"
              }
              placeholder={"Содержание новости"}
              maxLength={2000}
              onChange={(e) => {
                setNews({
                  ...news,
                  content: e.target.value ? JSON.stringify(e.target.value) : "",
                });
              }}
            />
          </div>

          {urlFile ? (
            <div>
              <img
                src={urlFile}
                className={"w-32 h-32 rounded-xl object-cover"}
              />
            </div>
          ) : (
            ""
          )}

          <div className={"flex justify-between items-center flex-row"}>
            <div className={"w-1/8"}></div>
            <div
              className={
                "w-1/8 relative bg-black/80 text-white rounded-lg  duration-500 w-1/2 "
              }
            >
              <input
                title={"Добавить фотографию"}
                type={"file"}
                multiple={false}
                onChange={(event) => preview(event)}
                className={
                  "w-full h-full absolute duration-500 cursor-pointer rounded-lg hover:bg-green-500 opacity-20"
                }
              />

              <div
                className={
                  "w-full flex flex-row p-2 items-center justify-center text-center gap-2 font-semibold"
                }
              >
                <img
                  src={
                    "https://img.icons8.com/?size=128&id=SBxQxlO1ePen&format=png&color=FFFFFF"
                  }
                  className={"w-6 h-6  "}
                />
                Загрузить фото
              </div>
            </div>
            <div className={"w-full text-center"}>
              {error ? (
                <InfoModals
                  status={error}
                  setErrorModal={setError}
                  inputerror={error}
                />
              ) : (
                ""
              )}
            </div>
            <button
              onClick={() => {
                if (news.grup && news.header && news.content) {
                  createNews();
                  window.location = "/";
                } else {
                  setError(true);
                }
              }}
              className={
                "w-1/2 py-2 rounded-lg bg-black/80 border-transparent text-base font-medium text-white font-sans hover:bg-blue-600 duration-500 text-center cursor-pointer"
              }
            >
              Подтвердить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
