import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  const [countConfirm, setCountConfirm] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const confirmCount = async () => {
      try {
        const url = `http://localhost:4000/api/v1/auth/confirm/${id}`;
        const { data } = await axios.get(url);

        setAlerta({
          msg: data.msg,
          error: false,
        });
        setCountConfirm(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    confirmCount();
  }, [id]);

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 text-6xl font-black capitalize">
        Confirm your Count and start creating your {""}
        <span className="text-slate-700">projects</span>
      </h1>
      <div>{msg && <Alerta alerta={alerta} />}</div>
      {countConfirm && (
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Log In
        </Link>
      )}
    </>
  );
};

export default ConfirmarCuenta;
