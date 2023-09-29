import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react'
import "./styles/index.css";
import { News } from "./components/News";
import { Vote } from "./components/Vote";
import { Header } from "./components/Header";
import { Auth } from "./components/Auth";
export const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  function toAuth(authState: boolean): void {
    setIsAuth(authState);
  }
  return (
    <>
      {!isAuth ? (
        <Auth toAuth={toAuth} />
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={[
                <Header key={1} toggle={"News"} />,
                <News key={2}/>,
              ]}
            />
            <Route
              path="/vote"
              element={[<Header key={1} toggle={"Vote"}/>, <Vote key={2} />]}
            />
          </Routes>
        </Router>
      )}
    </>
  );
};
