export const Profile = () => {
  return (
    <div className="w-screen h-full bg-gray-200 flex justify-center">
      <div
        className={
          "bg-white shadow rounded-lg h-min w-1/2 my-5 p-4 flex flex-col"
        }
      >
        <div className={"flex flex-row my-2"}>
          <div>
            <img
              src={
                "https://i.pinimg.com/736x/d6/a2/9c/d6a29c547a97c578083cb06f90775c58.jpg"
              }
              className="h-auto w-[256px] rounded-lg pointer-events-none"
            />
          </div>
          <div className={"flex flex-col w-full"}>
            <div
              className={
                "outline outline-black/80 ml-2 p-2 outline-1 rounded-lg flex flex-row items-center content-start"
              }
            >
              <h2 className={"text-black/40 text-lg text-sans"}>ФИО:</h2>
              <h1 className={"ml-2 font-semibold text-lg text-sans"}>
                Смирнов Владислав Андреевич
              </h1>
            </div>

            <div
              className={
                "outline outline-black/80 ml-2 p-2 outline-1 rounded-lg flex flex-row items-center my-auto"
              }
            >
              <h2 className={"text-black/40 text-lg text-sans"}>
                Образовательное учреждение:
              </h2>
              <h1 className={"ml-2 font-semibold text-lg text-sans"}>НКЭиВТ</h1>
            </div>

            <div
              className={
                "outline outline-black/80 ml-2 p-2 outline-1 rounded-lg flex flex-row items-center"
              }
            >
              <h2 className={"text-black/40 text-lg text-sans"}>Группа:</h2>
              <h1 className={"ml-2 font-semibold text-lg text-sans"}>
                11ИС-173
              </h1>
            </div>
          </div>
        </div>
        <div>
          <textarea
            autoFocus={true}
            className={
              "outline p-2 my-2 outline-1 rounded-lg w-full h-full resize-none outline-black/80"
            }
            placeholder={"Немного о себе..."}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
