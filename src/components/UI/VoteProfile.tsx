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
      <div className={"w-1/2 h-1/2 inset-0 flex justify-center"}>
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
                    "https://i.pinimg.com/736x/51/c4/a9/51c4a974526459023f66c8ec93dffeb0.jpg"
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
                  "text-2xl outline outline-1 rounded-lg h-full duration-500 p-2"
                }
              >
                <div>Моя речь проста.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
