import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import axios from "axios";

export const ModalCreateVote = ({ isVisable, setShowModalVote }) => {
  const [error, setError] = useState(false);
  const [count, setCount] = useState(["Участник"]);

  function createNews() {
    axios
      .post(
        "http://localhost:3000/news",
        {},
        {
          headers: {
            accept: "application/json",
            "Content-Type": `multipart/form-data`,
          },
        },
      )
      .then(() => console.log());
  }

  if (!isVisable) return null;
  const handleClose = (e) => {
    if (e.target.id === "exit") {
      setShowModalVote(false);
    }
  };

  return (
    <div
      className={
        "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10"
      }
      id="exit"
      onClick={handleClose}
    >
      <div className={"w-1/2 h-max  inset-0 flex justify-center"}>
        <div
          className={
            "shadow w-full h-auto my-8 flex flex-col gap-8 p-4 bg-white rounded-lg"
          }
        >
          <div className={"flex flex-row justify-between"}>
            <div
              className={
                "flex outline outline-black/80 rounded-lg w-1/4 h-12 outline-1 focus-within:outline-blue-600 duration-500"
              }
            >
              <textarea
                className={
                  "w-full h-auto p-2 text-xl resize-none rounded-lg focus:outline-none"
                }
                placeholder={"Группа"}
                maxLength={4}
              />
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

          <div
            className={
              "flex outline outline-black/80 rounded-lg w-full outline-1 h-12 focus-within:outline-blue-600 duration-500"
            }
          >
            <textarea
              className={
                "h-full w-full p-2 text-xl resize-none rounded-lg focus:outline-none"
              }
              placeholder={"Заголовок"}
              maxLength={255}
            />
          </div>
          <div
            className={
              "flex flex-col gap-8 overflow-y-auto h-64 p-4 shadow-inner"
            }
          >
            {count.map((item, index) => (
              <div
                className={
                  "flex outline outline-black/80 rounded-lg w-full h-min outline-1 focus-within:outline-blue-600 duration-500"
                }
              >
                <div
                  className={
                    "flex flex-between w-full p-2 items-center h-max gap-2"
                  }
                >
                  <input
                    className={
                      "w-full text-xl resize-none rounded-lg focus:outline-none"
                    }
                    placeholder={"Избираемый"}
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

          <div className={"flex items-center justify-center flex-row"}>
            <button
              onClick={() => {
                if (isVisable) {
                  createNews();
                  window.location = "/";
                } else {
                  setError(true);
                }
              }}
              className={
                "w-1/2 py-2 rounded-lg bg-black/80 border-transparent text-base font-medium text-white font-sans hover:bg-blue-600 duration-500 text-center cursor-pointer"
              }
            >
              Подтвердить
            </button>

            {error ? (
              <div className={"text-lg font-medium font-sans text-red-600"}>
                {" "}
                Заполните все поля!{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
