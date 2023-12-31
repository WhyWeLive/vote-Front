import ReactMarkdown from "react-markdown";
import { TiDelete } from "react-icons/ti";
import remarkGfm from "remark-gfm";
import { FaPencilAlt } from "react-icons/fa";
import axios from "axios";
import * as luxon from "luxon";
import { DateTime } from "luxon";
import { useState } from "react";
import { Likes } from "./UI/Likes";
import { userInterface } from "./Header";

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
  likes,
  dislikes,
}: {
  grup: string | number;
  header: string;
  content: any;
  image: string[] | undefined;
  createdAt: number;
  userData: userInterface;
  id: number;
  getCounter: () => void;
  setShowModalUpdate: (arg0: boolean) => void;
  getNews: (arg0: object) => void;
  likes: number;
  dislikes: number;
}) => {
  function time() {
    const day = DateTime.fromMillis(+DateTime.now() - createdAt * 1000);
    const createdAtDay = +DateTime.fromMillis(createdAt * 1000).toFormat("dd");
    const currentDay = +DateTime.fromMillis(+DateTime.now()).toFormat("dd");

    if (+day <= 86400000 && createdAtDay == currentDay) {
      return (
        "Сегодня в " + DateTime.fromMillis(createdAt * 1000).toFormat("HH:mm ")
      );
    } else if (+day < 172800000) {
      return (
        "Вчера в " + DateTime.fromMillis(createdAt * 1000).toFormat("HH:mm ")
      );
    } else {
      return DateTime.fromMillis(createdAt * 1000).toFormat(
        "dd' 'LLL' в 'HH':'mm"
      );
    }
  }

  const [deleteModal, setdeleteModal] = useState(false);

  function deleteNews() {
    axios.delete(`/news/${id}`).then(() => getCounter());
  }

  return (
    <div
      className={
        " my-2 w-screen sm:w-[800px] h-auto border border-2 rounded-lg bg-white flex flex-col"
      }
    >
      {deleteModal ? (
        <div
          className={
            "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10 "
          }
        >
          <div
            className={
              "bg-white rounded-b-lg w-screen sm:w-max h-max flex flex-col items-center justify-center"
            }
          >
            <div className={"w-full h-1 bg-red-500"}></div>
            <div className={"p-4 w-full"}>
              <div className={"flex flex-col gap-4"}>
                <div className={"text-xl font-semibold"}>Удаление новости</div>
                <div className={"font text-xl"}>Хотите удалить новость?</div>
                <div className={"flex flex-row justify-between gap-4 w-full"}>
                  <button
                    className={
                      "w-[250px] p-2 bg-black/80 text-white rounded-lg hover:bg-red-500 duration-500"
                    }
                    onClick={() => deleteNews()}
                  >
                    Да, удалить
                  </button>
                  <button
                    className={
                      "w-[250px] p-2 bg-black/80 rounded-lg text-white hover:bg-blue-500 duration-500"
                    }
                    onClick={() => setdeleteModal(false)}
                  >
                    Нет,отменить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={"border-b p-4 flex flex-row items-center h-full w-full "}>
        <div>
          <div className=" w-12 h-12 rounded-full select-none flex items-center justify-center bg-gradient-to-br from-indigo-500 via-sky-500 via-30% to-emerald-500 text-white font-bold">
            {grup}
          </div>
        </div>
        <div className={"flex flex-row justify-between items-center w-full"}>
          <div className={"font-medium text-xl ml-2 flex flex-col text-sans"}>
            {grup}
            <div className={"text-xs text-gray-700 text-sans "}> {time()}</div>
          </div>
          {userData.roles &&
          userData.roles.find((item) => item === "Editor") ? (
            <div className={"flex flex-row items-center gap-2"}>
              <FaPencilAlt
                size={17}
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
                    photos: image,
                  });
                }}
              />

              <TiDelete
                size={25}
                className={
                  "hover:opacity-100 opacity-50 duration-500 cursor-pointer"
                }
                onClick={() => setdeleteModal(true)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={"text-sans font-medium px-4"}>
        <div className={"mt-4 prose max-w-full text-sans prose-lg w-full"}>
          <h1 className={"text-start w-full leading-tight text-2xl"}>
            {header}
          </h1>
          <div className={"whitespace-pre-line not-prose max-w-full"}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content && JSON.parse(content.toString())}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {typeof image != "undefined" && image.length > 0 ? (
        <div className={"p-4 flex justify-center flex-col items-center"}>
          <img
            className={
              "w-min object-cover h-max rounded-2xl pointer-events-none "
            }
            src={`https://vote-api.whywelive.me/files/getNewsPicture/${image}`}
          />
        </div>
      ) : (
        <div className={"py-4"}></div>
      )}
      <Likes likes={likes} dislikes={dislikes} id={id} userData={userData} />
    </div>
  );
};
