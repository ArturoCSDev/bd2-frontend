// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import TrazabilidadPage from "../pages/TrazabilidadPage";
import AnalisisDemoradosPage from "../pages/AnalisisDemoradosPage";
import AnalisisRepetidosPage from "../pages/AnalisisRepetidosPage";
import EquiposCriticosPage from "../pages/EquiposCriticosPage";
import MantenimientoPreventivoPage from "../pages/MantenimientoPreventivoPage";
import AnalisisPorPagoPage from "../pages/AnalisisPorPagoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TrazabilidadPage />,
      },
      {
        path: "/analisis-demorados",
        element: <AnalisisDemoradosPage />,
      },
      {
        path: "/analisis-repetidos",
        element: <AnalisisRepetidosPage />,
      },
      {
        path: "/equipos-criticos",
        element: <EquiposCriticosPage />,
      },
      {
        path: "/mantenimiento",
        element: <MantenimientoPreventivoPage />,
      },
      {
        path: "/analisis-pago",
        element: <AnalisisPorPagoPage />,
      },
      {
        path: "/reactivos",
        element: <div>Reactivos Críticos (Pendiente)</div>,
      },
      {
        path: "/analisis-prioritarios",
        element: <div>Análisis Retrasados Prioritarios (Pendiente)</div>,
      },
      {
        path: "/costos-proveedor",
        element: <div>Costos por Proveedor (Pendiente)</div>,
      },
      {
        path: "/tiempos-respuesta",
        element: <div>Tiempos de Respuesta (Pendiente)</div>,
      },
    ],
  },
]);
