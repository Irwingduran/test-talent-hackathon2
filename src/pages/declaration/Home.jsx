"use client"
import { useState } from "react"
import { ArrowLeft, Download, CheckCircle2, FileText, Smartphone } from "lucide-react"

export default function TaxDeclarationPage() {
    const [declarationStatus, setDeclarationStatus] = useState('pending')
  const [smsSent, setSmsSent] = useState(false)

  const generateDeclaration = () => {
    // Simulate processing delay
    setTimeout(() => {
      setDeclarationStatus('ready')
    }, 2000)
  }

  const downloadDeclaration = () => {
    // Simulate download
    setDeclarationStatus('downloaded')
    // In a real app, this would trigger actual file download
    const link = document.createElement('a')
    link.href = '/sample-tax-declaration.pdf'
    link.download = 'tax-declaration-2024.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const sendSmsNotification = () => {
    // Simulate SMS sending
    setTimeout(() => {
      setSmsSent(true)
      setDeclarationStatus('notified')
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#4ecca6]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <button className="text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Tax Declaration</h1>
        <div className="w-8"></div> {/* Spacer */}
      </header>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-t-[40px] px-6 pt-8 pb-8">
        {/* Quick Analysis Section */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Analysis</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-500 text-sm">Revenue Last Week</p>
              <p className="text-2xl font-bold">$4,000.00</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Food Last Week</p>
              <p className="text-2xl font-bold text-[#4169e1]">-$100.00</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-500 text-sm mb-2">April Expenses</p>
            <div className="h-32 bg-gradient-to-t from-[#4169e1] to-[#8cb3ff] rounded-lg flex items-end p-2">
              <div className="flex justify-between w-full">
                <div className="h-20 bg-white w-4 rounded-t"></div>
                <div className="h-16 bg-white w-4 rounded-t"></div>
                <div className="h-24 bg-white w-4 rounded-t"></div>
                <div className="h-8 bg-white w-4 rounded-t"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1st Week</span>
              <span>2nd Week</span>
              <span>3rd Week</span>
              <span>4th Week</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Recent Transactions</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Salary</p>
                <p className="text-sm text-gray-500">18:27 - April 30</p>
              </div>
              <p className="font-bold">$4,000.00</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Groceries</p>
                <p className="text-sm text-gray-500">17:00 - April 24</p>
              </div>
              <p className="font-bold text-[#4169e1]">-$100.00</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Rent</p>
                <p className="text-sm text-gray-500">8:30 - April 15</p>
              </div>
              <p className="font-bold text-[#4169e1]">-$674.40</p>
            </div>
          </div>
        </div>

        {/* Tax Declaration Section */}
        <div className="bg-[#e8f8e8] rounded-xl p-4 border border-[#4ecca6]">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <FileText className="mr-2 text-[#4ecca6]" size={20} />
            Tax Declaration Status
          </h3>

          {declarationStatus === 'pending' && (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">Your tax declaration hasn't been generated yet</p>
              <button
                onClick={generateDeclaration}
                className="w-full py-3 bg-[#4169e1] text-white rounded-lg font-bold"
              >
                Generate Declaration
              </button>
            </div>
          )}

          {declarationStatus === 'ready' && (
            <div className="space-y-4">
              <div className="flex items-center bg-white p-3 rounded-lg">
                <CheckCircle2 className="text-green-500 mr-2" />
                <p className="font-medium">Declaration ready!</p>
              </div>
              <button
                onClick={downloadDeclaration}
                className="w-full py-3 bg-[#4169e1] text-white rounded-lg font-bold flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download PDF
              </button>
            </div>
          )}

          {declarationStatus === 'downloaded' && (
            <div className="space-y-4">
              <div className="flex items-center bg-white p-3 rounded-lg">
                <CheckCircle2 className="text-green-500 mr-2" />
                <p className="font-medium">Declaration downloaded</p>
              </div>
              
              {!smsSent ? (
                <button
                  onClick={sendSmsNotification}
                  className="w-full py-3 bg-[#4ecca6] text-white rounded-lg font-bold flex items-center justify-center gap-2"
                >
                  <Smartphone size={18} />
                  Notify Client via SMS
                </button>
              ) : (
                <div className="flex items-center bg-white p-3 rounded-lg">
                  <CheckCircle2 className="text-green-500 mr-2" />
                  <p className="font-medium">SMS notification sent!</p>
                </div>
              )}
            </div>
          )}

          {declarationStatus === 'notified' && (
            <div className="space-y-4">
              <div className="flex items-center bg-white p-3 rounded-lg">
                <CheckCircle2 className="text-green-500 mr-2" />
                <p className="font-medium">Client notified via SMS</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                <p>Sample SMS content:</p>
                <p className="font-medium mt-1">"Your tax declaration is ready! View at: taxflow.example.com/d/12345"</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}