import { useState } from "react";
import axios from "axios";
import { InfoModals } from "./UI/InfoModals";

export const Auth = ({ toAuth }: { toAuth: (authState: boolean) => void }) => {
  const [error, setError] = useState(false);

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
        },
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
            },
          )
          .then(({ data }) => {
            toAuth(data);
          });
      })
      .catch(() => {
        setError(true);
      });
  }
  return (
    <div className={"w-screen h-screen flex justify-center bg-gray-100"}>
      <div className="p-6 my-48 border shadow w-96 h-[33rem] rounded-lg bg-white flex items-center flex-col">
        <img
          src={"https://collegeschedule.ru/assets/logo-23babd2f.svg"}
          className={"w-16 h-16 rounded-lg my-4"}
        />

        <h1 className="text-center font-bold font-sans text-3xl my-6 text-black/80">
          Авторизация
        </h1>

        <div className={"my-8"}>
          <div className="my-5">
            <div className="mt-1 border-b border-gray-300 focus-within:border-blue-600 flex flex-row items-center duration-500">
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full mr-4 border-0 border-b border-transparent focus:ring-0 outline-none sm:text-xl "
                placeholder="Email"
              />
            </div>
          </div>

          <div className="my-10">
            <div className="mt-1 border-b border-gray-300 focus-within:border-blue-600 flex duration-500">
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
        <div className={"text-center"}>
          <button
            onClick={() => auth()}
            type="button"
            className="rounded-lg w-226 bg-black/80 border-transparent h-14 text-base font-medium text-white font-sans hover:bg-blue-600 duration-500"
          >
            Войти
          </button>

          {error ? (
            <InfoModals
              setErrorModal={setError}
              status={error}
              autherror={error}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
