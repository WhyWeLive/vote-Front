import React, { useEffect, useState } from "react";
import axios from "axios";
import { TiDelete } from "react-icons/ti";

export const ModalUpdateNews = ({
  isVisable,
  setShowModalUpdate,
  newsData,
}) => {
  const [news, setNews] = useState({
    grup: "",
    header: "",
    content: "",
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    setNews({ ...newsData });
  }, [newsData]);

  function deleteImage() {
    axios.get(`http://localhost:3000/news/deleteImage/${newsData.id}`);
  }

  function updateNews() {
    axios
      .put(
        `http://localhost:3000/news/${newsData.id}`,
        {
          grup: news.grup,
          header: news.header,
          content: news.content,
        },
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "POST",
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Authorization",
          },
        }
      )
      .then(() => console.log(news))
      .catch(() => console.log("error"));
  }

  if (!isVisable) return null;
  const handleClose = (e) => {
    if (e.target.id === "exit") {
      setShowModalUpdate(false);
    }
  };

  return (
    <div
      className={
        "fixed inset-0 w-screen h-screen bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10"
      }
      id="exit"
      onClick={handleClose}
    >
      <div className={"w-1/2 h-full inset-0 flex justify-center"}>
        <div
          className={
            "shadow w-full h-auto my-8 flex flex-col gap-8 p-4 bg-white rounded-lg"
          }
        >
          <div className={"flex flex-row justify-between"}>
            <div
              className={
                "flex outline outline-black/80 rounded-lg w-1/4 h-12 outline-1 focus-within:outline-blue-600 duration-500"
              }
            >
              <textarea
                className={
                  "w-full h-auto p-2 text-xl resize-none rounded-lg focus:outline-none"
                }
                placeholder={"Группа"}
                maxLength={4}
                value={news.grup}
                onChange={(e) => setNews({ ...news, grup: e.target.value })}
              />
            </div>

            <div>
              <TiDelete
                size={30}
                className={"hover:opacity-100 opacity-50 duration-500"}
                onClick={() => setShowModalUpdate(false)}
              />
            </div>
          </div>

          <div
            className={
              "flex outline outline-black/80 rounded-lg w-full outline-1 h-12 focus-within:outline-blue-600 duration-500"
            }
          >
            <textarea
              className={
                "h-full w-full p-2 text-xl resize-none rounded-lg focus:outline-none"
              }
              placeholder={"Заголовок"}
              maxLength={255}
              value={news.header}
              onChange={(e) => setNews({ ...news, header: e.target.value })}
            />
          </div>

          <div
            className={
              "flex outline outline-black/80 rounded-lg w-auto h-[570px] outline-1 focus-within:outline-blue-600 duration-500"
            }
          >
            <textarea
              className={
                "w-full h-full p-2 text-xl resize-none rounded-lg focus:outline-none"
              }
              placeholder={"Содержание новости"}
              maxLength={2000}
              value={news.content ? JSON.parse(news.content) : news.content}
              onChange={(e) =>
                setNews({
                  ...news,
                  content: e.target.value ? JSON.stringify(e.target.value) : "",
                })
              }
            />
          </div>
          {newsData.photos.length ? (
            <div className="flex row justify-between">
              <input type="file" />
              <button onClick={() => deleteImage()}>Удалить фото</button>
            </div>
          ) : (
            <></>
          )}
          <div className={"flex justify-center items-center flex-col"}>
            <div
              onClick={() => {
                if (news.grup && news.header && news.content) {
                  updateNews();
                  window.location = "/";
                } else {
                  setError(true);
                }
              }}
              className={
                "w-1/4 p-2 rounded-lg bg-black/80 border-transparent text-base font-medium text-white font-sans hover:bg-blue-600 duration-500 text-center cursor-pointer"
              }
            >
              Подтвердить
            </div>

            {error ? (
              <div
                className={"text-lg font-medium font-sans text-red-600 my-2 "}
              >
                {" "}
                Заполните все поля!{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
