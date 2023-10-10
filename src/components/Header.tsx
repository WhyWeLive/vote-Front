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
}: {
  toggle: string;
  userData: userInterface | boolean;
}) => {
  const [headerBtn, setHeaderBtn] = useState(toggle);

  return (
    <header>
      <div className="px-56 mx-auto py-2 items-center flex justify-between">
        <a aria-current="page" className="active" href="/">
          <div className="flex items-center gap-2 whitespace-nowrap ">
            <img
              src="http://localhost:3000/files/getProfilePicture/header.jpg"
              className="h-10 w-10 rounded-3xl"
            />
            <span className="font-semibold text-lg">Голосование » НКЭиВТ</span>
          </div>
        </a>

        <div className="flex justify-center items-center gap-4 mr-16">
          <div className="py-2">
            <NavLink className="outline-none" to="/">
              <button
                onClick={() => setHeaderBtn("News")}
                className={
                  headerBtn === "News"
                    ? "py-2 w-[175px] px-10 bg-gray-800 rounded-l-lg text-white duration-700"
                    : "py-2 w-[175px] px-10 bg-gray-500 rounded-l-lg text-white duration-700"
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
                    ? "py-2 w-[175px] px-10 bg-gray-800 rounded-r-lg text-white duration-700"
                    : "py-2 w-[175px] px-10 bg-gray-500 rounded-r-lg text-white duration-700"
                }
              >
                Голосование
              </button>
            </NavLink>
          </div>
        </div>

        <div
          className="relative inline-block text-left"
          data-headlessui-state=""
        >
          <Dropdown
            userData={userData}
            setShowModal={setShowModal}
            setShowModalProfile={setShowModalProfile}
          />
        </div>
      </div>
    </header>
  );
};
