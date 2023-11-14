import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { News } from "./components/News";
import { Vote } from "./components/Vote";
import { Header, userInterface } from "./components/Header";
import { Auth } from "./components/Auth";
import { ModalCreateNews } from "./components/UI/ModalCreateNews";
import { ModalUpdateNews } from "./components/UI/ModalUpdateNews";
import { ModalCreateVote } from "./components/UI/ModalCreateVote";
import { ProfileModal } from "./components/UI/ProfileModal";
import "./styles/index.css";

export const App = () => {
  const user: userInterface = {
    id: -1,
    firstName: "",
    secondName: "",
    thirdName: "",
    email: "",
    password: "",
    profile_picture: "",
    grup: [""],
    roles: [""],
    bio: "",
  };
  const [isAuth, setIsAuth] = useState<userInterface>();
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalProfile, setShowModalProfile] = useState(false);
  const [showModalVote, setShowModalVote] = useState(false);

  function toAuth(authState: userInterface): void {
    setIsAuth(authState);
  }

  const [news, setNews] = useState({
    photos: "",
    id: -1,
    content: "",
    header: "",
    grup: "",
  });

  function getNew(body: any) {
    setNews(body);
  }

  useEffect(() => {
    axios
      .post(
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
        },
      )
      .then(({ data }) => {
        if (typeof data == "boolean") {
          toAuth(user);
        } else {
          toAuth(data);
        }
      });
  }, [showModal, showModalUpdate, showModalProfile]);

  return (
    <div className="h-full overflow-x-hidden overflow-y-scroll">
      {isAuth ? (
        <Router>
          <ModalCreateNews
            key={3}
            isVisable={showModal}
            setShowModal={setShowModal}
          />
          <ModalCreateVote
            key={6}
            isVisable={showModalVote}
            setShowModalVote={setShowModalVote}
          />
          <ModalUpdateNews
            key={4}
            isVisable={showModalUpdate}
            setShowModalUpdate={setShowModalUpdate}
            newsData={news}
          />
          <ProfileModal
            key={5}
            userData={isAuth}
            isVisable={showModalProfile}
            setShowProfileUpdate={setShowModalProfile}
          />

          <Routes>
            <Route
              path="/"
              element={[
                <Header
                  key={1}
                  toggle={"News"}
                  userData={isAuth}
                  setShowModal={setShowModal}
                  setShowModalProfile={setShowModalProfile}
                  setShowModalVote={setShowModalVote}
                />,

                <News
                  key={2}
                  userData={isAuth}
                  setShowModalUpdate={setShowModalUpdate}
                  getNew={getNew}
                />,
              ]}
            />
            <Route
              path="/vote"
              element={[
                <Header
                  key={7}
                  toggle={"Vote"}
                  userData={isAuth}
                  setShowModal={setShowModal}
                  setShowModalProfile={setShowModalProfile}
                  setShowModalVote={setShowModalVote}
                />,
                <Vote key={8} userData={isAuth} />,
              ]}
            />
          </Routes>
        </Router>
      ) : (
        <Auth toAuth={toAuth} />
      )}
    </div>
  );
};
