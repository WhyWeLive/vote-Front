import ReactMarkdown from "react-markdown";
import { TiDelete } from "react-icons/ti";
import remarkGfm from "remark-gfm";
import { FaPencilAlt } from "react-icons/fa";
import axios from "axios";
import * as luxon from "luxon";
import { DateTime } from "luxon";

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
    axios.delete(`http://localhost:3000/news/${id}`).then(() => getCounter());
  }

  return (
    <div
      className={
        " my-5 w-[800px] h-auto border border-2 rounded-lg bg-white flex flex-col"
      }
    >
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
          {userData.roles.find((item) => item === "Editor") ? (
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
          <h1 className={"text-start w-full leading-tight text-2xl"}>
            {header}
          </h1>
          <div className={"whitespace-pre-line not-prose max-w-full"}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {JSON.parse(content)}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {image.length ? (
        <div className={"p-4 flex justify-center flex-col items-center"}>
          <img
            className={
              "w-min object-cover h-max rounded-2xl pointer-events-none "
            }
            src={`http://localhost:3000/files/getNewsPicture/${image}`}
          />
        </div>
      ) : (
        <div className={"py-4"}></div>
      )}
    </div>
  );
};
