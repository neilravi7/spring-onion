import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Eye, EyeOff, Facebook } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import authBg from '../../../../assets/auth-bg-d79436e2.png'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    // Handle login logic here
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <motion.div 
      className="min-h-screen bg-white flex flex-col md:flex-row"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <motion.div className="mb-8" variants={itemVariants}>
            <h2 className="mt-6 text-3xl font-extrabold text-red-600 flex items-center">
              <ChefHat className="w-8 h-8 mr-2 text-red-600" />
              Spring Onion
            </h2>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Login</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your details to access your account
            </p>
          </motion.div>

          <motion.form className="space-y-6" onSubmit={handleSubmit(onSubmit)} variants={itemVariants}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
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
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-red-600 hover:text-red-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <motion.button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log In
              </motion.button>
            </div>
          </motion.form>

          <motion.div className="mt-6" variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <motion.a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </motion.a>
              </div>

              <div>
                <motion.a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  <Facebook className="w-5 h-5 text-[#4267B2]" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.p className="mt-8 text-sm text-gray-600 text-center" variants={itemVariants}>
            Don't have an account?{' '}
            <Link to={'/sign-up'}className="font-medium text-red-600 hover:text-red-500">
              Register
            </Link>
          </motion.p>
        </div>
      </div>
      <motion.div 
        className="hidden lg:block relative w-0 flex-1"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={authBg}
          alt="Food collage"
        />
      </motion.div>
    </motion.div>
  )
}

// import React from 'react';

// function LoginPage(props) {
//     return (
//         <>
//             <div className="relative md:h-screen sm:py-16 py-36 flex items-center bg-gradient-to-b from-primary/5 via-primary/5 to-primary/10">
//                 <div className="container">
//                     <div className="flex justify-center items-center lg:max-w-lg">
//                         <div className="flex flex-col h-full">
//                             <div className="shrink">
//                                 <div>
//                                     <a href="home.html" className="flex items-center">
//                                         <img
//                                             src="/yum/assets/logo-dark-6dbab3e1.png"
//                                             alt="logo"
//                                             className="h-12 flex dark:hidden"
//                                         />
//                                         <img
//                                             src="/yum/assets/logo-light-35c89c2c.png"
//                                             alt="logo"
//                                             className="h-12 hidden dark:flex"
//                                         />
//                                     </a>
//                                 </div>
//                                 <div className="py-10">
//                                     <h1 className="text-3xl font-semibold text-default-800 mb-2">
//                                         Login
//                                     </h1>
//                                     <p className="text-sm text-default-500 max-w-md">
//                                         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//                                         eiusmod taempor.
//                                     </p>
//                                 </div>
//                                 <form data-x-form="" data-x-form-to="home.html">
//                                     <div className="mb-6">
//                                         <label
//                                             className="block text-sm font-medium text-default-900 mb-2"
//                                             htmlFor="LoggingEmailAddress"
//                                         >
//                                             Email
//                                         </label>
//                                         <input
//                                             data-x-field="email"
//                                             id="LoggingEmailAddress"
//                                             defaultValue="user@demo.com"
//                                             className="block w-full rounded-full py-2.5 px-4 bg-white border border-default-200 focus:ring-transparent focus:border-default-200 dark:bg-default-50"
//                                             type="email"
//                                             placeholder="Enter your email"
//                                         />
//                                         <span data-x-field-error="email" className="text-red-500" />
//                                     </div>
//                                     <div className="mb-6">
//                                         <div className="flex items-center justify-between mb-2">
//                                             <label
//                                                 className="block text-sm font-medium text-default-900"
//                                                 htmlFor="form-password"
//                                             >
//                                                 Password
//                                             </label>
//                                             <a
//                                                 href="auth-recoverpw.html"
//                                                 className="text-xs text-default-700"
//                                             >
//                                                 Forget Password ?
//                                             </a>
//                                         </div>
//                                         <div className="flex" data-x-password="">
//                                             <input
//                                                 data-x-field="password"
//                                                 defaultValue="password"
//                                                 type="password"
//                                                 id="form-password"
//                                                 className="form-password block w-full rounded-s-full py-2.5 px-4 bg-white border border-default-200 focus:ring-transparent focus:border-default-200 dark:bg-default-50"
//                                                 placeholder="Enter your password"
//                                             />
//                                             <button
//                                                 type="button"
//                                                 id="password-addon"
//                                                 className="password-toggle inline-flex items-center justify-center py-2.5 px-4 border rounded-e-full bg-white -ms-px border-default-200 dark:bg-default-50"
//                                             >
//                                                 <svg
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     width={24}
//                                                     height={24}
//                                                     viewBox="0 0 24 24"
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     strokeWidth={2}
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     data-lucide="eye"
//                                                     className="lucide lucide-eye password-eye-on h-5 w-5 text-default-600"
//                                                 >
//                                                     <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
//                                                     <circle cx={12} cy={12} r={3} />
//                                                 </svg>
//                                                 <svg
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     width={24}
//                                                     height={24}
//                                                     viewBox="0 0 24 24"
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     strokeWidth={2}
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     data-lucide="eye-off"
//                                                     className="lucide lucide-eye-off password-eye-off h-5 w-5 text-default-600 hidden"
//                                                 >
//                                                     <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
//                                                     <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
//                                                     <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
//                                                     <line x1={2} x2={22} y1={2} y2={22} />
//                                                 </svg>
//                                             </button>
//                                         </div>
//                                         <span data-x-field-error="password" className="text-red-500" />
//                                     </div>
//                                     <div className="flex justify-center mb-6">
//                                         <button
//                                             type="submit"
//                                             className="relative inline-flex items-center justify-center px-6 py-3 rounded-full text-base bg-primary text-white capitalize transition-all hover:bg-primary-500 w-full"
//                                         >
//                                             Log In{" "}
//                                         </button>
//                                     </div>
//                                     <div className="mb-6">
//                                         <div className="flex items-center justify-center gap-4">
//                                             <a href="javascript:void(0)" className="">
//                                                 <img
//                                                     src="/yum/assets/google-48c5b900.svg"
//                                                     className="h-8 w-8"
//                                                 />
//                                             </a>
//                                             <a href="javascript:void(0)" className="">
//                                                 <img
//                                                     src="/yum/assets/facebook-b2928e06.svg"
//                                                     className="h-8 w-8"
//                                                 />
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                             <div className="grow flex items-end justify-center mt-16">
//                                 <p className="text-default-950 text-center mt-auto">
//                                     Don’t have an account ?{" "}
//                                     <a href="auth-register.html" className="text-primary ms-1">
//                                         <span className="font-medium">Register</span>
//                                     </a>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <div className="absolute top-1/2 -translate-y-1/3 start-0 end-0 w-full -z-10">
//                         <img
//                             src="data:image/png;base64,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"
//                             className="w-full opacity-50 flex"
//                         />
//                     </div>
//                     <div className="absolute top-0 end-0 hidden xl:flex h-5/6">
//                         <img src="/yum/assets/auth-bg-d79436e2.png" className="w-full z-0" />
//                     </div>
//                 </div>
//             </div>
//             <div className="fixed lg:bottom-5 end-5 bottom-18 flex flex-col items-center bg-primary/25 rounded-full z-10">
//                 <button className="rounded-full h-10 w-10 bg-primary text-white flex justify-center items-center z-20">
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={24}
//                         height={24}
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         data-lucide="sun"
//                         className="lucide lucide-sun h-5 w-5"
//                         id="light-theme"
//                     >
//                         <circle cx={12} cy={12} r={4} />
//                         <path d="M12 2v2" />
//                         <path d="M12 20v2" />
//                         <path d="m4.93 4.93 1.41 1.41" />
//                         <path d="m17.66 17.66 1.41 1.41" />
//                         <path d="M2 12h2" />
//                         <path d="M20 12h2" />
//                         <path d="m6.34 17.66-1.41 1.41" />
//                         <path d="m19.07 4.93-1.41 1.41" />
//                     </svg>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={24}
//                         height={24}
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         data-lucide="moon"
//                         className="lucide lucide-moon h-5 w-5 hidden"
//                         id="dark-theme"
//                     >
//                         <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
//                     </svg>
//                 </button>
//             </div>
//         </>

//     );
// }

// export default LoginPage;