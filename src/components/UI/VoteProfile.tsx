import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

export const VoteProfile = ({ isVisable, setShowVoteProfile, userData }) => {
  const [profile, setProfile] = useState({
    id: "1",
    firstName: "Смирнов",
    secondName: "Владислав",
    thirdName: "Андреевич",
    grup: "11ИС-273",
    profile_picture:
      "https://i.pinimg.com/564x/59/b9/cc/59b9cc2278ef3039505e0afb8a2c337d.jpg",
    bio: "Бла бла",
    roles: ["Студент", " Админ"],
  });

  if (!isVisable) return null;
  const handleClose = (e) => {
    if (e.target.id === "exit") {
      setShowVoteProfile(false);
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
      <div className={"w-[500px] h-auto flex justify-center"}>
        <div
          className={
            "shadow w-full h-max my-8 flex flex-col gap-4 p-4 bg-white rounded-lg"
          }
        >
          <div className={"w-full flex items-end justify-end"}>
            <TiDelete
              size={25}
              className={
                "hover:opacity-100 opacity-50 duration-500 cursor-pointer "
              }
              onClick={() => setShowVoteProfile(false)}
            />
          </div>

          <div className={"flex flex-col gap-4 items-center"}>
            <div
              className={
                "w-64 h-64 rounded-full flex relative hover:brightness-[70%] duration-500 justify-center items-center"
              }
            >
              {profile.profile_picture ? (
                <img
                  src={`${profile.profile_picture}`}
                  className={
                    "w-64 h-64 rounded-full pointer-events-none object-cover rounded-full"
                  }
                />
              ) : (
                <img
                  src={
                    "http://localhost:3000/files/getProfilePicture/stockPicture.png"
                  }
                  className={
                    "w-64 h-64 rounded-full pointer-events-none object-cover rounded-full"
                  }
                />
              )}
            </div>

            <div className={"flex flex-col w-full gap-2"}>
              <div>
                <div className={"text-2xl rounded-lg duration-500 text-start"}>
                  {typeof userData === "boolean" ? "" : profile.firstName + " "}
                  {typeof userData === "boolean"
                    ? ""
                    : profile.secondName + " "}
                  {typeof userData === "boolean" ? "" : profile.thirdName + " "}
                </div>
                <div
                  className={
                    "text-lg opacity-50 font-light rounded-lg duration-500 text-start"
                  }
                >
                  {`Группа: ${profile.grup}`}
                </div>
                <div
                  className={
                    "text-lg opacity-50 font-light rounded-lg duration-500 text-start"
                  }
                >
                  {`Роль: ${profile.roles}`}
                </div>
              </div>
              <div
                className={
                  "min-h-32 max-h-72 overflow-y-auto border my-2 overflow-x-hidden w-full"
                }
              >
                <div
                  className={
                    "p-2 whitespace-normal prose max-w-full break-words"
                  }
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    Единый день открытых дверей состоялся🥳 Для абитуриентов и
                    их родителей была проведена обширная программа, показывающая
                    преимущества обучения в нашем колледже! более 100 участников
                    из 6 образовательных организаций 4 организации - партнера 12
                    волонтеров 3 часа активного погружения в федеральный проект
                    "Профессионалитет" более 50 заданных вопросов и полученных
                    ответов🤗 🔸В рамках родительского собрания обсудили вопросы
                    подготовки специалистов в соответствии с потребностями
                    работодателей. 🔸Профессиональные пробы по 4 направлениям
                    успели посетить школьники 8-11 классов. 🔸На Всероссийском
                    классном часу рассказывали о преимуществах обучения в
                    колледже по программам Профессионалитета. 🔸И даже успели
                    посетить экскурсии на предприятия - партнеров проекта.
                    Подробнее о каждом событии расскажем уже завтра 👋🏻
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
