import { useState, useEffect } from "react";
import axios from "axios";

export default function ConfiguracionParental() {
  const [idioma, setIdioma] = useState("es");
  const [limiteTiempo, setLimiteTiempo] = useState(30);
  const [accesibilidad, setAccesibilidad] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    axios.get("/api/users/configuracion-parental/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(res => {
        if (res.data) {
          setIdioma(res.data.idioma || "es");
          setLimiteTiempo(res.data.limite_tiempo || 30);
          setAccesibilidad(res.data.accesibilidad || false);
        }
      });
  }, []);

  const guardarConfiguracion = (e) => {
    e.preventDefault();
    axios.post("/api/users/configuracion-parental/", {
      idioma,
      limite_tiempo: limiteTiempo,
      accesibilidad
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then(() => setMensaje("Configuración guardada correctamente"))
    .catch(() => setMensaje("Error al guardar configuración"));
  };

  function renderFormulario() {
    return (
      <form onSubmit={guardarConfiguracion} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Idioma:</label>
          <select value={idioma} onChange={e => setIdioma(e.target.value)} className="w-full p-2 border rounded">
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Límite de tiempo (minutos):</label>
          <input type="number" value={limiteTiempo} onChange={e => setLimiteTiempo(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" checked={accesibilidad} onChange={e => setAccesibilidad(e.target.checked)} className="mr-2" />
          <label className="font-medium">Activar modo accesible</label>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
      </form>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">Configuración Parental</h2>
      {mensaje && <div className="text-sm text-green-600">{mensaje}</div>}
      {renderFormulario()}
    </div>
  );
}
