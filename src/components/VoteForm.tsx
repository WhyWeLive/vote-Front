import React, { useState } from "react";
import { DateTime } from "luxon";
import { Checkbox } from "./UI/Checkbox";

export const VoteForm = ({
  header,
  voteCount,
  createdAt,
  endedAt,
  elected,
}) => {
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  return (
    <div
      className={
        "my-5 w-[700px] h-max border border-2 rounded-lg bg-white flex flex-col  p-6"
      }
    >
      {successfulModal ? (
        <div
          className={
            "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10 "
          }
        >
          <div
            className={
              "bg-white rounded-xl w-max h-max flex flex-col items-center justify-center p-8"
            }
          >
            <div
              className={
                "flex items-center justify-center flex-col w-auto h-full gap-8"
              }
            >
              <div className={"flex flex-col items-center gap-2 w-auto h-auto"}>
                <img
                  src={
                    "https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
                  }
                  className={"w-24 h-24"}
                />
                <div className={"font-semibold text-[#2196f3] text-xl"}>
                  Успешно!
                </div>
                <div className={"font-base text-lg opacity-50"}>
                  Вы успешно проголосовали.
                </div>
              </div>
              <button
                className={
                  "bg-black/80 rounded-xl w-full h-10 text-white font-semibold hover:bg-[#2196f3] duration-500"
                }
                onClick={() => setSuccessfulModal(false)}
              >
                Ок
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {errorModal ? (
        <div
          className={
            "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10 "
          }
        >
          <div
            className={
              "bg-white rounded-xl w-max h-max flex flex-col items-center justify-center p-8"
            }
          >
            <div
              className={
                "flex items-center justify-center flex-col w-auto h-full gap-8"
              }
            >
              <div className={"flex flex-col items-center gap-2 w-auto h-auto"}>
                <img
                  src={"https://cdn-icons-png.flaticon.com/512/463/463612.png"}
                  className={"w-24 h-24"}
                />
                <div className={"font-semibold text-[#e04f5f] text-xl"}>
                  Ошибка!
                </div>
                <div className={"font-base text-lg opacity-50"}>
                  Что-то пошло не так, попробуйте еще раз.
                </div>
              </div>
              <button
                className={
                  "bg-black/80 rounded-xl w-full h-10 text-white font-semibold hover:bg-[#e04f5f] duration-500"
                }
                onClick={() => setErrorModal(false)}
              >
                Ок
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={"flex flex-row justify-between items-center"}>
        <div className={"flex flex-col"}>
          <div className={"text-2xl font-semibold "}> {header}</div>
          <div className={"font-light opacity-30"}>
            Голосование » {voteCount} голосов
          </div>
        </div>
        <div className={"font-light opacity-50"}>
          {DateTime.fromMillis(createdAt * 1000).toFormat("dd.MM.yy")} -{" "}
          {endedAt}
        </div>
      </div>

      <hr className={"my-2"} />
      <div className={"flex flex-col"}></div>
      {elected.map((item) => (
        <div className={"flex flex-row my-4 justify-between items-center"}>
          <div className={"flex flex-row gap-4 items-center"}>
            <img
              className={"w-28 h-28 rounded-full"}
              src={`http://localhost:3000/files/getProfilePicture/${item.photo}`}
            ></img>
            <div className={"text-2xl font-semi"}>{item.name}</div>
          </div>
          <input
            type="radio"
            name={`${item}`}
            className="rounded-lg w-16 h-16 duration-500"
          />
        </div>
      ))}
      <hr className={"py-2"} />

      <div className={"flex flex-col items-center"}>
        <button
          className={
            "rounded-lg bg-black/80 border-transparent p-2 w-64 text-base font-medium text-white font-sans hover:bg-blue-600 duration-500"
          }
          onClick={() => {
            /// obrabotka
            setSuccessfulModal(true);
          }}
        >
          Проголосовать
        </button>
      </div>
    </div>
  );
};
