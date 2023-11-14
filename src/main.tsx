import ReactDOM from "react-dom/client";
import { App } from "./App";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_HOST;

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
