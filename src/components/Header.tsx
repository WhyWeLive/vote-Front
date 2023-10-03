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
  grup?: Array<string>;
  roles?: Array<string>;
}

export const Header = ({
  setShowModal,
  toggle,
  userData,
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
              src="data:image/jpeg;base64,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"
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
          <Dropdown userData={userData} setShowModal={setShowModal} />
        </div>
      </div>
    </header>
  );
};
