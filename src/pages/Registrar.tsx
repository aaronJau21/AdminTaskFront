import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import axios from "axios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeat_password] = useState("");
  const [alert, setAlert] = useState({
    msg: "",
    error: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if ([nombre, email, password, repeat_password].includes("")) {
      setAlert({
        msg: "All fields are requerid",
        error: true,
      });

      return;
    }
    if (password !== repeat_password) {
      setAlert({
        msg: "passwords are not the same",
        error: true,
      });

      return;
    }

    if (password.length <= 6) {
      setAlert({
        msg: "The password is very short, minimun 6 characteres",
        error: true,
      });

      return;
    }

    setAlert({
      msg: "",
      error: false,
    });

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/auth/create`,
        { nombre, email, password }
      );
      setAlert({
        msg: data.msg,
        error: false,
      });

      setNombre("");
      setEmail("");
      setPassword("");
      setRepeat_password("");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert as { msg: string };

  return (
    <>
      <h1 className="text-sky-600 text-6xl font-black capitalize">
        Create your acount and manage your {""}
        <span className="text-slate-700">projects</span>
      </h1>
      {msg && <Alerta alerta={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="name"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="repeat_password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repeat Password
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            id="repeat_password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
            value={repeat_password}
            onChange={(e) => setRepeat_password(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Log in"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Log In
        </Link>

        <Link
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          I forgot my password
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
