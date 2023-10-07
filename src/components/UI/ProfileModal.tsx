import React, { useState } from "react";
import axios from "axios";
import { TiDelete } from "react-icons/ti";

export const ProfileModal = ({ isVisable, setShowProfileUpdate }) => {
  if (!isVisable) return null;
  const handleClose = (e) => {
    if (e.target.id === "exit") {
      setShowProfileUpdate(false);
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
      <div className={"w-1/2 h-auto inset-0 flex justify-center"}>
        <div
          className={
            "shadow w-full h-auto my-8 flex flex-col gap-8 p-4 bg-white rounded-lg"
          }
        >
          <div className={"w-full flex items-end justify-end"}>
            <TiDelete
              size={30}
              className={
                "hover:opacity-100 opacity-50 duration-500 cursor-pointer "
              }
              onClick={() => setShowProfileUpdate(false)}
            />
          </div>

            <div className={"flex flex-row gap-4 w-full "}>
                <input type={"file"}
                  className={"w-auto h-full rounded-full hover:opacity-80 bg-cover duration-500 bg-[url('https://i.pinimg.com/736x/0d/66/b8/0d66b88a39b453a9daff56b60d59f04a.jpg')]"}
                />
           <div className={"flex flex-col w-full gap-4"}>
               <div
                 className={
                     "text-2xl outline outline-1 p-2 rounded-lg"
                 }
               >
                   Смирнов Владислав Андреевич
               </div>
               <div
                 className={
                     "text-2xl outline outline-1 p-2 rounded-lg"
                 }
               >
                   273
               </div>
               <div
                 className={
                     "text-2xl outline outline-1 rounded-lg h-full"
                 }
               >
                   <textarea className={"h-full w-full p-2 text-xl resize-none rounded-lg focus:outline-none"} placeholder={"Ваша речь"}/>
               </div>
           </div>

          </div>
            <button className={"w-full flex justify-center p-2 rounded-lg bg-green-600 hover:bg-green-700 duration-500 font-sans text-white"}>
     Применить
            </button>
        </div>
      </div>
    </div>
  );
};
