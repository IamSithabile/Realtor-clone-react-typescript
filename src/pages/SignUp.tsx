import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

type SigningUp = {
  name: string;
  email: string;
  password: string | number;
};

const SignUp = (): JSX.Element => {
  const [formInput, setFormInput] = useState<SigningUp>({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formInput;

  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler: () => void = () => {
    setShowPassword((prevState) => !prevState);
  };

  const changeHandler: (e: React.FormEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();

    setFormInput((prevState) => {
      return { ...prevState, [e.currentTarget.id]: e.currentTarget.value };
    });
  };
  return (
    <>
      <h1 className="text-3xl font-bold py-6 text-center">Sign Up</h1>

      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357"
            alt="key in hand"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="md:w-[67%] lg:w-[40%] w-full lg:ml-20">
          <form className="flex flex-col items-center">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={changeHandler}
              placeholder="Full Name"
              className="w-full py-2 px-4 my-2 text-gray-700 border-gray-300 text-xl rounded transition ease-in-out"
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={changeHandler}
              placeholder="Your Email Address"
              className="w-full py-2 px-4 my-2 text-gray-700 border-gray-300 text-xl rounded transition ease-in-out"
            />
            <div className=" relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={changeHandler}
                placeholder="Your password"
                className=" w-full py-2 px-4 my-3 text-xl text-gray-700 border-gray-300  rounded transition ease-in-out"
              />
              {showPassword ? (
                <AiFillEye
                  className="absolute top-6  right-6 text-2xl pointer"
                  onClick={showPasswordHandler}
                />
              ) : (
                <AiFillEyeInvisible
                  className="absolute top-6  right-6 text-2xl pointer"
                  onClick={showPasswordHandler}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="text-xl lg:text-lg">
                Have an account?
                <Link
                  to="/sign-in"
                  className="text-red-600 pointer hover:text-red-800 active:text-red-900 ml-2 transition duration-150"
                >
                  Sign In
                </Link>
              </p>
              <Link
                to="/forgot-password"
                className=" ml-10 text-xl lg:text-lg text-blue-600 block pointer hover:text-blue-800 active:text-blue-900 transition duration-150"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full font-bold bg-blue-600 text-white py-3 px-3 rounded uppercase pointer hover:bg-blue-800 active:bg-blue-900"
            >
              Sign Up
            </button>
            <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
