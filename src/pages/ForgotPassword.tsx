import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

type ForgottenPassword = {
  email: string;
};

const ForgotPassword = (): JSX.Element => {
  const [formInput, setFormInput] = useState<ForgottenPassword>({
    email: "",
  });

  const { email } = formInput;

  const changeHandler: (e: React.FormEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();

    setFormInput((prevState) => {
      return { ...prevState, [e.currentTarget.id]: e.currentTarget.value };
    });
  };
  return (
    <>
      <h1 className="text-3xl font-bold py-6 text-center">Forgot Password</h1>

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
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={changeHandler}
              placeholder="Your Email Address"
              className="w-full py-2 px-4 my-2 text-gray-700 border-gray-300 text-xl rounded transition ease-in-out"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="text-xl lg:text-lg">
                Dont have an account
                <Link
                  to="/sign-up"
                  className="text-red-600 pointer hover:text-red-800 active:text-red-900 ml-2 transition duration-150"
                >
                  Register
                </Link>
              </p>
              <Link
                to="/sign-in"
                className=" ml-10 text-xl lg:text-lg text-blue-600 block pointer hover:text-blue-800 active:text-blue-900 transition duration-150"
              >
                Sign-in instead
              </Link>
            </div>

            <button
              type="submit"
              className="w-full font-bold bg-blue-600 text-white py-3 px-3 rounded uppercase pointer hover:bg-blue-800 active:bg-blue-900"
            >
              Send reset password
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

export default ForgotPassword;
