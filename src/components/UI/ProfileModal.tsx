import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { Roles } from "./VoteProfile";
import upload from "../UI/Images/upload.png";

export const ProfileModal = ({
  isVisable,
  setShowProfileUpdate,
  userData,
}: {
  isVisable: boolean;
  setShowProfileUpdate: (arg0: boolean) => void;
  userData: {
    id: number;
    firstName: string;
    secondName: string;
    thirdName: string;
    bio: string;
    email: string;
    password: string;
    profile_picture: string;
    grup: Array<string>;
    roles: Array<string>;
  };
}) => {
  const [profile, setProfile] = useState({
    id: -1,
    firstName: "",
    secondName: "",
    thirdName: "",
    bio: "",
    email: "",
    password: "",
    profile_picture: "",
    grup: [""],
    roles: [""],
  });

  const [bio, setBio] = useState({
    data: "",
    isActive: false,
  });

  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    setProfile(userData);
    setSelectedFile(undefined);
    setUrlFile("");
    setBio({ data: userData.bio, isActive: false });
  }, [isVisable, profile]);

  const [urlFile, setUrlFile] = useState("");

  if (!isVisable) return null;
  const handleClose = (e: any) => {
    if (e.target.id === "exit") {
      setShowProfileUpdate(false);
    }
  };

  function preview(event: any) {
    setSelectedFile(event.target.files[0]);
    setUrlFile(URL.createObjectURL(event.target.files[0]));
  }

  function updateAvatar() {
    axios
      .put(
        `/users/setProfilePicture/${profile.id}`,
        {
          picture: selectedFile,
          bio: bio.data ?? "",
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": `multipart/form-data`,
          },
        }
      )
      .then(({ data }) =>
        axios
          .post(
            `/auth`,
            {
              email: data.email,
              password: data.password,
            },
            {
              headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "POST",
                "X-Requested-With": "XMLHttpRequest",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Headers": "Authorization",
              },
            }
          )
          .then(({ data }) => {
            setProfile(data);
            setBio(data.bio);
            document.cookie = `token=${data.token}; max-age=86400; path=/`;

            setShowProfileUpdate(false);

            axios.post(
              `/auth/decode`,
              {
                token: `${document.cookie.split("=")[1]}`,
              },
              {
                headers: {
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "POST",
                  "X-Requested-With": "XMLHttpRequest",
                  "Access-Control-Allow-Methods": "POST",
                  "Access-Control-Allow-Headers": "Authorization",
                },
              }
            );
          })
      );
  }

  return (
    <div
      className={
        "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10"
      }
      id="exit"
      onDoubleClick={handleClose}
    >
      <div className={"w-[500px] sm:h-[70%] flex justify-center"}>
        <div
          className={
            "shadow w-full sm:h-max my-8 flex flex-col gap-4 p-4 bg-white rounded-xl"
          }
        >
          <div className={"w-full flex items-end justify-end"}>
            <TiDelete
              size={25}
              className={
                "hover:opacity-100 opacity-50 duration-500 cursor-pointer "
              }
              onClick={() => setShowProfileUpdate(false)}
            />
          </div>

          <div className={"flex flex-col gap-4 items-center"}>
            <div
              className={
                "w-64 h-64 rounded-full flex relative hover:brightness-[70%] duration-500 justify-center items-center"
              }
            >
              {urlFile ? (
                <img
                  src={urlFile}
                  className={
                    "w-64 h-64 rounded-full pointer-events-none object-cover"
                  }
                />
              ) : profile.profile_picture ? (
                <img
                  src={`https://vote-api.whywelive.me/files/getProfilePicture/${profile.profile_picture}`}
                  className={
                    "w-64 h-64 rounded-full pointer-events-none object-cover"
                  }
                />
              ) : (
                <img
                  src={`https://vote-api.whywelive.me/files/getProfilePicture/stockPicture.png`}
                  className={
                    "w-64 h-64 rounded-full pointer-events-none object-cover"
                  }
                />
              )}

              <div
                className={
                  "absolute w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 duration-700"
                }
              >
                <img
                  src={`${upload}`}
                  className={"w-24 h-24 bg-black/40 p-2 rounded-full"}
                />

                <input
                  type={"file"}
                  className={`absolute w-full h-full hover:opacity-80 duration-500 cursor-pointer`}
                  title={"Изменить фото профиля"}
                  multiple={false}
                  onChange={(event) => preview(event)}
                />
              </div>
            </div>

            <div className={"flex flex-col w-full gap-4"}>
              <div>
                <div className={"text-2xl rounded-lg duration-500"}>
                  {profile.secondName + " "}
                  {profile.firstName + " "}
                  {profile.thirdName + " "}
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
                  {`Роль: ${userData.roles
                    .map((item) => Roles[item as keyof typeof Roles])
                    .join(" ")}`}
                </div>
              </div>
              <div className={"text-2xl border h-36 rounded-lg duration-500"}>
                <textarea
                  className={
                    "h-full w-full p-2 text-lg resize-none rounded-lg focus:outline-none"
                  }
                  placeholder={"Ваша речь"}
                  onChange={(e) =>
                    setBio({ isActive: true, data: e.target.value })
                  }
                  value={bio.data ?? ""}
                />
              </div>
            </div>
          </div>
          <button
            disabled={selectedFile || bio.isActive ? false : true}
            className={
              selectedFile || bio.isActive
                ? "w-full flex justify-center p-2 rounded-lg bg-black/80 hover:bg-green-800 duration-500 font-sans text-white"
                : "w-full flex justify-center p-2 rounded-lg bg-black/80 font-sans text-white"
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
