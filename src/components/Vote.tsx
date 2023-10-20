import { VoteForm } from "./VoteForm";
import { useEffect, useState } from "react";
import axios from "axios";

export const Vote = ({ userData }) => {
  const [voteData, setVoteData] = useState([]);
  const [counter, setCounter] = useState(0);

  function getCounter() {
    setCounter((prev) => prev + 1);
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/vote", {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "GET",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Methods": "GET",
        },
      })
      .then((response) => {
        setVoteData(response.data.reverse());
      });
  }, [counter]);
  return (
    <div className="w-screen min-h-[92.5vh] max-h-max bg-gray-200 flex flex-col items-center">
      <div>
        {voteData.length < 1 ? (
          <div className={"flex justify-center items-center flex-col my-4"}>
            <div className={"font-light text-xl"}>Голосований еще нет.. </div>
          </div>
        ) : (
          voteData.map((item) => (
            <VoteForm
              key={item.id}
              id={item.id}
              header={item.header}
              voteCount={item.voteCount}
              createdAt={item.createdAt}
              endedAt={item.endedAt}
              elected={item.elected}
              getCounter={getCounter}
              userData={userData}
              grup={item.grup}
              userData={userData}
              personid={item.votedPersonsId}
            />
          ))
        )}
      </div>
    </div>
  );
};
