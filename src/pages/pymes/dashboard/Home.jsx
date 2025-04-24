"use client";
import { UploadCloud, FileText, PieChart, Settings, User, Bell, FileSpreadsheet, Search, FileDigit } from "lucide-react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function FiscalDashboard() {
  const [activeTab, setActiveTab] = useState("facturas");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
    // Aquí iría la lógica para subir a AWS S3/Textract
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/xml": [".xml"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/pdf": [".pdf"],
    },
  });

  const simulateAnalysis = () => {
    setProcessing(true);
    // Simulación de análisis con AWS Textract/SageMaker
    setTimeout(() => {
      setAnalysisResults({
        totalFacturas: 12,
        errores: 2,
        deduccionesPosibles: 15420,
        alertasSAT: 1,
        categorizacion: {
          gastos: 45000,
          ingresos: 78000,
          impuestos: 12300,
        },
      });
      setProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-emerald-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileDigit className="h-8 w-8" />
            <h1 className="text-xl font-bold">Inteligencia Fiscal Aumentada</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-emerald-700">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-emerald-800 flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white rounded-lg shadow p-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("facturas")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                activeTab === "facturas" ? "bg-emerald-100 text-emerald-700" : "hover:bg-gray-100"
              }`}
            >
              <UploadCloud className="h-5 w-5" />
              <span>Carga de documentos</span>
            </button>
            <button
              onClick={() => setActiveTab("analisis")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                activeTab === "analisis" ? "bg-emerald-100 text-emerald-700" : "hover:bg-gray-100"
              }`}
            >
              <PieChart className="h-5 w-5" />
              <span>Análisis fiscal</span>
            </button>
            <button
              onClick={() => setActiveTab("reportes")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                activeTab === "reportes" ? "bg-emerald-100 text-emerald-700" : "hover:bg-gray-100"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Reportes SAT</span>
            </button>
            <button
              onClick={() => setActiveTab("config")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                activeTab === "config" ? "bg-emerald-100 text-emerald-700" : "hover:bg-gray-100"
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Configuración</span>
            </button>
          </nav>
        </aside>

        {/* Main Panel */}
        <div className="md:col-span-3 space-y-6">
          {activeTab === "facturas" && (
            <section className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Carga de documentos fiscales</h2>
                <p className="text-gray-600">
                  Sube tus facturas XML, estados financieros en Excel o recibos en PDF
                </p>
              </div>
              <div {...getRootProps()} className="p-8 border-b">
                <input {...getInputProps()} />
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center ${
                    isDragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
                  }`}
                >
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {isDragActive ? "Suelta los archivos aquí" : "Arrastra y suelta archivos aquí"}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">Formatos soportados: XML (CFDI), XLSX, PDF</p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
                  >
                    Seleccionar archivos
                  </button>
                </div>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Archivos cargados</h3>
                  <ul className="border rounded-lg divide-y">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <span className="text-sm font-medium">{file.name}</span>
                          <span className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-800">
                          Pendiente
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={simulateAnalysis}
                      disabled={processing}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processing ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Procesando...
                        </>
                      ) : (
                        "Analizar documentos"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}
          {activeTab === "analisis" && analysisResults && (
            <section className="space-y-6">
              {/* Resumen rápido */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen fiscal</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Facturas procesadas</h3>
                    <p className="text-2xl font-bold text-emerald-600">{analysisResults.totalFacturas}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Errores detectados</h3>
                    <p className="text-2xl font-bold text-red-600">{analysisResults.errores}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Deducciones posibles</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      ${analysisResults.deduccionesPosibles.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Alertas SAT</h3>
                    <p className="text-2xl font-bold text-yellow-600">{analysisResults.alertasSAT}</p>
                  </div>
                </div>
              </div>
              {/* Categorización */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Categorización de gastos</h2>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-gray-300" />
                  {/* Aquí iría un gráfico real con Chart.js o similar */}
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Gastos</h3>
                    <p className="text-lg font-semibold text-red-600">
                      -${analysisResults.categorizacion.gastos.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Ingresos</h3>
                    <p className="text-lg font-semibold text-emerald-600">
                      ${analysisResults.categorizacion.ingresos.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Impuestos</h3>
                    <p className="text-lg font-semibold text-blue-600">
                      ${analysisResults.categorizacion.impuestos.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              {/* Recomendaciones */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recomendaciones de IA</h2>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-emerald-500 bg-emerald-50">
                    <h3 className="font-medium text-emerald-800">Optimización fiscal</h3>
                    <p className="text-sm text-gray-600">
                      Puedes deducir $15,420 MXN adicionales si categorizas correctamente tus gastos de oficina.
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-red-500 bg-red-50">
                    <h3 className="font-medium text-red-800">Alerta SAT</h3>
                    <p className="text-sm text-gray-600">
                      La factura F-3421 del proveedor 'TecnoSuministros' presenta inconsistencias en su RFC.
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h3 className="font-medium text-blue-800">Flujo de efectivo</h3>
                    <p className="text-sm text-gray-600">
                      Tienes 3 facturas pendientes de cobro por $42,300 MXN que afectan tu liquidez.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
          {activeTab === "reportes" && (
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Reportes para el SAT</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium">Declaración Mensual  (Abril 2023)</span>
                    </div>
                    <button className="text-sm px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                      Generar
                    </button>
                  </div>
                </div>
                <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium">Declaración  (Abril 2024)</span>
                    </div>
                    <a href="/process">
                    <button className="text-sm px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                      Generar
                    </button>
                    </a>
                  </div>
                </div>
                <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium">Estado de Situación Financiera</span>
                    </div>
                    <button className="text-sm px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                      Generar
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}