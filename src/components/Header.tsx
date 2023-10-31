import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from "./UI/Dropdown";

export interface userInterface {
  id?: number;
  firstName: string;
  secondName: string;
  thirdName: string;
  email?: string;
  password?: string;
  profile_picture?: string;
  grup?: Array<string>;
  roles?: Array<string>;
}

export const Header = ({
  setShowModal,
  toggle,
  userData,
  setShowModalProfile,
  setShowModalVote,
}: {
  toggle: string;
  userData: userInterface | boolean;
}) => {
  const [headerBtn, setHeaderBtn] = useState(toggle);

  return (
    <header>
      <div className="2xl:px-56 md:px-8 flex-row items-center flex justify-center sm:justify-between py-1">
        <div className="flex items-center gap-2 whitespace-nowrap ">
          <img
            src={`http://${
              import.meta.env.VITE_HOST
            }:3000/files/getProfilePicture/header.jpg`}
            className="h-10 w-10 rounded-3xl hidden sm:block"
          />
          <div className="font-semibold md:w-[273px] xl:text-lg sm:block hidden">
            Голосование » НКЭиВТ
          </div>
        </div>

        <div className="flex justify-center items-center flex-row gap-4 w-max lg:w-auto">
          <div className="lg:py-1 flex items-center justify-center w-full sm:w-auto">
            <NavLink className="outline-none" to="/">
              <button
                onClick={() => setHeaderBtn("News")}
                className={
                  headerBtn === "News"
                    ? "py-2 w-[130px] md:w-[136.5px] xl:w-[175px] rounded-l-lg px-5 bg-gray-800  text-white duration-500"
                    : "py-2 w-[130px] md:w-[136.5px] xl:w-[175px] rounded-l-lg px-5 bg-gray-500  text-white duration-500"
                }
              >
                Новости
              </button>
            </NavLink>

            <NavLink className="outline-none" to="/vote">
              <button
                onClick={() => setHeaderBtn("Vote")}
                className={
                  headerBtn === "Vote"
                    ? "py-2 w-[130px] xl:w-[175px] md:w-[136.5px]  text-center rounded-r-lg bg-gray-800 text-white duration-700"
                    : "py-2 w-[130px] xl:w-[175px] md:w-[136.5px] text-center rounded-r-lg bg-gray-500 text-white duration-700"
                }
              >
                Голосование
              </button>
            </NavLink>
          </div>
        </div>

        <div
          className="relative inline-block my-2 sm:my-0"
          data-headlessui-state=""
        >
          <Dropdown
            userData={userData}
            setShowModal={setShowModal}
            setShowModalProfile={setShowModalProfile}
            setShowModalVote={setShowModalVote}
          />
        </div>
      </div>
    </header>
  );
};
