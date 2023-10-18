import { VoteForm } from "./VoteForm";
import { useEffect, useState } from "react";
import axios from "axios";

export const Vote = () => {
  const [voteData, setVoteData] = useState([]);

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
  });
  return (
    <div className="w-screen min-h-[92.5vh] max-h-max bg-gray-200 flex flex-col items-center">
      <div>
        {voteData.map((item) => (
          <VoteForm
            key={item.id}
            id={item.id}
            header={item.header}
            voteCount={item.voteCount}
            createdAt={item.createdAt}
            endedAt={item.endedAt}
            elected={item.elected}
          />
        ))}
      </div>
    </div>
  );
};
