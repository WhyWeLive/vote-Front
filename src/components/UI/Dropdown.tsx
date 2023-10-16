import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useClickOutside } from "./useClickOutside";
import { ImExit } from "react-icons/im";
import { CgAddR, CgProfile } from "react-icons/cg";
import { LuVote } from "react-icons/lu";

export const Dropdown = ({
  setShowModal,
  userData,
  setShowModalProfile,
  setShowModalVote,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className="flex justify-end flex-row duration-700">
      <div className="relative flex flex-col items-center">
        <button onClick={() => setIsOpen((prev: boolean) => !prev)}>
          <div className="flex items-center place-items-center gap-2 hover:cursor-pointer">
            <div className="w-10">
              <img
                src={`http://localhost:3000/files/getProfilePicture/${
                  userData.profile_picture ?? "stockPicture.png"
                }`}
                className={"rounded-full object-cover h-10 w-10"}
              />
            </div>
            <div className="flex flex-row gap-2 whitespace-nowrap items-center ">
              <div>
                {typeof userData === "boolean" ? "" : userData.secondName + " "}
                {typeof userData === "boolean"
                  ? ""
                  : userData.firstName[0] + "."}
                {typeof userData === "boolean"
                  ? ""
                  : userData.thirdName[0] + "."}
              </div>
            </div>
          </div>
        </button>
      </div>
      <div
        className={
          isOpen
            ? "w-56 flex opacity-100 bg-gray-300 absolute mt-14 rounded-lg transition-all duration-500 whitespace-nowrap z-20"
            : "w-48 opacity-0 bg-gray-300 absolute mt-14 rounded-lg transition-all duration-500 whitespace-nowrap z-20"
        }
        ref={menuRef}
      >
        {isOpen ? (
          <div className={"flex flex-col w-full  "}>
            <button
              className={
                "text-start w-full font-sans p-2 hover:bg-blue-400 transition-all duration-500 rounded-lg flex row items-center "
              }
              onClick={() => {
                setShowModalProfile(true);
                setIsOpen(false);
              }}
            >
              <CgProfile size={16} />
              <p className={"px-2"}>Профиль </p>
            </button>

            <div
              className={
                "w-full hover:bg-green-500 transition-all duration-500 rounded-lg"
              }
            >
              <button
                className={"text-start p-2 flex row items-center"}
                onClick={() => {
                  setShowModalVote(true);
                  setIsOpen(false);
                }}
              >
                <LuVote size={16} />
                <p className={"px-2"}>Добавить голосование </p>
              </button>
            </div>

            {userData.roles.find((item) => item === "Editor") ? (
              <NavLink>
                <div
                  className={
                    "w-full hover:bg-orange-400 transition-all duration-500 rounded-lg"
                  }
                >
                  <button
                    className={"text-start p-2 flex row items-center"}
                    onClick={() => {
                      setShowModal(true);
                      setIsOpen(false);
                    }}
                  >
                    <CgAddR size={16} />
                    <p className={"px-2"}>Добавить новость </p>
                  </button>
                </div>
              </NavLink>
            ) : (
              ""
            )}

            <button
              className={
                "text-start p-2 hover:bg-red-600 transition-all duration-500 rounded-lg"
              }
              onClick={() => {
                document.cookie = `token=; path=/; max-age=0;`; // clear cookie
                window.location.reload(); // reload page
              }}
            >
              <NavLink to="/" className="flex row items-center">
                <ImExit size={16} />
                <p className={"px-2"}>Выйти </p>
              </NavLink>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
