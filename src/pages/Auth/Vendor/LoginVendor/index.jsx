import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { ChefHat, Mail, Lock, AlertCircle, Loader } from 'lucide-react'

export default function FoodVendorLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
    setIsLoading(false)
    // Handle login logic here
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <ChefHat className="mx-auto h-12 w-12 text-red-600" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to Your Restaurant Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back, chef!
          </p>
        </motion.div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <motion.div variants={itemVariants}>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
            </div>
          </motion.div>

          {Object.keys(errors).length > 0 && (
            <motion.div variants={itemVariants} className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">There were errors with your submission</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {Object.keys(errors).map((key) => (
                        <li key={key}>{errors[key].message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              disabled={isLoading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLoading ? (
                  <Loader className="h-5 w-5 text-red-500 animate-spin" aria-hidden="true" />
                ) : (
                  <ChefHat className="h-5 w-5 text-red-500 group-hover:text-red-400" aria-hidden="true" />
                )}
              </span>
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="text-center">
          <a href="#" className="font-medium text-red-600 hover:text-red-500">
            Forgot your password?
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-red-600 hover:text-red-500">
              Register here
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}