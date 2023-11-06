import Error from "./Images/Error.png";

export const InfoModals = ({
  dateError,
  setErrorModal,
  autherror,
  inputerror,
}: {
  dateError: boolean;
  setErrorModal: (arg0: boolean) => void;
  autherror: boolean;
  inputerror: boolean;
}) => {
  return (
    <div>
      <div
        className={
          "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10 "
        }
      >
        <div
          className={
            "bg-white rounded-xl w-max h-max flex flex-col items-center justify-center p-8"
          }
        >
          <div
            className={
              "flex items-center justify-center flex-col w-auto h-full gap-8"
            }
          >
            <div className={"flex flex-col items-center gap-2 w-auto h-auto"}>
              <img src={Error} className={"w-24 h-24"} />
              <div className={"font-semibold text-[#e04f5f] text-xl"}>
                Ошибка!
              </div>

              {autherror && (
                <div className={"font-base text-lg opacity-50"}>
                  Неверный логин или пароль!
                </div>
              )}

              {dateError && (
                <div
                  className={
                    "font-base text-lg text-center sm:text-start opacity-50"
                  }
                >
                  Дата окончания не может быть раньше даты начала.
                </div>
              )}

              {inputerror && (
                <div className={"font-base text-lg opacity-50"}>
                  Заполните все поля!
                </div>
              )}
            </div>
            <button
              className={
                "bg-black/80 rounded-xl w-full h-10 text-white font-semibold hover:bg-[#e04f5f] duration-500"
              }
              onClick={() => setErrorModal(false)}
            >
              Ок
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
