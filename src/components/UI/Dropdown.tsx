import { useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { useClickOutside } from "./useClickOutside";
import { userInterface } from "../Header";
import { Profile } from "../Profile";
import { NavLink } from "react-router-dom";

export const Dropdown = ({
  userData,
}: {
  userData: userInterface | boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className="flex justify-end flex-row duration-700">
      <div className="relative flex flex-col items-center">
        <button onClick={() => setIsOpen((prev: boolean) => !prev)}>
          <div className="flex items-center place-items-center space-x-4 hover:cursor-pointer">
            <div className="h-10 w-10 aspect-square bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex justify-center items-center">
              <div className="font-medium text-md text-white">
                {typeof userData === "boolean" ? "" : userData.firstName[0]}
                {typeof userData === "boolean" ? "" : userData.thirdName[0]}
              </div>
            </div>
            <div className="font-medium text-gray-800  flex flex-col items-start">
              <div className="flex flex-row gap-2 whitespace-nowrap items-center ">
                <div>
                  {typeof userData === "boolean"
                    ? ""
                    : userData.secondName + " "}
                  {typeof userData === "boolean"
                    ? ""
                    : userData.firstName[0] + "."}
                  {typeof userData === "boolean"
                    ? ""
                    : userData.thirdName[0] + "."}
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
      <div
        className={
          isOpen
            ? "w-36 flex opacity-100 bg-gray-300 absolute mt-14 rounded-lg transition-all duration-500"
            : "w-0 h-16 opacity-0 bg-gray-300 absolute mt-14 rounded-lg transition-all duration-500"
        }
        ref={menuRef}
      >
        {isOpen ? (
          <div className={"flex flex-col "}>
            <NavLink to={"/profile"}>
              <button
                className={
                  "text-start font-sans p-2 w-36 hover:bg-blue-400 transition-all duration-500 rounded-lg flex row items-center "
                }
              >
                <CgProfile size={16} />
                <p className={"px-2"}>Профиль </p>
              </button>
            </NavLink>
            <button
              className={
                "text-start p-2 w-36 hover:bg-red-600 transition-all duration-500 rounded-lg flex row items-center"
              }
              onClick={() => {
                document.cookie = `token=; path=/; max-age=0;`; // clear cookie
                window.location.reload(); // reload page
              }}
            >
              <ImExit size={16} />
              <p className={"px-2"}>Выйти </p>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
