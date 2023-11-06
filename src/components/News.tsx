import axios from "axios";
import { useEffect, useState } from "react";
import { NewForm } from "./NewForm";
import { userInterface } from "./Header";

export const News = ({
  userData,
  setShowModalUpdate,
  getNew,
}: {
  userData: userInterface;
  setShowModalUpdate: (arg0: boolean) => void;
  getNew: (arg0: object) => void;
}) => {
  const [news, setNews] = useState<any>([]);
  const [counter, setCounter] = useState(0);

  function getNews(newsboddy: object) {
    getNew(newsboddy);
  }

  function getCounter() {
    setCounter((prev) => prev + 1);
  }
  useEffect(() => {
    axios
      .get(`http://${import.meta.env.VITE_HOST}:3000/news`, {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "GET",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET",
        },
      })
      .then((response) => {
        setNews(response.data.reverse());
      });
  }, [counter]);

  return (
    <div
      className={
        "w-screen min-h-screen bg-gray-200 flex items-start flex-col z-10"
      }
    >
      <div className="w-screen min-h-full max-h-max bg-gray-200 flex items-center flex-col">
        {!news.length ? (
          <div className={"flex justify-center items-center flex-col my-4"}>
            <div className={"font-light text-xl"}>Новостей еще нет... </div>
          </div>
        ) : (
          news.map((item: any) => (
            <NewForm
              grup={item.grup}
              createdAt={item.createdAt}
              header={item.header}
              content={item.content}
              key={item.id}
              id={item.id}
              image={item.photos}
              userData={userData}
              getCounter={getCounter}
              setShowModalUpdate={setShowModalUpdate}
              getNews={getNews}
              likes={item.likes}
              dislikes={item.dislikes}
            />
          ))
        )}
      </div>
    </div>
  );
};
