import React, { useEffect, useState } from "react";
import { TbHandFinger } from "react-icons/tb";
import axios from "axios";
import { VoteProfile } from "./VoteProfile";

export const Elected = ({
  item,
  setShowVoteProfile,
  setChecked,
  checked,
  id,
  getElect,
  voteFinish,
  showVoteProfile,
  giveElectedDataToFather,
}) => {
  const [electedData, setElectedData] = useState({
    firstName: "",
    secondName: "",
    thirdName: "",
    bio: "",
    grup: [""],
    roles: [""],
    profile_picture: "",
  });

  const [votesCount, setVotesCount] = useState(0);

  const [name, setName] = useState("");

  function getElectedData() {
    axios
      .get(`http://localhost:3000/users/emailWithoutPass/${item}`)
      .then(({ data }) => {
        if (data) {
          setElectedData(data);
          giveElectedDataToFather(data);
          setShowVoteProfile(true);
        }
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/getNameByEmail/${item}`)
      .then((response) => {
        setName(response.data);
      })
      .then(() => {
        axios
          .get(`http://localhost:3000/vote/getVotesCountByEmail/${id}/${item}`)
          .then(({ data }) => setVotesCount(data));
      });
  }, [1]);

  return (
    <div className={"flex flex-col gap-2"}>
      <input
        type="radio"
        id={`${item + id.toString()}`}
        name={`${id.toString() + item}`}
        className="hidden peer"
        required
        onClick={() => {
          if (typeof setChecked != "function") {
          } else {
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
              {item === "Да" ||
              item === "да" ||
              item === "Нет" ||
              item === "нет" ? (
                ""
              ) : (
                <img
                  className={"w-16 h-16 rounded-full object-cover z-4"}
                  src={`http://localhost:3000/users/getPhotoByEmail/${item}`}
                />
              )}
            </div>
            <div className={"text-2xl font-semi"}>{name ? name : item}</div>
          </div>
          <img
            src={"https://cdn-icons-png.flaticon.com/512/1828/1828640.png"}
            className={
              voteFinish
                ? "hidden"
                : checked == item
                ? "h-6 w-6 opacity-70 duration-500 pointer-events-none"
                : "opacity-0 duration-100 h-2 w-2"
            }
          />
          {voteFinish ? (
            <div className={"flex flex-row items-center justify-center gap-8"}>
              Проголосовавших: {votesCount}
            </div>
          ) : (
            ""
          )}
        </div>
      </label>
    </div>
  );
};
