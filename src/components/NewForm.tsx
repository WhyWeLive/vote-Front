import { Slide } from "./UI/Slide";

export const NewForm = () => {
  const image = 3;
  return (
    <div
      className={
        "my-5 w-300 h-auto border border-2 rounded-lg bg-white flex flex-col "
      }
    >
      <div className={"border-b-2 p-4 flex flex-row items-center"}>
        <img
          src={
            "https://i.pinimg.com/736x/d6/a2/9c/d6a29c547a97c578083cb06f90775c58.jpg"
          }
          className="h-12 w-12 rounded-3xl"
        />
        <h1 className={"font-medium text-xl ml-2 flex flex-col text-sans"}>
          11IS-173
          <h2 className={"text-xs text-gray-700 text-sans "}>Today 9:46</h2>
        </h1>
      </div>
      <div className={"text-sans font-medium px-4 w-auto"}>
        <div className={"mt-4 prose prose-xl max-w-full text-sans"}>
          <h1 className={"text-center"}>
            Сентябрь - это лучшее время, чтобы начать активно участвовать в
            жизни колледжа! 🍁
          </h1>
          <p>
            Поэтому изучай направления, подавай заявку и будет тебе счастье и
            веселье😉
          </p>
          <p>
            ✅ПОДАТЬ ЗАЯВКУ МОЖНО В 205 КАБ. ПЕДАГОГАМ-ОРГАНИЗАТОРАМ ИЛИ ЧЕРЕЗ
            КУРАТОРОВ СТАРШИХ КУРСОВ
          </p>
          <p>
            А также запоминай дату первой встречи и не забудь на нее прийти😄
          </p>
          <p>✅ Волонтёрский центр «Со-действие» </p>
          <p>
            Волонтёр – это человек с добрый сердцем, который может совершать
            добрые поступки безвозмездно. Участники ВЦ «Со-действие» точно знают
            о том, что делать добро – здорово!
          </p>
          <p>⏰Встречаемся 20 сентября в 11:55/205 кабинет</p>
        </div>
      </div>
      <div className={"px-4 py-8 m-auto h-auto w-full"}>
        {image > 4 ? (
          <img
            className={"w-full h-[600px] rounded-2xl pointer-events-none"}
            src={
              "https://i.pinimg.com/736x/1c/6c/e9/1c6ce9f0bcc34cb1af332c61ab8fff9c.jpg"
            }
          />
        ) : (
          <Slide />
        )}
      </div>
    </div>
  );
};
