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
}) => {
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showVoteProfile, setShowVoteProfile] = useState(false);
  const [ModalUpdate, setModalUpdateVote] = useState(false);
  const [name, setName] = useState("");
  const [elect, setElect] = useState("");
  const [votePerm, setVotePerm] = useState(true);

  function checkvote() {
    if (!(votedPersonsId == null)) {
      if (votedPersonsId.find((item) => item == userData.id)) {
        setVotePerm(false);
      }
    }
  }

  function getElect(item) {
    setElect(item);
  }

  function getName(name) {
    axios
      .get(`http://localhost:3000/users/getNameByEmail/${name}`)
      .then((response) => {
        setName(response.data);
      });
  }

  function deleteVote(idVote) {
    axios
      .delete(`http://localhost:3000/vote/${idVote}`)
      .then(() => getCounter());
  }

  function vote() {
    axios
      .get(`http://localhost:3000/vote/toVote/${id}/${userData.id}/${elect}`)
      .then(() => getCounter());
  }

  useEffect(() => {
    checkvote();
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

      {showVoteProfile && (
        <VoteProfile
          key={id}
          isVisable={showVoteProfile}
          setShowVoteProfile={setShowVoteProfile}
        />
      )}

      <div
        className={
          votePerm
            ? "my-5 w-[700px] h-max border border-2 rounded-lg bg-white flex flex-col  p-6"
            : "my-5 w-[700px] h-max border border-2 rounded-lg bg-white flex flex-col p-6 opacity-60"
        }
      >
        <div className={"w-full flex justify-end"}></div>
        <div className={"flex flex-row justify-between items-center"}>
          <div className={"flex flex-col"}>
            <div className={"text-2xl font-semibold "}> {header}</div>
            <div className={"font-light opacity-30"}>Голосов » {voteCount}</div>
          </div>

          <div className={"flex flex-row gap-4 items-center"}>
            <div className={"font-light opacity-50"}>
              {DateTime.fromMillis(createdAt * 1000).toFormat("dd.MM.yy")} -
              {DateTime.fromMillis(endedAt * 1000).toFormat(" dd.MM.yy")}
            </div>

            {userData.roles.find((item) => item === "Editor1") ? (
              <div className={"flex flex-row items-center gap-2 "}>
                <FaPencilAlt
                  size={20}
                  className={
                    "hover:opacity-100 opacity-50 duration-500 cursor-pointer"
                  }
                  onClick={() => setModalUpdateVote(true)}
                />

                <TiDelete
                  size={30}
                  className={
                    "hover:opacity-100 opacity-50 duration-500 cursor-pointer"
                  }
                  onClick={() => deleteVote(id)}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <hr className={"my-2"} />

        {elected.map((item, index) => (
          <Elected
            key={index}
            setShowVoteProfile={setShowVoteProfile}
            setChecked={votePerm ? setChecked : false}
            id={id}
            item={item}
            checked={votePerm ? checked : false}
            getElect={getElect}
          />
        ))}

        <hr className={"my-4"} />

        {votePerm ? (
          <div className={"flex flex-col items-center"}>
            <button
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
    </div>
  );
};
