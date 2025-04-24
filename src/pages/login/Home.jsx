import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Facebook } from 'lucide-react'
// Asegúrate de que Button esté bien definido o reemplázalo con <button>
import { Button } from "../../components/ui/button"

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please email y password")
      return
    }

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (email === "user@example.com" && password === "password") {
        navigate("/pyme/dashboard")
      } else {
        setError("Error in credentials")
      }
    } catch (err) {
      console.error(err)
      setError("Ocurrió un error durante el login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[#4ecca6] pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome</h1>
      </div>

      <div className="relative flex-1 bg-white">
        <div className="absolute top-0 left-0 right-0 h-16 bg-white rounded-t-[50%] transform translate-y-[-8px]" />

        <div className="flex flex-col items-center px-8 pt-12 pb-8">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-full text-center">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-gray-800 font-medium">
                Email
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="w-full px-4 py-3 rounded-full bg-[#e8f8e8] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4ecca6]"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-800 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-full bg-[#e8f8e8] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4ecca6]"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-3 px-4 bg-[#4ecca6] text-gray-800 rounded-full font-medium text-lg hover:bg-[#3dbb95] transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Log In"}
              </Button>
            </div>

            <div className="text-center">
              <a href="/forgot-password" className="text-gray-700 hover:text-[#4ecca6] text-sm">
                Forgot Password?
              </a>
            </div>

            <div className="pt-2">
              <Button
                type="button"
                className="w-full py-3 px-4 bg-[#e8f8e8] text-gray-800 rounded-full font-medium text-lg hover:bg-[#d8f0d8] transition-colors"
                onClick={() => navigate("/signup")}
                disabled={isLoading}
              >
                Sign Up
              </Button>
            </div>

            <div className="text-center pt-2">
              <p className="text-gray-800">
                Use <span className="text-blue-500">Fingerprint</span> To Access
              </p>
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-600 text-sm mb-4">or sign up with</p>
              <div className="flex justify-center space-x-6">
                <button
                  type="button"
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  <Facebook className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  <GoogleIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-700 text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12 h8" />
      <path d="M12 8 v8" />
    </svg>
  )
}
