import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/index.css";
import { News } from "./components/News";
import { Vote } from "./components/Vote";
import { Header } from "./components/Header";
import { Auth } from "./components/Auth";
import axios from "axios";

export const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  function toAuth(authState: boolean): void {
    setIsAuth(authState);
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
  }, []);

  return (
    <div className="h-full overflow-x-hidden">
      {!isAuth ? (
        <Auth toAuth={toAuth} />
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={[
                <Header key={1} toggle={"News"} userData={isAuth} />,
                <News key={2} />,
              ]}
            />
            <Route
              path="/vote"
              element={[
                <Header key={1} toggle={"Vote"} userData={isAuth} />,
                <Vote key={2} />,
              ]}
            />
          </Routes>
        </Router>
      )}
    </div>
  );
};
