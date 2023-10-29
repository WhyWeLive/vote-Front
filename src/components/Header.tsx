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
      <div className="sm:px-56 py-2 flex-col sm:flex-row items-center flex justify-between">
        <div className="flex items-center gap-2 whitespace-nowrap ">
          <img
            src="http://localhost:3000/files/getProfilePicture/header.jpg"
            className="h-10 w-10 rounded-3xl"
          />
          <div className="font-semibold text-lg">Голосование » НКЭиВТ</div>
        </div>

        <div className="flex justify-center items-center flex-row gap-4 w-full sm:w-auto">
          <div className="sm:py-1 sm:static absolute bottom-0 sm:bottom-0 z-20 w-full sm:w-auto">
            <NavLink className="outline-none" to="/">
              <button
                onClick={() => setHeaderBtn("News")}
                className={
                  headerBtn === "News"
                    ? "py-2 w-1/2 sm:w-[175px] sm:rounded-l-lg px-10 bg-gray-800  text-white duration-700"
                    : "py-2 w-1/2 sm:w-[175px] sm:rounded-l-lg px-10 bg-gray-500  text-white duration-700"
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
                    ? "py-2 w-1/2 sm:w-[175px] sm:rounded-r-lg px-10 bg-gray-800 text-white duration-700"
                    : "py-2 w-1/2 sm:w-[175px] sm:rounded-r-lg px-10 bg-gray-500 text-white duration-700"
                }
              >
                Голосование
              </button>
            </NavLink>
          </div>
        </div>

        <div className="relative inline-block" data-headlessui-state="">
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
