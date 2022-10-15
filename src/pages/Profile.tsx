import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { FcHome } from "react-icons/fc";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";

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

  const [changeDetail, setChangeDetail] = useState(false);

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return toast.error(error.message);
    return toast.error(String(error + "was not of type Error"));
  };

  const onDetailSubmit: () => void = async () => {
    try {
      // update profile
      if (auth.currentUser?.displayName !== displayName) {
        await updateProfile(auth.currentUser!, {
          displayName,
        });
        // update database

        const docRef = doc(db, "users", auth.currentUser?.uid!);

        await updateDoc(docRef, { name: displayName });

        toast.success("Profile updated successfuly!");
      }
    } catch (error) {
      getErrorMessage(error);
      console.log(error);
      toast.error("There has been an error updating the profile" + error);
    }
  };

  const onEditHandler: (e: React.MouseEvent<HTMLSpanElement>) => void = (e) => {
    e.preventDefault();

    changeDetail && onDetailSubmit();

    setChangeDetail((prevState) => !prevState);
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
            onChange={(e) =>
              setFormData((prevState) => {
                return { ...prevState, displayName: e.target.value };
              })
            }
            value={displayName}
            disabled={!changeDetail}
            className={`w-full text-gray-500 border border-gray-300 mb-6 ${
              changeDetail && "bg-red-200 focus:bg-red-200"
            }`}
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
                {changeDetail ? "Apply change" : "Edit"}
              </span>
            </p>
            <p
              className="text-blue-500 hover:text-blue-700 cursor-pointer transition ease-in-out hover:font-semibold"
              onClick={onSignOutHandler}
            >
              Sign Out
            </p>
          </div>
          <button
            type="submit"
            className=" w-full  bg-blue-500 hover:bg-blue-700 text-white uppercase font-semibold mt-6 rounded px-3 py-2 mx-3 shadow-md hover:shadow-lg"
          >
            <Link
              to="/create-listing"
              className="w-full flex items-center justify-center "
            >
              <FcHome className="text-3xl bg-red-200 rounded-full p-1 border-white border-2 mr-2" />
              sell or rent your home
            </Link>
          </button>
        </form>
      </section>
    </>
  );
};

export default Profile;
