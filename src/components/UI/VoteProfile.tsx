import { TiDelete } from "react-icons/ti";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

export enum Roles {
  Editor = "Редактор",
  User = "Пользователь",
  Student = "Студент",
  Starosta = "Староста",
}

export const VoteProfile = ({
  isVisable,
  setShowVoteProfile,
  userData,
}: {
  isVisable: boolean;
  setShowVoteProfile: (arg0: boolean) => void;
  userData: any;
}) => {
  if (!isVisable) return null;
  const handleClose = (e: any) => {
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
      onDoubleClick={handleClose}
    >
      <div className={"w-[500px] h-[70%] flex justify-center"}>
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
                "w-64 h-64 rounded-full flex relative duration-500 justify-center items-center"
              }
            >
              {userData.profile_picture ? (
                <img
                  src={`https://vote-api.whywelive.me/files/getProfilePicture/${userData.profile_picture}`}
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
            </div>

            <div className={"flex flex-col w-full gap-2"}>
              <div>
                <div className={"text-2xl rounded-lg duration-500 text-start"}>
                  {userData.firstName + " "}
                  {userData.secondName + " "}
                  {userData.thirdName + " "}
                </div>
                <div
                  className={
                    "text-lg opacity-50 font-light rounded-lg duration-500 text-start"
                  }
                >
                  {`Группа: ${userData.grup}`}
                </div>
                <div
                  className={
                    "text-lg opacity-50 font-light rounded-lg duration-500 text-start"
                  }
                >
                  {`Роль: ${userData.roles
                    .map((item: string) => Roles[item as keyof typeof Roles])
                    .join(" ")}`}
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
                    {userData.bio}
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
