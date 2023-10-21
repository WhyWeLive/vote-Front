import { useState } from "react";
import { TiDelete } from "react-icons/ti";

export const VoteProfile = ({ isVisable, setShowVoteProfile, userData }) => {
  const [profile, setProfile] = useState({
    id: "",
    firstName: "",
    secondName: "",
    thirdName: "",
    grup: "",
    profile_picture: "",
    email: "",
    password: "",
    bio: "",
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
      <div className={"w-1/2 h-min inset-0 flex justify-center"}>
        <div
          className={
            "shadow w-full h-full my-8 flex flex-col gap-8 p-4 bg-white rounded-lg"
          }
        >
          <div className={"w-full flex items-end justify-end"}>
            <TiDelete
              size={30}
              className={
                "hover:opacity-100 opacity-50 duration-500 cursor-pointer "
              }
              onClick={() => setShowVoteProfile(false)}
            />
          </div>
          <div className={"flex gap-4"}>
            <div
              className={
                "w-96 h-96 flex duration-500 justify-center items-center"
              }
            >
              {profile.profile_picture ? (
                <img
                  src={`http://localhost:3000/files/getProfilePicture/${profile.profile_picture}`}
                  className={
                    "w-96 h-96 rounded-lg pointer-events-none object-cover"
                  }
                />
              ) : (
                <img
                  src={
                    "https://i.pinimg.com/736x/6b/f6/2c/6bf62c6c123cdcd33d2d693782a46b34.jpg"
                    // "http://localhost:3000/files/getProfilePicture/stockPicture.png"
                  }
                  className={
                    "w-96 h-96 rounded-lg pointer-events-none object-cover"
                  }
                />
              )}
            </div>

            <div className={"flex flex-col w-full gap-4"}>
              <div
                className={
                  "text-2xl outline outline-1 p-2 rounded-lg duration-500"
                }
              >
                {typeof userData === "boolean" ? "" : profile.secondName + " "}
                {typeof userData === "boolean" ? "" : profile.firstName + " "}
                {typeof userData === "boolean" ? "" : profile.thirdName + " "}
                Смирнов Владислав Андреевич
              </div>
              <div
                className={
                  "text-2xl outline outline-1 p-2 rounded-lg duration-500"
                }
              >
                {"11ИС-273"}
              </div>
              <div
                className={
                  "text-2xl outline outline-1 p-2 rounded-lg duration-500 text-cyan-500"
                }
              >
                Редактор сайта
              </div>
              <div
                className={
                  "text-2xl outline outline-1 rounded-lg h-max duration-500 p-2"
                }
              >
                Я в своем познании настолько преисполнился, что я как будто бы
                уже сто триллионов миллиардов лет проживаю на триллионах и
                триллионах таких же планет, как эта Земля, мне этот мир
                абсолютно понятен, и я здесь ищу только одного - покоя,
                умиротворения и вот этой гармонии, от слияния с бесконечно
                вечным, от созерцания великого фрактального подобия и от вот
                этого замечательного всеединства существа, бесконечно вечного,
                куда ни посмотри, хоть вглубь - бесконечно малое, хоть ввысь -
                бесконечное большое, понимаешь? А ты мне опять со своим вот
                этим, иди суетись дальше, это твоё распределение, это твой путь
                и твой горизонт познания и ощущения твоей природы, он
                несоизмеримо мелок по сравнению с моим, понимаешь?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
