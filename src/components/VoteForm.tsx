import React, { useState } from "react";
import { DateTime } from "luxon";
import { VoteProfile } from "./UI/VoteProfile";
import { TbHandFinger } from "react-icons/tb";

export const VoteForm = ({
  header,
  voteCount,
  createdAt,
  endedAt,
  elected,
  id,
}) => {
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [checked, setChecked] = useState();
  const [showVoteProfile, setShowVoteProfile] = useState(true);

  return (
    <div>
      {showVoteProfile && (
        <VoteProfile
          isVisable={showVoteProfile}
          setShowVoteProfile={setShowVoteProfile}
          key={1}
        />
      )}
      <div
        className={
          "my-5 w-[700px] h-max border border-2 rounded-lg bg-white flex flex-col  p-6"
        }
      >
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
          <div className={"flex flex-col gap-2"}>
            <input
              type="radio"
              id={`${item}`}
              name={`${id}`}
              className="hidden peer"
              required
              onClick={() => setChecked(item)}
            />
            <div />
            <label
              htmlFor={`${item}`}
              className=" w-full h-full flex py-4  rounded-xl peer-checked:bg-gray-200 peer-checked:shadow duration-500 hover:bg-stone-100 peer-checked:text-[#2196f3]"
            >
              <div
                className={
                  "flex flex-row justify-between items-center rounded-xl px-4 h-16 w-full"
                }
              >
                <div className={"flex flex-row gap-4 items-center"}>
                  <div
                    className={
                      "relative flex duration-500 hover:brightness-[60%] "
                    }
                  >
                    <div
                      className={
                        "absolute w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 duration-700"
                      }
                    >
                      <TbHandFinger className={"w-8 h-8 text-white "} />

                      <button
                        className={
                          "absolute w-full h-full rounded-full cursor-pointer z-10 "
                        }
                        onClick={() => setShowVoteProfile(true)}
                      ></button>
                    </div>
                    <img
                      className={"w-16 h-16 rounded-full object-cover"}
                      src={`http://localhost:3000/users/getPhotoByEmail/${item}`}
                    />
                  </div>
                  <div className={"text-2xl font-semi"}>{item}</div>
                </div>
                <img
                  src={
                    "https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
                  }
                  className={
                    checked == item
                      ? "h-6 w-6 opacity-70 duration-500 pointer-events-none"
                      : "opacity-0 duration-100 h-2 w-2 "
                  }
                />
              </div>
            </label>
          </div>
        ))}

        <hr className={"my-4"} />
        <div className={"flex flex-col items-center"}>
          <button
            disabled={checked ? false : true}
            className={
              checked
                ? "rounded-lg bg-black/80 border-transparent p-2 w-64 text-base font-medium text-white font-sans hover:bg-blue-600 duration-500"
                : "rounded-lg bg-black/60 border-transparent p-2 w-64 text-base font-medium text-white font-sans duration-500"
            }
            onClick={() => {
              /// obrabotka
              setSuccessfulModal(true);
            }}
          >
            Проголосовать
          </button>
        </div>
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
                <div
                  className={"flex flex-col items-center gap-2 w-auto h-auto"}
                >
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
                <div
                  className={"flex flex-col items-center gap-2 w-auto h-auto"}
                >
                  <img
                    src={
                      "https://cdn-icons-png.flaticon.com/512/463/463612.png"
                    }
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
      </div>
    </div>
  );
};
