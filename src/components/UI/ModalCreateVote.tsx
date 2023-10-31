import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { DateTime } from "luxon";
import { InfoModals } from "./InfoModals";

export const ModalCreateVote = ({ isVisable, setShowModalVote }) => {
  const [count, setCount] = useState(["Участник"]);
  const [errorModal, setErrorModal] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [VoteData, setVoteData] = useState({
    header: "",
    grup: "",
    elected: [""],
    endedAt: "",
  });

  if (!isVisable) return null;
  const handleClose = (e) => {
    if (e.target.id === "exit") {
      setShowModalVote(false);
    }
  };

  function getInputs() {
    const inputValues = [];

    inputValues.push(
      ...count.map(
        (item, index) => document.getElementById(index.toString()).value
      )
    );

    if (inputValues.includes("")) {
      inputValues.splice(0, -1);
      setErrorModal(true);
      setInputError(true);
      setDateError(false);
    } else {
      window.location = "/vote";

      axios.post(
        `http://${import.meta.env.VITE_HOST}:3000/vote`,
        {
          header: VoteData.header,
          grup: VoteData.grup,
          elected: inputValues,
          endedAt: VoteData.endedAt,
        },
        {}
      );
    }
  }
  return (
    <div
      className={
        "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10"
      }
      id="exit1"
      onClick={handleClose}
    >
      <div
        className={"w-1/2 min-h-1/2 max-h-auto  inset-0 flex justify-center"}
      >
        <div
          className={
            "shadow w-full h-auto flex p-4 flex-col bg-white rounded-lg"
          }
        >
          <div
            className={
              "w-full h-auto flex flex-col gap-4 p-2 bg-white rounded-lg "
            }
          >
            <div className={"flex justify-between items-center"}>
              <div className={"text-xl font-semibold opacity-70"}>
                Создание голосования
              </div>
              <div>
                <TiDelete
                  size={30}
                  className={
                    "hover:opacity-100 opacity-50 duration-500 cursor-pointer"
                  }
                  onClick={() => setShowModalVote(false)}
                />
              </div>
            </div>

            <div className={"flex flex-row justify-between"}>
              <div className={"flex flex-row items-center w-full gap-4"}>
                <div
                  className={
                    "flex border border-black/20 rounded-lg w-1/4 h-12 outline-1 focus-within:border-blue-600 duration-500"
                  }
                >
                  <textarea
                    className={
                      "w-full h-auto p-2 text-xl resize-none rounded-lg outline-none"
                    }
                    placeholder={"Группа"}
                    maxLength={4}
                    onChange={(e) =>
                      setVoteData({ ...VoteData, grup: e.target.value })
                    }
                  />
                </div>
                <div
                  className={
                    "w-1/4 h-full border border-black/20 rounded-lg flex items-center p-2 focus-within:border-blue-600 duration-500"
                  }
                >
                  <input
                    type={"date"}
                    className={"w-full h-full text-xl outline-none"}
                    title={"Дата окончания"}
                    onChange={async (e) => {
                      const time = new Date(e.target.value).getTime() / 1000;
                      setVoteData({ ...VoteData, endedAt: time.toString() });
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className={
                "flex border border-black/20 rounded-lg w-full h-12 focus-within:border-blue-600 duration-500"
              }
            >
              <textarea
                className={
                  "h-full w-full p-2 text-xl resize-none rounded-lg outline-none"
                }
                placeholder={"Заголовок"}
                maxLength={255}
                onChange={(e) =>
                  setVoteData({ ...VoteData, header: e.target.value })
                }
              />
            </div>
            <div
              className={"h-auto max-h-64  gap-4 flex flex-col overflow-y-auto"}
            >
              {count.map((item, index) => (
                <div
                  key={index}
                  className={
                    "flex border border-black/20 rounded-lg w-full h-min focus-within:border-blue-600 duration-500"
                  }
                >
                  <div
                    className={
                      "flex flex-between w-full p-2 items-center h-auto py-2.5 gap-2"
                    }
                  >
                    <input
                      className={
                        "w-full text-xl resize-none rounded-lg focus:outline-none"
                      }
                      id={index.toString()}
                      placeholder={"Ответ / Почта кандидата"}
                    />

                    {!index ? (
                      <img
                        src={
                          "https://cdn-icons-png.flaticon.com/512/992/992651.png"
                        }
                        className={
                          "w-6 cursor-pointer opacity-30 hover:opacity-100 duration-500"
                        }
                        onClick={() => setCount([...count, "Участник"])}
                        title={"Добавить"}
                      />
                    ) : (
                      ""
                    )}

                    {index ? (
                      <img
                        src={
                          "https://cdn-icons-png.flaticon.com/512/1828/1828945.png"
                        }
                        className={
                          "w-6 cursor-pointer opacity-30 hover:opacity-100 duration-500"
                        }
                        title={"Удалить"}
                        onClick={() => setCount(count.slice(0, -1))}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              className={
                "w-full py-2 rounded-lg bg-black/80 border-transparent text-base font-medium text-white font-sans hover:bg-blue-600" +
                " duration-500 text-center cursor-pointer"
              }
              onClick={() => {
                if (VoteData.endedAt < DateTime.now() / 1000) {
                  setDateError(true);
                  setErrorModal(true);
                  setInputError(false);
                  return;
                }
                if (
                  VoteData.endedAt &&
                  VoteData.header &&
                  VoteData.grup &&
                  count.length > 1
                ) {
                  getInputs();
                } else {
                  setErrorModal(true);
                  setDateError(false);
                  setInputError(true);
                  return;
                }
              }}
            >
              Подтвердить
            </button>
          </div>

          {errorModal ? (
            <InfoModals
              status={errorModal}
              dateError={dateError}
              setErrorModal={setErrorModal}
              inputerror={inputError}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
