import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ChefHat, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { userSignUp } from '../../../../redux/actions/auth';
import { Link } from 'react-router-dom';


export default function RegisterVendor() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const { error, success, inProgress, isAuthenticated } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(userSignUp(data));
  }

  const password = watch("password1", "")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  useEffect(() => {
    if (isAuthenticated){
      navigate("/dashboard")
    }
    if (error) {
      toast.error(error); // Show error message
    }
    if (success) {
      toast.success("Sign Up successful!"); // Show success message
      navigate('/vendor/login');
    }
  }, [error, success, inProgress, isAuthenticated]);

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
            Register Your Restaurant
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our network of amazing food vendors
          </p>
        </motion.div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <motion.div variants={itemVariants} className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="first_name" className="sr-only">First name</label>
                <input
                  id="first_name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="First name"
                  {...register("first_name", { required: "First name is required" })}
                />
              </div>
              <div>
                <label htmlFor="last_name" className="sr-only">Last name</label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Last name"
                  {...register("last_name", { required: "Last name is required" })}
                />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="password1" className="sr-only">Password</label>
            <div className="relative">
              <input
                id="password1"
                name="password1"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register("password1", { 
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters long" }
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="password2" className="sr-only">Confirm Password</label>
            <div className="relative">
              <input
                id="password2"
                name="password2"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                {...register("password2", { 
                  required: "Please confirm your password",
                  validate: value => value === password || "The passwords do not match"
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Hidden field for is_vendor */}
          <input type="hidden" name="is_vendor" value="true" {...register("is_vendor")} />
          <input type="hidden" name="is_customer" value="false" {...register("is_customer")} />

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
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ChefHat className="h-5 w-5 text-red-500 group-hover:text-red-400" aria-hidden="true" />
              </span>
              Register as Vendor
            </button>
          </motion.div>
        </form>

        <motion.p className="mt-2 text-center text-sm text-gray-600" variants={itemVariants}>
          Already have an account?{' '}
          <Link to={"/vendor/login"} className="font-medium text-red-600 hover:text-red-500">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}