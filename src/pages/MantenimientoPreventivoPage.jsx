// src/pages/MantenimientoPreventivoPage.jsx
import { useState, useEffect } from "react";
import { labServices } from "../services/api";

const MantenimientoPreventivoPage = () => {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [diasRevision, setDiasRevision] = useState(60);

  useEffect(() => {
    const fetchMantenimientoPreventivo = async () => {
      try {
        setLoading(true);
        const response = await labServices.getMantenimientoPreventivo(
          diasRevision
        );
        if (response.success) {
          setEquipos(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Error al cargar el mantenimiento preventivo");
      } finally {
        setLoading(false);
      }
    };

    fetchMantenimientoPreventivo();
  }, [diasRevision]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDiasRevisionChange = (e) => {
    setDiasRevision(Number(e.target.value));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">
          Cargando mantenimiento preventivo...
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-50 p-4 rounded-md text-red-700">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Mantenimiento Preventivo
          </h2>
          <div className="flex items-center space-x-4">
            <label htmlFor="diasRevision" className="text-sm text-gray-600">
              Revisar equipos cada:
            </label>
            <select
              id="diasRevision"
              value={diasRevision}
              onChange={handleDiasRevisionChange}
              className="form-select block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value={30}>30 días</option>
              <option value={60}>60 días</option>
              <option value={90}>90 días</option>
              <option value={120}>120 días</option>
            </select>
          </div>
        </div>

        {equipos.length === 0 ? (
          <div className="bg-yellow-50 p-4 rounded-md text-yellow-700">
            No hay equipos que requieran mantenimiento preventivo.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Equipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modelo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo de Equipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Último Mantenimiento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Días desde Mantenimiento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Análisis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipos.map((equipo) => (
                  <tr key={equipo.id_equipo} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{equipo.id_equipo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {equipo.nombre_modelo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {equipo.tipo_equipo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(equipo.ultimo_mantenimiento)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          equipo.dias_desde_mantenimiento > 90
                            ? "bg-red-100 text-red-800"
                            : equipo.dias_desde_mantenimiento > 60
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {equipo.dias_desde_mantenimiento} días
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {equipo.total_analisis_realizados}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {equipo.estado_actual}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MantenimientoPreventivoPage;
