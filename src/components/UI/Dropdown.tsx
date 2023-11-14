import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useClickOutside } from "./useClickOutside";
import { ImExit } from "react-icons/im";
import { CgAddR, CgProfile } from "react-icons/cg";
import { LuVote } from "react-icons/lu";
import { userInterface } from "../Header";

export const Dropdown = ({
  setShowModal,
  userData,
  setShowModalProfile,
  setShowModalVote,
}: {
  setShowModal: (arg0: boolean) => void;
  userData: userInterface;
  setShowModalProfile: (arg0: boolean) => void;
  setShowModalVote: (arg0: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className="flex justify-center sm:justify-end flex-row duration-700 lg:w-[321px] w-full absolute top-[-20px] md:w-[289px] md:px-10 left-[35px] sm:static ">
      <div className="relative flex flex-col items-center">
        <button onClick={() => setIsOpen((prev: boolean) => !prev)}>
          <div className="flex items-center text-center place-items-center gap-2 hover:cursor-pointer">
            <div className="w-10">
              <img
                src={`http://${import.meta.env.VITE_HOST}:${
                  import.meta.env.VITE_PORT
                }/files/getProfilePicture/${
                  (userData.profile_picture && userData.profile_picture) ??
                  "stockPicture.png"
                }`}
                className={"rounded-full object-cover h-10 w-10"}
              />
            </div>
            <div className="flex flex-row gap-2 whitespace-nowrap items-center hidden sm:block ">
              <div>
                {userData.secondName + " "}
                {userData.firstName[0] + "."}
                {userData.thirdName[0] + "."}
              </div>
            </div>
          </div>
        </button>
      </div>
      <div
        className={
          isOpen
            ? "w-56 mr-36 sm:mr-0 flex opacity-100 bg-gray-300 absolute mt-14 rounded-lg transition-all duration-500 whitespace-nowrap z-20"
            : "w-48 mr-0 sm:mr-0 opacity-0 bg-gray-300 absolute mt-14 rounded-lg transition-all duration-500 whitespace-nowrap z-20"
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

            {userData.roles &&
            userData.roles.find((item) => item === "Editor") ? (
              <NavLink to="">
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
