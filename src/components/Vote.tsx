import { VoteForm } from "./VoteForm";
import { useState } from "react";

export const Vote = () => {
  const [voteData, setVoteData] = useState([
    {
      header: "test",
      voteCount: "51",
      endedAt: "20.10.23",
      createdAt: 1697463723,
      elected: [
        {
          photo: "793e0fecc2076abe744b57ee47f6b6f58962.jpg",
          name: "Smirnov Vladislav Andreevich",
        },
        {
          photo: "793e0fecc2076abe744b57ee47f6b6f58962.jpg",
          name: "Smirnov Vladislav Andreevich",
        },
      ],
    },
  ]);

  return (
    <div className="w-screen min-h-[92.5vh] max-h-max bg-gray-200 flex flex-col items-center">
      <div>
        {voteData.map((item) => (
          <VoteForm
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
