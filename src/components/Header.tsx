import { useState } from "react";
import { NavLink } from "react-router-dom";

type PageState = "News" | "Vote"

export const Header = ({ toggle }: { toggle: PageState }) => {
  const [headerBtn, setHeaderBtn] = useState(toggle);


  return (
    <header>
      <div className="container mx-auto py-2 items-center flex">
        <a aria-current="page" className="active" href="/">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <img
              src="https://files.collegeschedule.ru:8443/system/cover/56917bab-c55b-4cbe-808f-2a962f53fc0d?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=7DsYIuz84dtdrOd6%2F20230921%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20230921T064931Z&amp;X-Amz-Expires=604800&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Signature=d13c0755f23c7fddb54746492d160e252a18ae83509380b9a618b9bb455d2df0"
              className="h-8 w-8 rounded-lg"
            />
            <span className="font-semibold text-lg">Голосование » НКЭиВТ</span>
          </div>
        </a>

        <div className="grow flex justify-center items-center gap-4 mr-16">
          <div className="py-2">
            <NavLink className="outline-none" to="/">
              <button
                onClick={() => setHeaderBtn("News")}
                className={
                  headerBtn === "News"
                    ? "py-2 px-10 bg-gray-800 rounded-l-lg text-white duration-700"
                    : "py-2 px-10 bg-gray-500 rounded-l-lg text-white duration-700 outline outline-bg-gray-800" // тут обитает костыль
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
                    ? "py-2 px-10 bg-gray-800 rounded-r-lg text-white duration-700"
                    : "py-2 px-10 bg-gray-500 rounded-r-lg text-white duration-700"
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
          <div>
            <button
              className=""
              id="headlessui-menu-button-:r0:"
              type="button"
              aria-haspopup="menu"
              aria-expanded="false"
              data-headlessui-state=""
            >
              <div className="flex items-center place-items-center space-x-4 hover:cursor-pointer">
                <div className="h-10 w-10 aspect-square bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex justify-center items-center">
                  <div className="font-medium text-md text-white">273</div>
                </div>
                <div className="font-medium text-gray-800  flex flex-col items-start">
                  <div className="flex flex-row gap-2 whitespace-nowrap items-center ">
                    <div>11IS-273</div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};