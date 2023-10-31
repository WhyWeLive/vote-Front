import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { FaPencilAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { VoteProfile } from "./UI/VoteProfile";
import { ModalUpdateVote } from "./UI/ModalUpdateVote";
import { Elected } from "./UI/Elected";

export const VoteForm = ({
  header,
  votedPersonsId,
  voteCount,
  createdAt,
  endedAt,
  elected,
  id,
  getCounter,
  userData,
  grup,
  counter,
  extended,
}) => {
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showVoteProfile, setShowVoteProfile] = useState(false);
  const [ModalUpdate, setModalUpdateVote] = useState(false);
  const [name, setName] = useState("");
  const [elect, setElect] = useState("");
  const [votePerm, setVotePerm] = useState(true);
  const [voteFinish, setVoteFinish] = useState(false);
  const [electedData, setElectedData] = useState({});
  const [winner, setWinner] = useState(true);
  const [voteDelete, setVoteDelete] = useState(false);

  function checkvote() {
    if (!(votedPersonsId == null)) {
      if (votedPersonsId.find((item) => item == userData.id)) {
        setVotePerm(false);
      }
    }
  }

  function getWinner(id) {
    axios
      .get(`http://${import.meta.env.VITE_HOST}:3000/vote/getWinner/${id}`)
      .then(({ data }) => {
        setWinner(data);
        setVoteFinish(!!data);

        if (!data) {
          axios.put(`http://${import.meta.env.VITE_HOST}:3000/vote/${id}`, {
            endedAt: String(+endedAt + 86400),
            extended: true,
          });
        } else {
          setTimeout(
            () =>
              axios.delete(
                `http://${import.meta.env.VITE_HOST}:3000/vote/${id}`
              ),
            86400000
          );
        }
      });
  }

  function getElect(item) {
    setElect(item);
  }

  function getName(name) {
    axios
      .get(
        `http://${import.meta.env.VITE_HOST}:3000/users/getNameByEmail/${name}`
      )
      .then((response) => {
        setName(response.data);
      });
  }

  function deleteVote(idVote) {
    axios
      .delete(`http://${import.meta.env.VITE_HOST}:3000/vote/${idVote}`)
      .then(() => getCounter());
  }

  function vote() {
    axios
      .get(
        `http://${import.meta.env.VITE_HOST}:3000/vote/toVote/${id}/${
          userData.id
        }/${elect}`
      )
      .then(() => getCounter());
  }

  function giveElectedDataToFather(electedData) {
    setElectedData(electedData);
  }

  useEffect(() => {
    checkvote();

    if (endedAt * 1000 <= DateTime.now().ts) {
      getWinner(id);
    }
  }, [counter, getCounter]);

  return (
    <div>
      {ModalUpdate && (
        <ModalUpdateVote
          key={id}
          id={id}
          header={header}
          voteCount={voteCount}
          createdAt={createdAt}
          endedAt={endedAt}
          elected={elected}
          grup={grup}
          isVisable={ModalUpdate}
          setModalUpdateVote={setModalUpdateVote}
        />
      )}

      <div
        className={
          voteFinish
            ? "my-5 w-[700px] h-max border-2 rounded-lg bg-white flex flex-col  p-6"
            : votePerm
            ? "my-5 w-[700px] h-max border-2 rounded-lg bg-white flex flex-col  p-6"
            : "my-5 w-[700px] h-max border-2 rounded-lg bg-white flex flex-col p-6 opacity-60"
        }
      >
        <div className={"w-full flex justify-end items-center"}></div>
        <div className={"flex flex-row justify-between"}>
          <div className={"flex flex-col items-start"}>
            <div className={"text-2xl font-semibold "}> {header}</div>
            <div className={"font-light opacity-30"}>Голосов » {voteCount}</div>
          </div>

          <div className={"flex flex-row gap-4 items-center"}>
            {extended && !voteFinish ? (
              <div className={"font-light opacity-50 w-max"}>Продлено</div>
            ) : (
              ""
            )}

            {voteFinish ? (
              <div className={"font-light opacity-50 w-max"}>Завершено</div>
            ) : (
              <div className={"font-light opacity-50 w-max"}>
                {DateTime.fromMillis(createdAt * 1000).toFormat("dd.MM.yy")} -
                {DateTime.fromMillis(endedAt * 1000).toFormat(" dd.MM.yy")}
              </div>
            )}

            {userData.roles.find((item) => item === "Editor") ? (
              <div className={"flex flex-row items-center gap-2 "}>
                <FaPencilAlt
                  size={15}
                  className={
                    "hover:opacity-100 opacity-50 duration-500 cursor-pointer"
                  }
                  onClick={() => setModalUpdateVote(true)}
                />

                <TiDelete
                  size={23}
                  className={
                    "hover:opacity-100 opacity-50 duration-500 cursor-pointer"
                  }
                  onClick={() => setVoteDelete(true)}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <hr className={"my-2"} />

        {showVoteProfile && (
          <VoteProfile
            key={id}
            isVisable={showVoteProfile}
            setShowVoteProfile={setShowVoteProfile}
            userData={electedData}
          />
        )}

        {elected.map((item, index) => (
          <Elected
            showVoteProfile={showVoteProfile}
            voteFinish={voteFinish}
            key={index}
            setShowVoteProfile={setShowVoteProfile}
            setChecked={votePerm ? setChecked : false}
            id={id}
            item={item}
            checked={votePerm ? checked : false}
            getElect={getElect}
            giveElectedDataToFather={giveElectedDataToFather}
          />
        ))}

        <hr className={"my-4"} />

        {voteFinish ? (
          <div
            className={"font-semilight opacity-80 text-blue-500 text-center"}
          >
            В голосовании победил: {winner}
          </div>
        ) : votePerm ? (
          <div className={"flex flex-col items-center"}>
            <button
              disabled={!checked}
              className={
                checked
                  ? "rounded-lg bg-black/80 border-transparent p-2 w-64 text-base font-medium text-white font-sans hover:bg-blue-600 duration-500"
                  : "rounded-lg bg-black/60 border-transparent p-2 w-64 text-base font-medium text-white font-sans duration-500"
              }
              onClick={async () => {
                await vote();
                setSuccessfulModal(true);
                getCounter();
                getName(elect);
              }}
            >
              Проголосовать
            </button>
          </div>
        ) : (
          <div className={"font-light opacity-50 text-center"}>
            Вы уже участвуете в этом голосовании.
          </div>
        )}
      </div>
      {successfulModal ? (
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
                <img
                  src={
                    "https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
                  }
                  className={"w-24 h-24"}
                />
                <div className={"font-semibold text-[#2196f3] text-xl"}>
                  Успешно!
                </div>
                <div className={"font-base text-lg opacity-50 text-center"}>
                  {`Вы проголосовали за `}
                  <div className={"font-bold"}>{name}!</div>
                </div>
              </div>
              <button
                className={
                  "bg-black/80 rounded-xl w-full h-10 text-white font-semibold hover:bg-[#2196f3] duration-500"
                }
                onClick={() => setSuccessfulModal(false)}
              >
                Ок
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {errorModal ? (
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
                <img
                  src={"https://cdn-icons-png.flaticon.com/512/463/463612.png"}
                  className={"w-24 h-24"}
                />
                <div className={"font-semibold text-[#e04f5f] text-xl"}>
                  Ошибка!
                </div>
                <div className={"font-base text-lg opacity-50"}>
                  Что-то пошло не так, попробуйте еще раз.
                </div>
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
      ) : (
        ""
      )}

      {voteDelete ? (
        <div
          className={
            "fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10 "
          }
        >
          <div
            className={
              "bg-white rounded-lg w-max h-max flex flex-col items-center justify-center p-8"
            }
          >
            <div className={"flex flex-col gap-4"}>
              <div className={"text-xl font-semibold"}>
                Удаление голосования
              </div>
              <div className={"font text-xl"}>Хотите удалить голосование?</div>
              <div className={"flex flex-row justify-between gap-4 w-full"}>
                <button
                  className={
                    "w-[250px] p-2 bg-black/80 text-white rounded-lg hover:bg-red-500 duration-500"
                  }
                  onClick={() => deleteVote(id)}
                >
                  Да, удалить
                </button>
                <button
                  className={
                    "w-[250px] p-2 bg-black/80 rounded-lg text-white hover:bg-blue-500 duration-500"
                  }
                  onClick={() => setVoteDelete(false)}
                >
                  Нет,отменить
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
