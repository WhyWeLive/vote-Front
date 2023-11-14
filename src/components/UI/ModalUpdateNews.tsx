import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { InfoModals } from "./InfoModals";
import photoupload from "../UI/Images/photoupload.png";

export const ModalUpdateNews = ({
  isVisable,
  setShowModalUpdate,
  newsData,
}: {
  isVisable: boolean;
  setShowModalUpdate: (arg0: boolean) => void;
  newsData: {
    photos: any;
    id: number;
    content: string;
    grup: string;
    header: string;
  };
}) => {
  const [news, setNews] = useState({
    grup: "",
    header: "",
    content: "",
  });
  const [error, setError] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [selectedFile, setSelectedFile] = useState();
  const [urlFile, setUrlFile] = useState("");

  useEffect(() => {
    setNews({ ...newsData });
  }, [newsData]);

  function deleteImage() {
    axios.get(`/news/deleteImage/${newsData.id}`);
    setShowImage(false);
  }

  function preview(event: any) {
    setSelectedFile(event.target.files[0]);
    setUrlFile(URL.createObjectURL(event.target.files[0]));
  }

  function updateNews() {
    axios
      .put(
        `/news/${newsData.id}`,
        {
          image: selectedFile ?? newsData.photos,
          grup: news.grup,
          header: news.header,
          content: news.content,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": `multipart/form-data`,
          },
        }
      )
      .then(() => (window.location.href = "/"));
  }

  if (!isVisable) return null;
  const handleClose = (e: any) => {
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
      onDoubleClick={handleClose}
    >
      <div className={"w-screen 2xl:w-1/2 h-1/8 inset-0 flex justify-center"}>
        <div
          className={
            "shadow w-full 2xl:h-auto sm:h-[400px] sm:max-h-[900px] my-8 flex flex-col gap-4 p-4 bg-white rounded-lg xl:overflow-none overflow-y-auto"
          }
        >
          <div className={"flex items-center justify-between"}>
            <div className={"text-xl font-semibold opacity-70"}>
              Редактирование новости
            </div>
            <div>
              <TiDelete
                size={30}
                className={
                  "hover:opacity-100 opacity-50 duration-500 cursor-pointer"
                }
                onClick={() => setShowModalUpdate(false)}
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
                value={news.grup}
                onChange={(e) => setNews({ ...news, grup: e.target.value })}
              />
            </div>
          </div>

          <div
            className={
              "flex border border-black/20 rounded-lg w-full outline-1 h-12 focus-within:border-blue-600 duration-500"
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
              "flex border border-black/20 rounded-lg w-auto h-[400px] focus-within:border-blue-600 duration-500"
            }
          >
            <textarea
              className={
                "w-full h-full p-2 text-xl resize-none rounded-lg outline-none"
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

          {urlFile ? (
            <img
              src={urlFile}
              className={
                "w-32 h-32 rounded-xl object-cover pointer-events-none"
              }
            />
          ) : newsData.photos.length ? (
            <div className={"flex gap-8 flex-col"}>
              {showImage ? (
                <div className={"w-full flex justify-start"}>
                  <div
                    className={
                      "flex flex-row items-center justify-center relative"
                    }
                  >
                    <img
                      src={`https://vote-api.whywelive.me/files/getNewsPicture/${newsData.photos}`}
                      className={"w-32 h-32 rounded-xl object-cover"}
                    />
                    <button
                      data-size={50}
                      className={
                        "absolute bg-black/90 w-10 h-10 rounded-full opacity-50 hover:opacity-100 duration-500 text-white"
                      }
                      onClick={() => deleteImage()}
                    >
                      X
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          <div
            className={
              "flex justify-between items-center flex-row gap-8 sm:gap-0"
            }
          >
            <div
              className={
                "w-1/8 relative bg-black/80 text-white rounded-lg  duration-500"
              }
            >
              <input
                title={"Обновить фотографию"}
                type={"file"}
                multiple={false}
                onChange={(event) => preview(event)}
                className={
                  "w-full h-full absolute duration-500 cursor-pointer rounded-lg hover:bg-green-500 opacity-20"
                }
              />

              <div
                className={
                  "w-max sm:w-full flex flex-row p-2 items-center justify-center text-center gap-2 font-semibold"
                }
              >
                <img src={`${photoupload}`} className={"w-6 h-6"} />
                Загрузить фото
              </div>
            </div>
            {error ? (
              <InfoModals
                setErrorModal={setError}
                inputerror={error}
                autherror={false}
                dateError={false}
              />
            ) : (
              ""
            )}
            <button
              onClick={() => {
                if (news.grup && news.header && news.content) {
                  updateNews();
                } else {
                  setError(true);
                }
              }}
              className={
                "w-[191px] sm:w-1/8 py-2 rounded-lg bg-black/80 border-transparent text-base font-medium text-white font-sans hover:bg-blue-600 duration-500 text-center cursor-pointer"
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
