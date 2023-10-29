import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

export const Likes = ({ likes, dislikes, id, userData }) => {
  const [statistics, setStatistics] = useState(likes - dislikes);
  const [marked, setMarked] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/news/marked/${id}/${userData.id}`)
      .then(({ data }) => setMarked(data));
  }, [statistics]);

  function toLike() {
    axios
      .get(`http://localhost:3000/news/toLike/${id}/${userData.id}`)
      .then(({ data }) => {
        if (data) {
          axios
            .get(`http://localhost:3000/news/statistics/${id}`)
            .then(({ data }) => setStatistics(data));
        }
      });
  }

  function toDislike() {
    axios
      .get(`http://localhost:3000/news/toDislike/${id}/${userData.id}`)
      .then(({ data }) => {
        if (data) {
          axios
            .get(`http://localhost:3000/news/statistics/${id}`)
            .then(({ data }) => setStatistics(data));
        }
      });
  }

  return (
    <div className="flex flex-row w-full px-4 bg-gray gap-2 items-center mb-4">
      <AiOutlineLike
        size={30}
        className={
          `text-green-500 border rounded-lg p-1 hover:bg-gray-200 duration-500 ` +
          (marked == "liked" ? "bg-gray-200" : "")
        }
        title="Поставить лайк"
        onClick={() => toLike()}
      />
      <h1
        className={
          `font-semibold text-lg border rounded-lg w-[30px] text-center ` +
          (statistics > 0
            ? "text-green-500"
            : statistics == 0
            ? "text-black"
            : "text-red-500")
        }
      >
        {statistics < 0 ? statistics * -1 : statistics}
      </h1>
      <AiOutlineDislike
        size={30}
        className={
          `text-red-500 border rounded-lg p-1 hover:bg-gray-200 duration-500 ` +
          (marked == "disliked" ? "bg-gray-200" : "")
        }
        title="Поставить дизлайк"
        onClick={() => toDislike()}
      />
    </div>
  );
};
