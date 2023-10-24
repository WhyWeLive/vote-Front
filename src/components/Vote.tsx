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
    <div className="w-screen min-h-full bg-gray-200 flex flex-col items-center">
      <div>
        {voteData.length < 0 ? (
          <div className={"flex justify-center items-center flex-col my-4"}>
            <div className={"font-light text-xl"}>Голосований еще нет.. </div>
          </div>
        ) : (
          voteData.map((item) =>
            item.grup == userData.grup || item.grup == "NKE" ? (
              <VoteForm
                key={item.id}
                id={item.id}
                votedPersonsId={item.votedPersonsId}
                header={item.header}
                voteCount={item.voteCount}
                createdAt={item.createdAt}
                endedAt={item.endedAt}
                elected={item.elected}
                getCounter={getCounter}
                counter={counter}
                userData={userData}
                grup={item.grup}
              />
            ) : (
              ""
            ),
          )
        )}
      </div>
    </div>
  );
};
