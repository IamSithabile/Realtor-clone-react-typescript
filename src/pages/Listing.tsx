import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import { useParams } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";

import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import Contact from "../components/Contact";
import { getAuth } from "firebase/auth";

type Props = {};

const Listing = (props: Props) => {
  const auth = getAuth();

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<DocumentData>({});
  const [copiedText, setCopiedText] = useState(false);

  const [contactLandlord, setContactLandlord] = useState(false);

  const params = useParams();

  const { listingId } = params;

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", `${listingId}`);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing((prevState) => {
          return { ...prevState, ...docSnap.data() };
        });
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  console.log(listing);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
        className="relative"
      >
        {listing.imgUrls.map((url: string, index: number) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-[13%] right-[3%] z-50 bg-white rounded-full border-gray-300 border-2 cursor-pointer">
        <FaShare
          className=" flex text-4xl justify-center align-center text-slate-500 p-2 "
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopiedText(true);

            setTimeout(() => {
              setCopiedText(false);
            }, 2000);
          }}
        />
      </div>
      {copiedText && (
        <p className="absolute top-[18%] right-[3%] z-10 bg-white font-semibold p-1 rounded-md border-gray-300 border-2">
          Link Copied!
        </p>
      )}

      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full ">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - ${" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? "Parking spot" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>

          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Listing;
