import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import { News } from "./components/News";
import { Vote } from "./components/Vote";
import { Header } from "./components/Header";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={[<Header key={1} toggle={"News"} />, <News key={2} />]}
        />
        <Route
          path="/vote"
          element={[<Header key={1} toggle={"Vote"} />, <Vote key={2} />]}
        />
      </Routes>
    </Router>
  );
};
