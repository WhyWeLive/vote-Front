import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { TiDelete } from "react-icons/ti";
import { InfoModals } from "./InfoModals";
import add from "../UI/Images/add.png";
import remove from "../UI/Images/remove.png";

export const ModalUpdateVote = ({
  isVisable,
  id,
  setModalUpdateVote,
  header,
  endedAt,
  elected,
  grup,
}) => {
  const [count, setCount] = useState([]);
  const [errorModal, setErrorModal] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [VoteData, setVoteData] = useState({
    header: "",
    grup: "",
    elected: [""],
    endedAt: "",
    electCount: [""],
  });

  useEffect(() => {
    setCount([...count, ...elected]);
    setVoteData({
      ...VoteData,
      header: header,
      elected: [...VoteData.elected, ...elected],
      endedAt: endedAt,
      grup: grup,
    });
  }, [1]);

  if (!isVisable) return null;
  const handleClose = (e) => {
    if (e.target.id === "exit") {
      setModalUpdateVote(false);
    }
  };

  const inputValues = [];

  function update() {
    inputValues.push(
      ...count.map((item, index) => {
        return document.getElementById(index.toString()).value;
      }),
    );

    if (inputValues.includes("")) {
      inputValues.splice(0, -1);
      setErrorModal(true);
      setInputError(true);
    } else {
      window.location = "/vote";

      axios.put(
        `http://localhost:3000/vote/${id}`,
        {
          header: VoteData.header,
          grup: VoteData.grup,
          elected: inputValues,
          endedAt: VoteData.endedAt,
        },
        {},
      );
    }
  }
  return (
    <div
      className={
        "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10"
      }
      id="exit"
      onDoubleClick={handleClose}
    >
      <div
        className={"w-full sm:w-1/2 min-h-1/2 max-h-auto flex justify-center"}
      >
        <div
          className={
            "shadow w-full h-1/2 sm:h-auto flex p-4 flex-col bg-white rounded-lg"
          }
        >
          <div
            className={
              "w-full h-auto flex flex-col gap-4 p-2 bg-white rounded-lg "
            }
          >
            <div className={"flex justify-between items-center"}>
              <div className={"text-xl font-semibold opacity-70"}>
                Редактирование голосования
              </div>
              <div>
                <TiDelete
                  size={30}
                  className={
                    "hover:opacity-100 opacity-50 duration-500 cursor-pointer"
                  }
                  onClick={() => setModalUpdateVote(false)}
                />
              </div>
            </div>
            <div className={"flex flex-row justify-between"}>
              <div className={"flex flex-row items-center w-full gap-4"}>
                <div
                  className={
                    "flex border-black/20 border rounded-lg w-1/2 h-12 focus-within:border-blue-600 duration-500"
                  }
                >
                  <textarea
                    className={
                      "w-full h-auto p-2 text-xl resize-none rounded-lg outline-none"
                    }
                    placeholder={"Группа"}
                    value={VoteData.grup}
                    maxLength={4}
                    onChange={(e) =>
                      setVoteData({ ...VoteData, grup: e.target.value })
                    }
                  />
                </div>
                <div
                  className={
                    "w-1/2 h-full border-black/20 border focus-within:border-blue-600 duration-500 rounded-lg flex items-center p-2"
                  }
                >
                  <input
                    type={"date"}
                    className={"w-full h-full text-xl outline-none"}
                    title={"Дата окончания"}
                    value={DateTime.fromMillis(
                      VoteData.endedAt * 1000,
                    ).toFormat("yyyy-MM-dd")}
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
                "flex border-black/20 border rounded-lg w-full h-12 focus-within:border-blue-600 duration-500"
              }
            >
              <textarea
                className={
                  "h-full w-full p-2 text-xl resize-none rounded-lg outline-none"
                }
                placeholder={"Заголовок"}
                maxLength={255}
                value={VoteData.header}
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
                      defaultValue={item}
                    />

                    {!index ? (
                      <img
                        src={`${add}`}
                        className={
                          "w-6 cursor-pointer opacity-30 hover:opacity-100 duration-500"
                        }
                        onClick={() => setCount([...count, ""])}
                        title={"Добавить"}
                      />
                    ) : (
                      ""
                    )}

                    {index ? (
                      <img
                        src={`${remove}`}
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
                "w-full py-2 rounded-lg bg-black/80 border-transparent text-base font-medium text-white font-sans hover:bg-blue-600 duration-500 text-center cursor-pointer"
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
                  update();
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
              dateError={dateError}
              inputerror={inputError}
              setErrorModal={setErrorModal}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
