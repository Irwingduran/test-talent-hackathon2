"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "../../components/ui/button"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    rfc: "",
    password: "",
    confirmPassword: "",
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signup logic here
    console.log("Signup attempt with:", formData)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top section with teal background */}
      <div className="bg-[#4ecca6] pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Create Account</h1>
      </div>

      {/* Curved white section */}
      <div className="relative flex-1 bg-white">
        {/* Curved top edge */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-transparent">
          <div className="absolute top-0 left-0 right-0 h-16 bg-white rounded-t-[50%] transform translate-y-[-8px]"></div>
        </div>

        <div className="flex flex-col items-center px-6 pt-8 pb-8">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div className="space-y-1">
              <label htmlFor="fullName" className="block text-gray-800 font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Sergio Pérez"
                className="w-full px-4 py-3 rounded-full bg-[#e8f8e8] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4ecca6]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-gray-800 font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@example.com"
                className="w-full px-4 py-3 rounded-full bg-[#e8f8e8] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4ecca6]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="mobileNumber" className="block text-gray-800 font-medium">
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="+ 123 456 789"
                className="w-full px-4 py-3 rounded-full bg-[#e8f8e8] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4ecca6]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="dateOfBirth" className="block text-gray-800 font-medium">
                Date Of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="text"
                value={formData.dateOfBirth}
                onChange={handleChange}
                placeholder="DD / MM / YYY"
                className="w-full px-4 py-3 rounded-full bg-[#e8f8e8] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4ecca6]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="rfc" className="block text-gray-800 font-medium">
                RFC
              </label>
              <input
                id="rfc"
                name="rfc"
                type="text"
                value={formData.rfc}
                onChange={handleChange}
                placeholder="RFC"
                className="w-full px-4 py-3 rounded-full bg-[#e8f8e8] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4ecca6]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-gray-800 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-full bg-[#e8f8e8] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4ecca6]"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-gray-800 font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-full bg-[#e8f8e8] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4ecca6]"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="pt-4 text-center text-sm text-gray-700">
              By continuing, you agree to{" "}
              <a href="/terms" className="text-gray-900 font-medium hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-gray-900 font-medium hover:underline">
                Privacy Policy
              </a>
              .
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-3 px-4 bg-[#4ecca6] text-gray-800 rounded-full font-medium text-lg hover:bg-[#3dbb95] transition-colors"
              >
                Sign Up
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-700 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:underline">
                  Log In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}