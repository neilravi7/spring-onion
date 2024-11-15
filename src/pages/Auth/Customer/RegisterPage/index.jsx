import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ChefHat } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import authBg from '../../../../assets/auth-bg-d79436e2.png';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const {error, success, inProgress} = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    console.log(error, success, inProgress);
    console.log(data)
    // Handle registration logic here
  }

  const password = watch("password1", "")

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
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Register</h2>
            <p className="mt-2 text-sm text-gray-600">
              Create your account to get started
            </p>
          </motion.div>

          <motion.form className="space-y-6" onSubmit={handleSubmit(onSubmit)} variants={itemVariants}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    id="first_name"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    {...register("first_name", { 
                      required: "First name is required", 
                      minLength: { value: 2, message: "First name must be at least 2 characters" } 
                    })}
                  />
                  {errors.first_name && <p className="mt-2 text-sm text-red-600">{errors.first_name.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    id="last_name"
                    type="text"
                    autoComplete="family-name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    {...register("last_name", { 
                      required: "Last name is required", 
                      minLength: { value: 2, message: "Last name must be at least 2 characters" } 
                    })}
                  />
                  {errors.last_name && <p className="mt-2 text-sm text-red-600">{errors.last_name.message}</p>}
                </div>
              </div>
            </div>

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
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } 
                  })}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password1" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password1"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  {...register("password1", { 
                    required: "Password is required", 
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character" }
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
              {errors.password1 && <p className="mt-2 text-sm text-red-600">{errors.password1.message}</p>}
            </div>

            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password2"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
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
              {errors.password2 && <p className="mt-2 text-sm text-red-600">{errors.password2.message}</p>}
            </div>
            <input type='hidden' id='is_customer' value={true} {...register("is_customer")}/>
            <input type='hidden' id='is_vendor' value={false} {...register("is_vendor")}/>


            <div>
              <motion.button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </div>
          </motion.form>

          <motion.p className="mt-8 text-sm text-gray-600 text-center" variants={itemVariants}>
            Already have an account?{' '}
            <Link to={"/login"} className="font-medium text-red-600 hover:text-red-500">
              Log in
            </Link>
          </motion.p>
        </div>
      </div>
      <div>
          <div className="absolute top-1/2 -translate-y-1/3 start-0 end-0 w-full -z-10">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAFGCAMAAACrLMh2AAAANlBMVEUAAAD1gh/ygBv2gh/zgCL3gx/2hBz0hSDldBnzgiT3gx/2gSH3iRL6fSD1gyL/jhzyhiL1gSEwY1i/AAAAEnRSTlMAMRM5JkIcRworIT0OF0wJJmeNNHFsAAAPVUlEQVR42uzYSWrDQBBAUQ09yLLVkPtfNj1YDll4E4jB+L2Fdipp9SlqAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgQ2zbdluWJVV7qC7zsD41D6HZ62tHff1Wx0wA/FVr8ZFSCD3AMcZSSn1e79W9jOQOy1NpCM3l3vLrGHbO6mNqtkUb4Jla5JRaRmuOc+9n3317gP9h6T238V7ulu1ccv9mCG3R1mvgA9S41hIej012Pq1tMy7V10OpclzHgpx+bhLTa2ztP0PoO3suI9f7sdwmgLe3bb+W0phbb2M8r8GhSXuY12vuZS61gu1ekY5j6RUf9tCMiI85502iHzfSa1bcdmT5Zu8Ml9wEoTC6AiIgmL7/09YLm860XTsbmmvUnPM7DDvZyfHLx9UkF+sfO81W/kxcDQAnIuTikwh51ahItDr0XuuGP16Z4mDHqUbk5E3o6CRks1ZLi7RF2XU3fV9nc7+wjKgaAI5LlXJ1stS2TZHFbBURoXi3enm1adPyczOueDOKr6uuaxhXlnUwpalaUjWmBoAjIAnYiZVbLZF8ydsmbGKO9dXD4MTL6oSWcofaH9u6q+622fi7qaMrnCsCwN6E7FO8a9k1K/+bdcEwfIpZXq3OdsyV4G6teiORjZQ309JE/QEAoMBmM5HDt5ak1eTTOERfDhMnf2sklKN8NrLVNMlbRvUBAE8nZO8ebSaCHP+Ny7HMvKFPydTa1bEch9p5mS2eBoBnmTkOEjQ3xLylZlljh3RgM/+dqSVSi6h1C4lsfnmaghoA+qiZeRrnIXnJe4+oWULzWTNiMP5eSKgKVDxdt3HlrG8VAOxPqyZEHQ9Z1pxdzb+Ti3h6kXdBM09Lbm9xmmNEAPhONREfqyaCX4Uuq66h5i88PVndoJtNkl3QNAB8RU6xxxC5xuYzdc19GB8l6CrX0+bzn8BQHgA0gm+FRjKP2qQuu2Js3iK3PkLXoFm6ooVuGuDdyT7aWhuHHjdfpW3u0LS6QdsmdB4A70luMS2ZjnXv6+YvNJ3UOw+5FNw+AOAtqG7u6CZCzdtv1Wl8Q9OtNVYO03UPKg+AaxN8nLt6Y5OGaRr4vr357uiHaTfMWBrgqhTJvz0S8XG1T/QXn9N4Sh2hX3lgaYCrkVOdUy6PJ+51IcH50cpjH0vTSwOcH+MkOPvQ44F1IcH5oJZ2cs11XDoBTkuJNWr1WX2O/gP+y9KL7pj4rV4I+IIDcDqCj53lhMhZrA5PGpjRbSOyX7eg8AA4DcHX5jj3yplE9lTktp5RvZaeRqI0wNH5lHPoSXt2mpGzDtJGaEfpEueFrz4Ah8XHTjkHSWB8tr/iZFHaSSvNfZ4AB8PIgWDXkVQRrXMguA+3MszK0xfZMxsJcCCknbA/TGfisty8vTPG2WVW7TtuJc5M4QG8Hi/thOlbSen8MkwapIzQHL4w0S4c+QK8DOOslM7dKz/glUgZMeo2xsZZTg4BXoAfpNfoXkmyOgR7SFrmc5A0wF60AOy7+2qi86G4iaSV647EhDvALpjY2zqbOI58Sg9Jk3RRlbSjkwbQpQbg0F1sMLBxYLKXg0PVLkIODpnuANAgpK5iQ6DYOAlZv4swcd2COWmAZ2LcOPV9cIMU1nwez4OJ6tPpzEkDPLd2/mF6vU7veD6K7rmhUKg7AJ5iZ/sj9B4KMk93Vm473ElkInPSAK+x84Sdz47MU+oG6fsTlniiNECHnVPnSkY2rkJtO8yHKu1JezyVBeAhx3ZGojU782OCFyInu1jlIC1TfpwcAnzPsb3NRnb0zpekDHvcZWQiT5QG+Ceh37HOMrNxXXJSb6QFk/jJcIANUrdjE3a+PHW0w+kH3FshSv9k796WnIaBKIqmW3fJsvn/r8VtOUnBQAgaJ5Hks17ghSrmttPTsh2A33H1PSUZd6OcBYdkKF9eb4qUHN4yHOB2LGir/yXetepElqhmsm8JJ2syjrDwgJPTpvKiDa/lcg84G0tVN4TXLzzwRodwVvY7i2dctHFWTG98fuyESsMpyYKCa39AFX5eTm0K6eFtLKg0QL0yAl+qaDxCFFaLrXgM7bcrbUgzTg9hbEy140/GNXVws9iKQ8MDKu1UyLgSDwalU/2jNrDagK+HhtLot2JNaVZYecBwmEz9uSCu2oA/yO9vtOC4LaY1hmkYRVQJwzMcj8lIo99vyjJM4/wQ+sfBEYZneBFpdFwuH8G2bKaRaehVXiOL4Rl+N8QcXXBEpqFPujayGcMz9NNoZBr6U38wqDE8Q3+NvmeaIuMIEZrG1bsN5QK+u6ECk/t8o/dMyxGizpgzoEnVM3BUuGEQ6mWaqZFHHU5ZUxmncUUetGTRjrDbgA+xNFO+NGMfp1XA2gNaUL/bwMEgHGKxyjT2hg4TOg0tYGXqKmuVwW4Djmt0MtReCfdOG4X9NHyATQq7DWjDEoyJDRwZ/oFnu+2nE2Gghn/5+Mngolv7hRTG0MSldw9w3gZqp0gj1PArP2WridJxeSbG6hkak9s6Mvwjz1kTQg0rzzZKls1sEpG2eToozyYslTtr5Bm+GvrI8EGog0rOJRW0ZX+Bc9iG5UDKOHfNsj9221d7Mpiweoa/GP/I8NFZoiZlZKQOOqPUQ7pXuQzL8VUvyQu5HzgZhLY1fGT4AOe91EmRtth+9M5fNxiPqtxMnvv4vRNG0fqR4SMTW1lTu9koCpJqTNW98NMW5TIqly9fflDlVvJsQqc/KtCxnhtdeM5xT7VM1TFjrG6PDMpWh+ukvEX5uVG5jTwvhAs3oELH75R1PM8sEShjtbQac/UHyUY5bl+OfVAmHf/7rK+NPDPyDB9l23mi0sGtNrO7xhpHi6/lPUuSqYzJbpuTm3qRDO4HLnuGTg3X6BvphsRa7b9dk9Y2t5ONbnnZJZciK2PmMiWHMiY3+MnVBnmGro3b6Bs/Sa01KZmtb7m2zC0mpS3S47K0ILUHOW1Ftja3/+lDnmEEJ2j011zfi6O2YEebz17sUuNbjm897vT1TDtakGcYgqV5jDPDmiWqBPs+IzqTJNmhNLu7LD3DS4rZWqv1tqtQqXzgpcZBR5mPm1xZPM8aNSHPMA47ynUd3yXxyjaWZku03Rav9a+0d9taXvmmC+ZLhSXDsXSYVBmLS4qvH418ML3H+CtWVXf/TcgzNGyYa++O5z1Ltvdukyqxc6V2JqkVCS3shgu/OyK5BW+y3WgRSKhVMqt5JX+m/X+1/5eaf1E5CivDuO4ZRsRkUsRNH/+9MFjZVdSCNqowu/nOmWe5+c5cqQ0VWkQreDX5czT4keDipQLyDF1gMibg+QOv5J+B1L7z0g2N54lCN6aQOnk2KUBRWEML8gzjW6xyhIU09KTybFA7wjc6dGfBhR3QE3K2aujG856hV5lMwkIaOqCrDvlYIc/QNQ7JNP+GhnByP9m7A9y2YSAIgCYpihApWf3/a4u4QIOkhWupiU1bM29IiM3e6RJzWnct5HmeeXrrmI76pSHPYA057upE6glegrKDXtX8w+oGhxeHZrOD3sS2p90YrW7wei6bHYMgTTemvJgNwoepoSBNF5Yy7YgZZoO8NEGaHqypReUzCNL0Z9dwcCzhBEfwFqStdvAYa0qr8hmuikMqyYVS7q3muucU6XH+uRu870jnsGg7uKKD+FzLdIIj0nZw3cPjc0zJH3ocWBzSOVWPNH/oID5rN+C0TK2EUVLhg4fHZ+0G/G47sgU83j08Pq92N+DTI93MDflyy46zz4OrdfDZXN/mhi5J84WmHLefivZlCvxVrMkjzVeZ83TaKri7AR5pvl3No+EgXLf/kdZJ8x9CW7cfU7JQBDeJNRSDQ+5Xb9RsOAjbBoc525Nms1qW7bt1wgBsNY8hl+CLQ7Zoq/gMd7IuoTn5z+3EZ7ivOKWzySE30D7DI8QaSg7uSSM+Q5fm8a3vcKsU8Rn6FIdUmv0OxGfo068o7aND9qsOI8EGe6J0toXHLiH7Gwy+2bxM7ZymxS8bW8Ts8gbcR6yXXWlreNxocrgOdttfePiihX9am7vPcH/rMqXS1NJYroM+zV5prghZFQaPNY9TOnul+Ww2HYQ+zKMszQe12J2HjlwajxzseHA6heanALozL0Mqxb70sak3oGOxhnZOKo+Dqlm9AZ2L9VJMD8L0wUzqDXgO8zJcri0J00exqjfgufwK00mYfn2L03X8ZO8OcBuFoSCAxsYYB0h273/ajQ2pWqmqtNt0A+S9Q4yG4YewR61MX20eh5Z8ug52rB7jTYMXiMcUfJkf9q9tHqbpgzE/w4GsMR3G6Ln4AKL5GQ5njWnb9M6N5mc4qng5r68QrR675PoZjq5eerRx2uqxMz7ND6+irh69Or0fv/rfJ+CV1Dptnd4DrwfhVcWcwnSV09uVBw868NJKHM9yepOSv7YC1pxOYRqGzj69Fc43gI/isk9Pwb3Hk4XuBPCJ+TKeu2X4yLGc+O8mv+4GvlRiTqEe5tXlQ1B/yXkd8BRzC+rhOmnUn5LPwNPNa6Puu5Bs1D/mV+/8GfhXJV5S/fz0MHVnlfrR5iGfAL5rjmOr1EMXzlbqB+ndOQKPrdTjuSV169TWj+9w/gz8jHgZU1jWj5BGpRpge+aYUyvVohpgqz5EdRtAZDXAxsz3AURWA2xVWWv19NarL94sAmzN0qtD1w/XvoX1eNGsATamtLBem3XftWotrQG2psSYxxRaWrduHZK4Btic2q1zeovr1q5bXjvfA9iSsrTrcwhdna6HfuqWgp2jhg2wJWVugZ1qYE/9sFbs1rFbyZbZAFtRK/blHtld3zJ7qdkhrak9i22AbShlrqGdU0qhNe0W20PL7TW4x5xzvCmyG+D5Wm7H3IL7XJP7pq/Z3cK776pwk6pcxaYUMQ7wNKWUWOWbVIWqa/pquDZDv+juwjvpL50AeJzSzPEuvyOgAQAAAAAAAAAA+MMeHAgAAAAAAPm/NoKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqrAHBwIAAAAAQP6vjaCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqKu3BgQAAAACAoP2pF6kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoVwoW+KpyVzAAAAABJRU5ErkJggg=="
              className="w-full opacity-50 flex"
            />
          </div>
          <div className="absolute top-0 end-0 hidden xl:flex h-5/6">
            <img src={authBg} className="w-full z-0" />
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