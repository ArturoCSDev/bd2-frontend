// src/services/api.js
const API_URL = "https://bd2-backend.vercel.app/api/lab";

export const labServices = {
  // 1. Trazabilidad de muestras
  getTrazabilidad: async (idMuestra) => {
    try {
      const response = await fetch(`${API_URL}/trazabilidad/${idMuestra}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching trazabilidad:", error);
      throw error;
    }
  },

  // 2. Análisis demorados
  getAnalisisDemorados: async () => {
    try {
      const response = await fetch(`${API_URL}/analisis-demorados`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching análisis demorados:", error);
      throw error;
    }
  },

  // 3. Análisis repetidos
  getAnalisisRepetidos: async (fechaInicio, fechaFin) => {
    try {
      const response = await fetch(
        `${API_URL}/analisis-repetidos?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching análisis repetidos:", error);
      throw error;
    }
  },

  // 4. Equipos críticos
  getEquiposCriticos: async (fechaInicio, fechaFin) => {
    try {
      const url =
        fechaInicio && fechaFin
          ? `${API_URL}/equipos-criticos?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
          : `${API_URL}/equipos-criticos`;
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("Error fetching equipos críticos:", error);
      throw error;
    }
  },

  // 5. Mantenimiento preventivo
  getMantenimientoPreventivo: async (diasRevision = 90) => {
    try {
      const response = await fetch(
        `${API_URL}/mantenimiento-preventivo?diasRevision=${diasRevision}`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching mantenimiento preventivo:", error);
      throw error;
    }
  },

  // 6. Análisis por método de pago
  getAnalisisPorMetodoPago: async (mes, anio) => {
    try {
      const response = await fetch(
        `${API_URL}/analisis-por-pago?mes=${mes}&anio=${anio}`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching análisis por método de pago:", error);
      throw error;
    }
  },

  // 7. Reactivos críticos
  getReactivosCriticos: async (stockMinimo = 10) => {
    try {
      const response = await fetch(
        `${API_URL}/reactivos-criticos?stockMinimo=${stockMinimo}`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching reactivos críticos:", error);
      throw error;
    }
  },

  // 8. Análisis retrasados prioritarios
  getAnalisisRetrasadosPrioritarios: async () => {
    try {
      const response = await fetch(`${API_URL}/analisis-retrasados`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching análisis retrasados prioritarios:", error);
      throw error;
    }
  },

  // 9. Costos por proveedor
  getCostosProveedor: async (anio = new Date().getFullYear()) => {
    try {
      const response = await fetch(`${API_URL}/costos-proveedor?anio=${anio}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching costos proveedor:", error);
      throw error;
    }
  },

  // 10. Tiempos de respuesta
  getTiemposRespuesta: async (anio = new Date().getFullYear()) => {
    try {
      const response = await fetch(`${API_URL}/tiempos-respuesta?anio=${anio}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching tiempos de respuesta:", error);
      throw error;
    }
  },
};
