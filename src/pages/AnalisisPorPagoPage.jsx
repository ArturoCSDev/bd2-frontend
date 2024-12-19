// src/pages/AnalisisPorPagoPage.jsx
import { useState, useEffect } from "react";
import { labServices } from "../services/api";

const AnalisisPorPagoPage = () => {
  const [analisisPorPago, setAnalisisPorPago] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchAnalisisPorPago = async () => {
      try {
        setLoading(true);
        const response = await labServices.getAnalisisPorMetodoPago(mes, anio);
        if (response.success) {
          setAnalisisPorPago(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Error al cargar los análisis por método de pago");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalisisPorPago();
  }, [mes, anio]);

  const handleMesChange = (e) => {
    setMes(Number(e.target.value));
  };

  const handleAnioChange = (e) => {
    setAnio(Number(e.target.value));
  };

  const getPaymentMethodColor = (metodo) => {
    switch (metodo) {
      case "Efectivo":
        return "bg-green-100 text-green-800";
      case "Tarjeta":
        return "bg-blue-100 text-blue-800";
      case "Plin":
        return "bg-purple-100 text-purple-800";
      case "Yape":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">
          Cargando análisis por método de pago...
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
            Análisis por Método de Pago
          </h2>
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="mes" className="text-sm text-gray-600 mr-2">
                Mes:
              </label>
              <select
                id="mes"
                value={mes}
                onChange={handleMesChange}
                className="form-select inline-block w-24 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {[...Array(12)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {new Date(0, index).toLocaleString("es-ES", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="anio" className="text-sm text-gray-600 mr-2">
                Año:
              </label>
              <select
                id="anio"
                value={anio}
                onChange={handleAnioChange}
                className="form-select inline-block w-24 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {[...Array(5)].map((_, index) => {
                  const year = new Date().getFullYear() - 2 + index;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {analisisPorPago.length === 0 ? (
          <div className="bg-yellow-50 p-4 rounded-md text-yellow-700">
            No hay análisis registrados para el período seleccionado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Método de Pago
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad de Análisis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total de Ingresos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Porcentaje del Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analisisPorPago.map((item) => (
                  <tr key={item.metodo_pago} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentMethodColor(
                          item.metodo_pago
                        )}`}
                      >
                        {item.metodo_pago}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.cantidad_analisis}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      S/. {item.total_ingresos.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${item.porcentaje_total}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {item.porcentaje_total.toFixed(2)}%
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

export default AnalisisPorPagoPage;
