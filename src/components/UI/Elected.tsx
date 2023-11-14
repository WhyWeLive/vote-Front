import { useEffect, useState } from "react";
import { TbHandFinger } from "react-icons/tb";
import axios from "axios";
import Selected from "./Images/Selected.png";

export const Elected = ({
  item,
  setShowVoteProfile,
  setChecked,
  checked,
  id,
  getElect,
  voteFinish,
  giveElectedDataToFather,
  votePerm,
}: {
  item: string | boolean;
  setShowVoteProfile: (arg0: boolean) => void;
  setChecked: any;
  checked: string | boolean;
  id: number;
  getElect: (arg0: string | boolean) => void;
  voteFinish: boolean;
  giveElectedDataToFather: (arg0: object) => void;
  votePerm: any;
}) => {
  const [votesCount, setVotesCount] = useState(0);

  const [name, setName] = useState("");

  function getElectedData() {
    axios
      .get(
        `http://${import.meta.env.VITE_HOST}:${
          import.meta.env.VITE_PORT
        }/users/emailWithoutPass/${item}`
      )
      .then(({ data }) => {
        if (data) {
          giveElectedDataToFather(data);
          setShowVoteProfile(true);
        }
      });
  }

  useEffect(() => {
    axios
      .get(
        `http://${import.meta.env.VITE_HOST}:${
          import.meta.env.VITE_PORT
        }/users/getNameByEmail/${item}`
      )
      .then((response) => {
        setName(response.data);
      })
      .then(() => {
        axios
          .get(
            `http://${import.meta.env.VITE_HOST}:${
              import.meta.env.VITE_PORT
            }/vote/getVotesCountByEmail/${id}/${item}`
          )
          .then(({ data }) => setVotesCount(data));
      });
  }, [1]);

  return (
    <div
      className={
        votePerm
          ? "flex flex-col gap-2 w-full sm:w-auto"
          : "flex flex-col gap-2 w-full sm:w-auto opacity-60"
      }
    >
      <input
        type="radio"
        id={`${item + id.toString()}`}
        name={`${id.toString() + item}`}
        className="hidden peer"
        required
        onClick={() => {
          if (!(typeof setChecked != "function")) {
            setChecked(item);
            getElect(item);
          }
        }}
      />

      <div />
      <label
        htmlFor={`${item + id.toString()}`}
        className={
          checked == item
            ? " w-full h-full flex py-4 rounded-xl peer-checked:bg-gray-200 peer-checked:shadow duration-500 hover:bg-stone-100 " +
              "peer-checked:text-[#2196f3]"
            : " w-full h-full flex py-4 rounded-xl duration-500 hover:bg-stone-100"
        }
      >
        <div
          className={
            "flex flex-row justify-between items-center rounded-xl px-4 h-16 w-full"
          }
        >
          <div className={"flex flex-row gap-4 items-center "}>
            <div
              className={"relative flex duration-500 hover:brightness-[60%] "}
            >
              <div
                className={
                  "absolute w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 duration-700 z-4 "
                }
              >
                <TbHandFinger className={"w-8 h-8 text-white "} />

                <button
                  className={
                    "absolute w-full h-full rounded-full cursor-pointer z-10 "
                  }
                  onClick={() => {
                    getElectedData();
                  }}
                ></button>
              </div>
              <div className={"h-max w-max"}>
                {item === "Да" ||
                item === "да" ||
                item === "Нет" ||
                item === "нет" ? (
                  ""
                ) : (
                  <img
                    className={"w-16 h-16 rounded-full object-cover z-4"}
                    src={`http://${import.meta.env.VITE_HOST}:${
                      import.meta.env.VITE_PORT
                    }/users/getPhotoByEmail/${item}`}
                  />
                )}
              </div>
            </div>
            <div className={"h-min sm:text-xl"}>{name ? name : item}</div>
          </div>
          <div>
            {voteFinish ? (
              <div
                className={
                  "flex flex-row items-center gap-4 w-[135px] h-[24px] justify-between "
                }
              >
                <div
                  className={
                    "w-full bg-blue-300 relative rounded-sm flex items-center"
                  }
                >
                  <div
                    className={
                      "absolute text-sm w-full text-center pointer-events-none text-black/80 font-semibold"
                    }
                  >
                    {Number(votesCount) ? votesCount + "%" : "0%"}
                  </div>
                  <div
                    style={
                      Number(votesCount)
                        ? { width: `${votesCount}%` }
                        : { width: `0%` }
                    }
                    className={"h-4 rounded-sm bg-blue-500"}
                  ></div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <img
            src={Selected}
            className={
              voteFinish
                ? "hidden"
                : checked == item
                ? "h-6 w-6 opacity-70 duration-500 pointer-events-none"
                : "opacity-0 duration-100 h-2 w-2"
            }
          />
        </div>
      </label>
    </div>
  );
};
