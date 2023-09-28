import { useState } from "react";
import axios from "axios";

export const Auth = ({ toAuth }: { toAuth: (authState: boolean) => void }) => {
  const [error, setError] = useState(true);

  const [eye, setEye] = useState(true);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function auth() {
    await axios
      .post(
        "http://localhost:3000/auth",
        {
          email,
          password,
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
        document.cookie = `token=${data.token}; max-age=86400; path=/`;

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
      });
  }

  return (
    <div className="w-screen h-screen flex justify-center bg-gray-100">
      <div className="p-6 my-48 border shadow w-96 h-128 rounded-lg bg-white flex items-center flex-col">
        <h1 className="text-center font-bold font-sans text-3xl my-6">
          Авторизация
        </h1>

        <img
          src={"https://cdn-icons-png.flaticon.com/512/3237/3237472.png"}
          className="h-16 w-16 my-5"
        />

        <div>
          <div className="my-5">
            <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full border-0 border-b border-transparent focus:ring-0 outline-none sm:text-xl"
                placeholder="Email"
              />
            </div>
          </div>

          <div className="my-10">
            <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600 flex">
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={eye ? "password" : "text"}
                className="w-full border-0 border-b border-transparent focus:ring-0 outline-none sm:text-xl"
                placeholder="Password"
              />

              <button onClick={() => setEye((prev) => !prev)}>
                <img
                  src={
                    eye
                      ? "https://cdn-icons-png.flaticon.com/512/2767/2767146.png"
                      : "https://cdn-icons-png.flaticon.com/512/709/709612.png"
                  }
                  className="h-6 w-6 outline-none opacity-50"
                />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => auth()}
          type="button"
          className="rounded-lg w-226 bg-gradient-to-b from-cyan-400 to-blue-600 border-transparent h-14 text-base font-medium text-white font-sans"
        >
          Войти
        </button>
        {!error ? (
          <h1 className="my-12 text-red-600 font-medium font-sans">
            Неверный логин или пароль!
          </h1>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
