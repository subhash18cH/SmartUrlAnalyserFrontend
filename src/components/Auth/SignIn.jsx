import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Api';
import toast from 'react-hot-toast';

const SignIn = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onLoginHandler = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/api/auth/public/signin", data);
      if (response.status === 200 && response.data.jwtToken) {
        reset();
        toast.success("Login Successful");
        localStorage.setItem("JWT", response.data.jwtToken)
        navigate("/home")
      }
    } catch (error) {
      toast.error("something went wrong!")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-gray-600">
            Please Enter your username and password
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onLoginHandler)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="userName" className="block text-sm font-semibold  text-gray-700">
                UserName
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                {...register("userName")}
                errors={errors}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="john doe"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                {...register("password")}
                errors={errors}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
              shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? <span>Loading...</span> : "Log In"}
            </button>
          </div>


          <p className="text-center text-sm text-slate-700 mt-6">
            Don't have an account?{" "}
            <Link
              className="font-semibold underline hover:text-black"
              to="/signup"
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;