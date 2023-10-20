import React, { useEffect, useState } from "react";
import { TbHandFinger } from "react-icons/tb";
import axios from "axios";

export const Elected = ({
  item,
  setShowVoteProfile,
  setChecked,
  checked,
  id,
  getElect,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/getNameByEmail/${item}`)
      .then((response) => {
        setName(response.data);
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
          setChecked(item);
          getElect(item);
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
          <div className={"flex flex-row gap-4 items-center"}>
            <div
              className={"relative flex duration-500 hover:brightness-[60%] "}
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
            <div className={"text-2xl font-semi"}>{name}</div>
          </div>
          <img
            src={"https://cdn-icons-png.flaticon.com/512/1828/1828640.png"}
            className={
              checked == item
                ? "h-6 w-6 opacity-70 duration-500 pointer-events-none"
                : "opacity-0 duration-100 h-2 w-2 "
            }
          />
        </div>
      </label>
    </div>
  );
};
