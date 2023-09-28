import { useState, useRef } from "react";
import { userInterface } from "../Header";
import { useClickOutside } from "./useClickOutside";

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
        <button onClick={() => setIsOpen((prev: boolean) => true)}>
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
            ? "w-40 h-20 p-2 flex opacity-100 bg-gray-500 absolute mt-14 rounded-lg transition-all duration-500"
            : "w-40 h-20 p-2 none opacity-0 bg-gray-500 absolute mt-14 rounded-lg transition-all duration-500"
        }
        ref={menuRef}
      >
        Я кнопочка в дропбоксе
      </div>
    </div>
  );
};
