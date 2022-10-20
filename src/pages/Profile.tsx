import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FcHome } from "react-icons/fc";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ListingComponent from "../components/ListingComponent";
import { db } from "../firebase";
const Profile = (): JSX.Element => {
  const auth = getAuth();
  const navigate = useNavigate();

  type ProfileInfo = {
    email: string;
    displayName: string;
  };

  type Listings = {
    id: string;
    data: DocumentData;
  };

  const [formData, setFormData] = useState<ProfileInfo>({
    email: auth.currentUser?.email!, // non-null assertion
    displayName: auth.currentUser?.displayName as string, // type assertion
  });

  const { email, displayName } = formData;

  const [changeDetail, setChangeDetail] = useState(false);

  const [listings, setListings] = useState<Listings[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  console.log(auth.currentUser?.uid);

  // Fetch listings

  useEffect(() => {
    // Create an async funtion within the useeffect
    async function fetchUserListings() {
      // Defines which collection to look into
      const listingRef = collection(db, "listings");

      // queries which document to return
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser?.uid),
        orderBy("timestamp", "desc")
      );

      // Asynchronously gets the documemnts
      const querySnap = await getDocs(q);

      let listings: Listings[] = [];
      querySnap.forEach((doc) => {
        doc.data()
          ? console.log("There is data :", doc.data())
          : console.log("Doc Exists?", doc.exists());

        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);

      setIsLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser?.uid]);

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

        <section className="mt-10 text-3xl font-bold max-w-6xl mx-auto">
          <h1 className="text-center mt-3">My Listings</h1>
          <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {!isLoading &&
              listings.length > 0 &&
              listings.map((listing) => {
                return (
                  <ListingComponent
                    key={listing.id}
                    id={listing.id}
                    listing={listing.data}
                  />
                );
              })}
          </ul>
        </section>
      </section>
    </>
  );
};

export default Profile;
