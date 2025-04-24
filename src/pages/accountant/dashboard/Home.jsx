"use client"

import { Bell, Building, FileText, PieChart, Search, Users, Wallet } from "lucide-react"
import { useState } from "react"

export default function AccountingDashboard() {
  const [activeTab, setActiveTab] = useState("Overview")
  const [selectedClient, setSelectedClient] = useState(null)

  // Sample client data
  const clients = [
    {
      id: 1,
      name: "Acme Corp",
      status: "Compliant",
      balance: 7820,
      expenses: 3240,
      risk: "Low",
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "Bella Vista",
      status: "Pending",
      balance: 15400,
      expenses: 8765,
      risk: "Medium",
      lastActivity: "1 day ago"
    },
    {
      id: 3,
      name: "Techtronic",
      status: "Alert",
      balance: 4200,
      expenses: 5800,
      risk: "High",
      lastActivity: "3 days ago"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Accounting Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell className="cursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <span>JD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Client List Sidebar */}
        <div className="bg-white rounded-lg shadow p-4 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">My Clients ({clients.length})</h2>
            <Search className="text-gray-500" />
          </div>
          
          <div className="space-y-3">
            {clients.map(client => (
              <div 
                key={client.id}
                className={`p-3 rounded-lg cursor-pointer transition-all ${selectedClient?.id === client.id ? 'bg-emerald-100 border-l-4 border-emerald-600' : 'bg-gray-50 hover:bg-gray-100'}`}
                onClick={() => setSelectedClient(client)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{client.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      client.status === "Compliant" ? "bg-green-100 text-green-800" :
                      client.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {client.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{client.lastActivity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Dashboard Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500">Total Clients</h3>
                <Users className="text-emerald-600" />
              </div>
              <p className="text-2xl font-bold mt-2">{clients.length}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500">Active Cases</h3>
                <FileText className="text-emerald-600" />
              </div>
              <p className="text-2xl font-bold mt-2">{clients.filter(c => c.status !== "Compliant").length}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500">High Risk</h3>
                <Building className="text-emerald-600" />
              </div>
              <p className="text-2xl font-bold mt-2">{clients.filter(c => c.risk === "High").length}</p>
            </div>
          </div>

          {/* Client Detail View */}
          {selectedClient ? (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{selectedClient.name}</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-emerald-600 text-white rounded text-sm">Generate Report</button>
                  <button className="px-3 py-1 border border-emerald-600 text-emerald-600 rounded text-sm">Send Reminder</button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {["Overview", "Transactions", "Taxes", "Documents"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab
                          ? "border-emerald-600 text-emerald-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === "Overview" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="font-medium mb-4">Financial Summary</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-500 text-sm">Balance</p>
                        <p className="text-xl font-bold">${selectedClient.balance.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-500 text-sm">Expenses</p>
                        <p className="text-xl font-bold text-red-500">-${selectedClient.expenses.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Tax Compliance Status</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          selectedClient.status === "Compliant" ? "bg-green-100 text-green-800" :
                          selectedClient.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {selectedClient.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            selectedClient.status === "Compliant" ? "bg-green-500" :
                            selectedClient.status === "Pending" ? "bg-yellow-500" :
                            "bg-red-500"
                          }`} 
                          style={{ width: `${selectedClient.status === "Compliant" ? "100%" : selectedClient.status === "Pending" ? "65%" : "30%"} `}}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Risk Analysis</h3>
                    <div className="bg-gray-50 p-4 rounded-lg h-full">
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`w-3 h-3 rounded-full ${
                          selectedClient.risk === "Low" ? "bg-green-500" :
                          selectedClient.risk === "Medium" ? "bg-yellow-500" :
                          "bg-red-500"
                        }`}></div>
                        <span className="font-medium">{selectedClient.risk} Risk</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {selectedClient.risk === "Low" 
                          ? "No significant risks detected. All filings are up to date." 
                          : selectedClient.risk === "Medium" 
                            ? "Some pending filings. Review required before next deadline." 
                            : "Critical issues detected. Immediate action required."}
                      </p>
                      <button className="text-sm text-emerald-600 font-medium">View Details →</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Transactions" && (
                <div>
                  <p>Transaction history would go here</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <Wallet className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-700">Select a client to view details</h3>
              <p className="text-gray-500 mt-2">Click on any client from the list to see their financial overview</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-medium mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition">
                <FileText className="text-emerald-600 mb-1" />
                <span className="text-sm">New Filing</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition">
                <PieChart className="text-emerald-600 mb-1" />
                <span className="text-sm">Reports</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition">
                <Users className="text-emerald-600 mb-1" />
                <span className="text-sm">Add Client</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition">
                <Building className="text-emerald-600 mb-1" />
                <span className="text-sm">Bulk Actions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}