import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/index.css";
import { News } from "./components/News";
import { Vote } from "./components/Vote";
import { Header } from "./components/Header";
import { Auth } from "./components/Auth";
import { Profile } from "./components/Profile";
import { ModalCreateNews } from './components/UI/ModalCreateNews'
import { ModalUpdateNews } from './components/UI/ModalUpdateNews'

export const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  function toAuth(authState: boolean): void {
    setIsAuth(authState);
  }
  const [news, setNews] = useState({})

  function getNew(body) {
    setNews(body)
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
        },
      )
      .then(({ data }) => {
        toAuth(data);
      });
  }, []);

  return (
    <div className="h-full overflow-x-hidden">
      {!isAuth ? (
        <Auth toAuth={toAuth} />
      ) : (
        <Router>
          <ModalCreateNews key={3} isVisable={showModal} setShowModal={setShowModal}/>
          <ModalUpdateNews key={4} isVisable={showModalUpdate} setShowModalUpdate={setShowModalUpdate} newsData={news} />
          <Routes >
            <Route
              path="/"
              element={[
                <Header key={1} toggle={"News"} userData={isAuth} setShowModal={setShowModal} />,
                <News key={2} userData={isAuth} setShowModalUpdate={setShowModalUpdate} getNew={getNew}/>,


              ]}
            />
            <Route

              path="/vote"
              element={[
                <Header key={1} toggle={"Vote"} userData={isAuth} setShowModal={setShowModal} />,
                <Vote key={2} />,
              ]}
            />

            <Route
              path="/profile"
              element={[
                <Header key={1} toggle={""} userData={isAuth} setShowModal={setShowModal} />,
                <Profile key={2} />,
              ]}
            />
          </Routes>
        </Router>
      )}
    </div>
  );
};
