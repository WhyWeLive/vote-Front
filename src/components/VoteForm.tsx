import React from "react";

export const VoteForm = () => {
  return (
    <div
      className={
        "my-5 w-[700px] h-auto border border-2 rounded-lg bg-white flex flex-col  p-6"
      }
    >
      <div className={"flex flex-row justify-between items-center"}>
        <div className={"flex flex-col"}>
          <div className={"text-2xl font-semibold "}> Выборы старосты</div>
          <div className={"font-light opacity-30"}> Голосование</div>
        </div>
        <div className={"font-light opacity-50"}>14.10.23-15.10.23</div>
      </div>

      <hr className={"my-2"} />
      <div className={"flex flex-col"}>
        <div className={"flex flex-row my-4 justify-between items-center"}>
          <div className={"flex flex-row gap-4 items-center"}>
            <img
              className={"w-28 h-28 rounded-full"}
              src={
                "https://i.pinimg.com/736x/42/5c/4b/425c4bdfad9342a27b3575f1c42df35b.jpg"
              }
            ></img>
            <div className={"text-2xl font-semibold"}>
              Смирнов Владислав Андреевич
            </div>
          </div>
          <input type={"checkbox"} className={"w-8 h-8"} />
        </div>
      </div>

      <hr className={"py-2"} />

      <div className={"flex flex-col items-center"}>
        <button
          className={
            "rounded-lg bg-black/80 border-transparent p-2 w-64 text-base font-medium text-white font-sans hover:bg-blue-600 duration-500"
          }
        >
          Проголосовать
        </button>
        <div className={"text-sm font-light opacity-40 "}>5 Голосов</div>
      </div>
    </div>
  );
};
