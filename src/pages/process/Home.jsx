"use client"
import { useState, useCallback } from "react"
import { ArrowLeft, Upload, FileText, PieChart, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

export default function AITransactionProcessor() {
  const [file, setFile] = useState(null)
  const [analysisStatus, setAnalysisStatus] = useState('idle')
  const [insights, setInsights] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const processFile = useCallback(() => {
    if (!file) return

    setAnalysisStatus('processing')

    setTimeout(() => {
      try {
        setInsights({
          totalTransactions: 42,
          expenseCategories: [
            { category: "Office Supplies", amount: 1200 },
            { category: "Travel", amount: 850 },
            { category: "Utilities", amount: 430 },
            { category: "Meals", amount: 320 }
          ],
          potentialIssues: [
            "3 duplicate transactions detected",
            "Unusual expense pattern in Travel category"
          ],
          taxDeductions: 2150
        })
        setAnalysisStatus('completed')
      } catch (error) {
        setAnalysisStatus('error')
      }
    }, 2500)
  }, [file])

  return (
    <div className="flex flex-col min-h-screen bg-[#4ecca6]">
      <header className="flex items-center justify-between px-6 py-4">
        <button className="text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">AI Transaction Analysis</h1>
        <div className="w-8"></div>
      </header>

      <div className="flex-1 bg-white rounded-t-[40px] px-6 pt-8 pb-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Financial Data</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">
            {!file ? (
              <>
                <div className="mx-auto bg-[#e8f8e8] p-3 rounded-full w-max mb-3">
                  <Upload size={24} className="text-[#4ecca6]" />
                </div>
                <p className="text-gray-600 mb-4">Drag & drop your file here or</p>
                <label className="px-4 py-2 bg-[#4ecca6] text-white rounded-lg font-medium cursor-pointer">
                  Browse Files
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".csv,.xlsx,.pdf,.xml" 
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-3">Supported formats: CSV, Excel, PDF, XML</p>
              </>
            ) : (
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FileText size={20} className="text-[#4ecca6] mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button 
                  onClick={() => setFile(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {file && analysisStatus === 'idle' && (
          <button
            onClick={processFile}
            className="w-full py-3 bg-[#4169e1] text-white rounded-xl font-bold mb-8 hover:bg-[#3a5fc8] transition"
          >
            Analyze with AI
          </button>
        )}

        {analysisStatus === 'processing' && (
          <div className="flex flex-col items-center justify-center py-8 mb-8">
            <Loader2 size={48} className="text-[#4169e1] animate-spin mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Analyzing Transactions</h3>
            <p className="text-gray-600 text-center max-w-md">
              Our AI is processing your financial data to identify patterns, categorize expenses, and detect anomalies.
            </p>
          </div>
        )}

        {analysisStatus === 'completed' && insights && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">AI Insights</h2>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Transaction Summary</h3>
                <div className="flex items-center text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  <CheckCircle2 size={14} className="mr-1" />
                  Analysis Complete
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Transactions</p>
                  <p className="font-bold text-lg">{insights.totalTransactions}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Potential Tax Deductions</p>
                  <p className="font-bold text-lg">${insights.taxDeductions.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-medium mb-3">Expense Breakdown</h3>
              <div className="space-y-3">
                {insights.expenseCategories.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.category}</span>
                    <span className="font-medium text-[#4169e1]">${item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {insights.potentialIssues.length > 0 && (
              <div className="bg-red-50 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <AlertCircle size={18} className="text-red-500 mr-2" />
                  <h3 className="font-medium text-red-800">Potential Issues</h3>
                </div>
                <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                  {insights.potentialIssues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-4">
                <a href="/declaration">
                <div>
              <button className="py-2 bg-white border border-[#4169e1] text-[#4169e1] rounded-lg font-medium">
                Export Report
              </button>
              </div>

              </a>
              <button className="py-2 bg-[#4169e1] text-white rounded-lg font-medium">
                View Detailed Analysis
              </button>
            </div>
          </div>
        )}

        {analysisStatus === 'error' && (
          <div className="flex flex-col items-center justify-center py-8">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Analysis Failed</h3>
            <p className="text-gray-600 mb-4 text-center max-w-md">
              We couldn't process your file. Please try again with a different file.
            </p>
            <button
              onClick={() => {
                setFile(null)
                setAnalysisStatus('idle')
              }}
              className="px-4 py-2 bg-[#4169e1] text-white rounded-lg font-medium"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
