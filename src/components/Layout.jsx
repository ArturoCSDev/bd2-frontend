import { Link, Outlet } from "react-router-dom";

const sidebarItems = [
  {
    name: "Trazabilidad de Muestras",
    path: "/",
    icon: "📋",
  },
  {
    name: "Análisis Demorados",
    path: "/analisis-demorados",
    icon: "⏰",
  },
  {
    name: "Análisis Repetidos",
    path: "/analisis-repetidos",
    icon: "🔄",
  },
  {
    name: "Equipos Críticos",
    path: "/equipos-criticos",
    icon: "⚠️",
  },
  {
    name: "Mantenimiento Preventivo",
    path: "/mantenimiento",
    icon: "🔧",
  },
  {
    name: "Análisis por Método de Pago",
    path: "/analisis-pago",
    icon: "💰",
  },
  {
    name: "Reactivos Críticos",
    path: "/reactivos",
    icon: "🧪",
  },
  {
    name: "Análisis Retrasados Prioritarios",
    path: "/analisis-prioritarios",
    icon: "🚨",
  },
  {
    name: "Costos por Proveedor",
    path: "/costos-proveedor",
    icon: "💵",
  },
  {
    name: "Tiempos de Respuesta",
    path: "/tiempos-respuesta",
    icon: "⌛",
  },
];

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 bg-indigo-600">
          <h1 className="text-white text-xl font-bold">Lab Ceabym</h1>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
            >
              <span className="mr-3">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-4 py-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Sistema de Laboratorio
            </h2>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
