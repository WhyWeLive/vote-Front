import axios from "axios";
import { useEffect, useState } from "react";
import { NewForm } from "./NewForm";

export const News = ({ userData, setShowModalUpdate, getNew }) => {
  const [news, setNews] = useState([]);
  const [counter, setCounter] = useState(0);

  function getNews(newsboddy) {
    getNew(newsboddy);
  }

  function getCounter() {
    setCounter((prev) => prev + 1);
  }
  useEffect(() => {
    axios
      .get("http://localhost:3000/news", {
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
        "w-screen min-h-[93.2vh] max-h-max bg-gray-200 flex items-start flex-col z-10"
      }
    >
      <div className="w-screen min-h-full max-h-max bg-gray-200 flex items-center flex-col">
        {!news.length > 0 ? (
          <div className={"flex justify-center items-center flex-col my-4"}>
            <div className={"font-light text-xl"}>Новостей еще нет... </div>
          </div>
        ) : (
          news.map((item) => (
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
              userData={userData}
            />
          ))
        )}
      </div>
    </div>
  );
};
