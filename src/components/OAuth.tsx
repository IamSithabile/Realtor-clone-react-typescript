import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const OAuth = (): JSX.Element => {
  function getErrorMessage(error: unknown) {
    if (error instanceof Error) return toast.error(error.message);
    return toast.error(String(error + "was not of type Error"));
  }

  const navigate = useNavigate();

  const onSubmitHandler: (
    e: React.FormEvent<HTMLButtonElement>
  ) => void = async (e) => {
    e.preventDefault();
    console.log("first");
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // check for the user

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        return toast.success("OAuth: Succesfully created a user account");
      }
      toast.success("OAuth: Successfuly logged in");
      console.log(user);
      navigate("/profile");
    } catch (error) {
      reportError(getErrorMessage(error));
    }
  };
  return (
    <button
      type="button"
      onClick={onSubmitHandler}
      className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded"
    >
      <FcGoogle className="text-2xl  bg-white rounded-full mr-2" />
      Continue with google
    </button>
  );
};

export default OAuth;
