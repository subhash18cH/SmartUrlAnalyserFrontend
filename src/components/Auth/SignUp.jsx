import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Api';
import toast from 'react-hot-toast';

const SignUp = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmitHandler = async (data) => {
    const { userName, email, password } = data;
    const sendData = {
      userName,
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await api.post("/auth/public/signup", sendData);
      reset();
      if (response.status === 200) {
        toast.success("Reagister Successful");

        navigate("/signin");
      }
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Create your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="userName" className="block font-semibold text-gray-700">
                UserName
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                message="*UserName is required"
                required
                placeholder="John Doe"
                {...register("userName")}
                errors={errors}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}

              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                id="email"
                message="*Email is required"
                name="email"
                type="email"
                required
                {...register("email")}
                errors={errors}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="john@example.com"
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
                message="*Password is required"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="*******"
                {...register("password")}
                errors={errors}
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
              I agree to the Terms and Conditions
            </label>
          </div>
          <div>
            <button
              disabled={loading}

              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
              shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? <span>Loading...</span> : "Sign up"}
            </button>
          </div>
          <div className="text-center text-sm">
            <span className="text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="hover:text-black underline font-medium">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;