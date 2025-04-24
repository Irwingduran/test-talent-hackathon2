"use client"
import { useState, useEffect } from "react"
import { ArrowLeft, Upload, FileText, Loader2, CheckCircle2, AlertCircle, Wand2 } from "lucide-react"

export default function NLPClassificationPage() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [categories, setCategories] = useState([])
  const [uncategorized, setUncategorized] = useState([])

  // Simulación de procesamiento con NLP
  const processWithNLP = () => {
    setStatus('processing')
    
    // Simula una llamada API al servicio de NLP
    setTimeout(() => {
      try {
        // Esto se reemplazaría con la respuesta real de la API de NLP
        setCategories([
          { name: "Food & Dining", confidence: 92, count: 14 },
          { name: "Transportation", confidence: 88, count: 8 },
          { name: "Utilities", confidence: 95, count: 5 },
          { name: "Entertainment", confidence: 76, count: 3 }
        ])
        
        setUncategorized([
          { description: "Payment to TechSoft Inc", amount: 249.99 },
          { description: "Transfer to Alex M", amount: 150.00 }
        ])
        
        setStatus('completed')
      } catch (error) {
        setStatus('error')
      }
    }, 3000)
  }

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#4ecca6]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <button className="text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">AI Transaction Classification</h1>
        <div className="w-8"></div> {/* Spacer */}
      </header>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-t-[40px] px-6 pt-8 pb-8">
        {/* Upload Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            <Wand2 className="inline mr-2 text-[#4169e1]" size={20} />
            NLP-Powered Classification
          </h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">
            {!file ? (
              <>
                <div className="mx-auto bg-[#e8f8e8] p-3 rounded-full w-max mb-3">
                  <Upload size={24} className="text-[#4ecca6]" />
                </div>
                <p className="text-gray-600 mb-4">
                  Upload bank statements or transaction logs for AI classification
                </p>
                <label className="px-4 py-2 bg-[#4ecca6] text-white rounded-lg font-medium cursor-pointer">
                  Select File
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".csv,.xlsx,.pdf" 
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-3">
                  Our AI will analyze transaction descriptions using NLP
                </p>
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
                  onClick={() => {
                    setFile(null)
                    setStatus('idle')
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Process Button */}
        {file && status === 'idle' && (
          <button
            onClick={processWithNLP}
            className="w-full py-3 bg-[#4169e1] text-white rounded-xl font-bold mb-8 hover:bg-[#3a5fc8] transition flex items-center justify-center gap-2"
          >
            <Wand2 size={18} />
            Classify Transactions
          </button>
        )}

        {/* Processing State */}
        {status === 'processing' && (
          <div className="flex flex-col items-center justify-center py-8 mb-8">
            <Loader2 size={48} className="text-[#4169e1] animate-spin mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Analyzing Transactions</h3>
            <p className="text-gray-600 text-center max-w-md">
              Our NLP model is reading transaction descriptions and classifying them into categories.
            </p>
          </div>
        )}

        {/* Results */}
        {status === 'completed' && (
          <div className="space-y-6">
            {/* Categorized Transactions */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">AI Classification Results</h3>
                <div className="flex items-center text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  <CheckCircle2 size={14} className="mr-1" />
                  {categories.reduce((sum, cat) => sum + cat.count, 0)} transactions categorized
                </div>
              </div>

              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-800">{category.name}</span>
                        <span className="text-sm text-gray-500">{category.count} transactions</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-[#4169e1]" 
                          style={{ width: `${category.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {category.confidence}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unclassified Transactions */}
            {uncategorized.length > 0 && (
              <div className="bg-yellow-50 rounded-xl p-4">
                <div className="flex items-center mb-3">
                  <AlertCircle size={18} className="text-yellow-600 mr-2" />
                  <h3 className="font-medium text-yellow-800">Needs Review ({uncategorized.length})</h3>
                </div>
                
                <div className="space-y-3">
                  {uncategorized.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.description}</p>
                        <p className="text-xs text-gray-500">Not automatically categorized</p>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        ${item.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="mt-3 text-sm text-[#4169e1] font-medium flex items-center">
                  Manually categorize these →
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button className="py-2 bg-white border border-[#4169e1] text-[#4169e1] rounded-lg font-medium">
                Export Categories
              </button>
              <button className="py-2 bg-[#4169e1] text-white rounded-lg font-medium">
                Apply to All
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="flex flex-col items-center justify-center py-8">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Classification Failed</h3>
            <p className="text-gray-600 mb-4 text-center max-w-md">
              We couldn't process your file. Please try a different format.
            </p>
            <button
              onClick={() => {
                setFile(null)
                setStatus('idle')
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