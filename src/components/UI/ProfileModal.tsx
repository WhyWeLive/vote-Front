import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import axios from "axios";

export const ProfileModal = ({ isVisable, setShowProfileUpdate, userData }) => {
  const [profile, setProfile] = useState({
    id: "",
    firstName: "",
    secondName: "",
    thirdName: "",
    grup: "",
    profile_picture: "",
  });

  useEffect(() => {
    setProfile({ ...userData });
  }, [userData]);

  const [selectedFile, setSelectedFile] = useState();
  const [urlFile, setUrlFile] = useState("");

  if (!isVisable) return null;
  const handleClose = (e) => {
    if (e.target.id === "exit") {
      setShowProfileUpdate(false);
    }
  };

  function preview(event) {
    setSelectedFile(event.target.files[0]);
    setUrlFile(URL.createObjectURL(event.target.files[0]));
    console.log(urlFile);
  }

  function updateAvatar() {
    axios
      .post(
        `http://localhost:3000/users/setProfilePicture/${profile.id}`,
        {
          picture: selectedFile,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": `multipart/form-data`,
          },
        },
      )
      .then((response) => setProfile(response.data));
  }

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
            "shadow w-full h-max my-8 flex flex-col gap-8 p-4 bg-white rounded-lg"
          }
        >
          <div className={"w-full flex items-end justify-end"}>
            <TiDelete
              size={30}
              className={
                "hover:opacity-100 opacity-50 duration-500 cursor-pointer "
              }
              onClick={() => setShowProfileUpdate(false)}
            />
          </div>
          <div className={"flex gap-4"}>
            <div
              className={
                "w-96 h-96 flex relative hover:brightness-[70%] duration-500 justify-center items-center"
              }
            >
              {urlFile ? (
                <img
                  src={urlFile}
                  className={
                    "w-96 h-96 rounded-lg pointer-events-none object-cover object-center "
                  }
                />
              ) : profile.profile_picture ? (
                <img
                  src={`http://localhost:3000/files/getProfilePicture/${profile.profile_picture}`}
                  className={
                    "w-96 h-96 rounded-lg pointer-events-none object-cover"
                  }
                />
              ) : (
                <img
                  src={
                    "https://i.pinimg.com/564x/b5/33/b5/b533b536208b06480c4804e20d2b204e.jpg"
                  }
                  className={
                    "w-96 h-96 rounded-lg pointer-events-none object-cover"
                  }
                />
              )}

              <div
                className={
                  "absolute w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 duration-700"
                }
              >
                <img
                  src={
                    "https://img.icons8.com/?size=200&id=NjujHWc6iSDE&format=png&color=FFFFFF"
                  }
                  className={"w-24 h-24"}
                />

                <input
                  type={"file"}
                  className={`absolute w-full h-full hover:opacity-80 duration-500`}
                  multiple={false}
                  onChange={(event) => preview(event)}
                />
              </div>
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
              </div>
              <div
                className={
                  "text-2xl outline outline-1 p-2 rounded-lg duration-500"
                }
              >
                {profile.grup}
              </div>
              <div
                className={
                  "text-2xl outline outline-1 rounded-lg h-full duration-500"
                }
              >
                <textarea
                  className={
                    "h-full w-full p-2 text-xl resize-none rounded-lg focus:outline-none"
                  }
                  placeholder={"Ваша речь"}
                />
              </div>
            </div>
          </div>
          <button
            className={
              "w-full flex justify-center p-2 rounded-lg bg-green-600 hover:bg-green-700 duration-500 font-sans text-white"
            }
            onClick={() => updateAvatar()}
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};
