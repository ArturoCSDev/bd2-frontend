// src/pages/TrazabilidadPage.jsx
import { useState } from "react";
import { labServices } from "../services/api";

const TrazabilidadPage = () => {
  const [idMuestra, setIdMuestra] = useState("");
  const [trazabilidad, setTrazabilidad] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await labServices.getTrazabilidad(idMuestra);
      if (response.success) {
        setTrazabilidad(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Error al obtener la trazabilidad");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Trazabilidad de Muestras
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="idMuestra"
              className="block text-sm font-medium text-gray-700"
            >
              ID de Muestra
            </label>
            <input
              type="number"
              id="idMuestra"
              value={idMuestra}
              onChange={(e) => setIdMuestra(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingrese el ID de la muestra"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Buscar"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {trazabilidad && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Resultados de la Trazabilidad
            </h3>
            <div className="bg-gray-50 p-6 rounded-md">
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Información del Paciente */}
                <div className="col-span-2">
                  <h4 className="text-md font-semibold text-indigo-600 mb-4">
                    Información del Paciente
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">DNI</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {trazabilidad.dni_paciente}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Nombre Completo
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {`${trazabilidad.nombre_paciente} ${trazabilidad.apellido_paterno} ${trazabilidad.apellido_materno}`}
                      </dd>
                    </div>
                  </div>
                </div>

                {/* Información de la Muestra */}
                <div className="col-span-2">
                  <h4 className="text-md font-semibold text-indigo-600 mb-4">
                    Detalles de la Muestra
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Tipo de Muestra
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {trazabilidad.tipo_muestra}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Fecha de Recepción
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formatDate(trazabilidad.fecha_recepcion)}
                      </dd>
                    </div>
                  </div>
                </div>

                {/* Información del Análisis */}
                <div className="col-span-2">
                  <h4 className="text-md font-semibold text-indigo-600 mb-4">
                    Información del Análisis
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Tipo de Análisis
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {trazabilidad.nombre_analisis}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Precio
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        S/. {trazabilidad.precio_analisis}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Resultados
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {trazabilidad.resultados}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Fecha de Entrega
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formatDate(trazabilidad.fecha_entrega)}
                      </dd>
                    </div>
                  </div>
                </div>

                {/* Información del Personal */}
                <div className="col-span-2">
                  <h4 className="text-md font-semibold text-indigo-600 mb-4">
                    Personal Asignado
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Nombre del Personal
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {`${trazabilidad.nombre_personal} ${trazabilidad.apellido_personal}`}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Especialización
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {trazabilidad.especializacion}
                      </dd>
                    </div>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrazabilidadPage;
