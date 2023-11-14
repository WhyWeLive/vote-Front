import { VoteForm } from "./VoteForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { userInterface } from "./Header";

export const Vote = ({ userData }: { userData: userInterface }) => {
  const [voteData, setVoteData] = useState<any>([]);
  const [counter, setCounter] = useState(0);

  function getCounter() {
    setCounter((prev) => prev + 1);
  }

  useEffect(() => {
    if (userData.roles.find((item) => item === "Editor")) {
      axios
        .get(
          `/vote`,
          {
            headers: {
              Accept: "application/json",
              "Access-Control-Allow-Origin": "GET",
              "X-Requested-With": "XMLHttpRequest",
              "Access-Control-Allow-Methods": "GET",
            },
          }
        )
        .then((response) => {
          setVoteData(response.data.reverse());
        });
    } else {
      axios
        .get(
          `/vote/getAllByGrup/${userData.grup}`,
          {
            headers: {
              Accept: "application/json",
              "Access-Control-Allow-Origin": "GET",
              "X-Requested-With": "XMLHttpRequest",
              "Access-Control-Allow-Methods": "GET",
            },
          }
        )
        .then((response) => {
          setVoteData(response.data.reverse());
        });
    }
  }, [counter]);

  return (
    <div className="w-screen min-h-full bg-gray-200 flex flex-col items-center">
      <div>
        {voteData.length < 1 ? (
          <div className={"flex justify-center items-center flex-col my-4"}>
            <div className={"font-light text-xl"}>Голосований еще нет...</div>
          </div>
        ) : (
          voteData.map((item: any) => (
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
              extended={item.extended}
            />
          ))
        )}
      </div>
    </div>
  );
};
