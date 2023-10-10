import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/index.css";
import { News } from "./components/News";
import { Vote } from "./components/Vote";
import { Header } from "./components/Header";
import { Auth } from "./components/Auth";
import { ModalCreateNews } from "./components/UI/ModalCreateNews";
import { ModalUpdateNews } from "./components/UI/ModalUpdateNews";
import { ProfileModal } from "./components/UI/ProfileModal";

export const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalProfile, setShowModalProfile] = useState(false);

  function toAuth(authState: boolean): void {
    setIsAuth(authState);
  }
  const [news, setNews] = useState({});

  function getNew(body) {
    setNews(body);
  }

  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/auth/decode",
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
      )
      .then(({ data }) => {
        toAuth(data);
      });
  }, [showModal, showModalUpdate, showModalProfile]);

  return (
    <div className="h-full overflow-x-hidden">
      {!isAuth ? (
        <Auth toAuth={toAuth} />
      ) : (
        <Router>
          <ModalCreateNews
            key={3}
            isVisable={showModal}
            setShowModal={setShowModal}
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
                  key={1}
                  toggle={"Vote"}
                  userData={isAuth}
                  setShowModal={setShowModal}
                />,
                <Vote key={2} />,
              ]}
            />
          </Routes>
        </Router>
      )}
    </div>
  );
};
