import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Profile = (): JSX.Element => {
  const auth = getAuth();
  const navigate = useNavigate();

  type ProfileInfo = {
    email: string;
    displayName: string;
  };

  const [formData, setFormData] = useState<ProfileInfo>({
    email: auth.currentUser?.email!, // non-null assertion
    displayName: auth.currentUser?.displayName as string, // type assertion
  });
  const { email, displayName } = formData;

  const onEditHandler: (e: React.MouseEvent<HTMLSpanElement>) => void = (e) => {
    e.preventDefault();

    // updateProfile(auth.currentUser!, {
    //   displayName: e.target.,

    // });
  };

  const onSignOutHandler: (
    e: React.MouseEvent<HTMLParagraphElement>
  ) => void = (e) => {
    e.preventDefault();

    auth.signOut();
    toast.success("Logged out!");
    navigate("/");
  };

  return (
    <>
      <section className=" px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl text-center font-bold mb-6 mt-6">
          Profile Page
        </h1>
        <form className="w-full mx-auto flex flex-col justify-center items-center lg:w-[67%] md:w-[50%]">
          <input
            type="text"
            name="name"
            id="name"
            value={displayName}
            disabled
            className="w-full text-gray-500 border border-gray-300 mb-6"
          />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            disabled
            className="w-full text-gray-500 border border-gray-300 mb-6"
          />
          <div className="flex justify-between whitespace-nowrap w-full">
            <p className="">
              Do you want to change your name?
              <span
                className="text-red-500 hover:text-red-700 ml-2 cursor-pointer transition ease-in-out hover:font-semibold"
                onClick={onEditHandler}
              >
                Edit
              </span>
            </p>
            <p
              className="text-blue-500 hover:text-blue-700 cursor-pointer transition ease-in-out hover:font-semibold"
              onClick={onSignOutHandler}
            >
              Sign Out
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Profile;
