import { useEffect, useState } from "react";
import axios from "axios";

export default function BienvenidaDashboard() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const res = await axios.get("/api/users/me/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsuario(res.data);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuario();
  }, []);

  if (cargando) return <p className="text-center text-gray-500">Cargando...</p>;

  return (
    <div className="text-center mt-6">
      <h2 className="text-2xl font-bold text-blue-700">
        ¡Hola, {usuario?.username}!
      </h2>
      {usuario?.es_padre && (
        <p className="text-sm text-gray-600 mt-2">Perfil de padre</p>
      )}
      {usuario?.es_infantil && (
        <p className="text-sm text-gray-600 mt-2">Perfil infantil</p>
      )}
    </div>
  );
}
