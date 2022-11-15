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

import { FaShare } from "react-icons/fa";

type Props = {};

const Listing = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<DocumentData>({});
  const [copiedText, setCopiedText] = useState(false);

  const params = useParams();

  const { category, categoryName, listingId } = params;

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
          className=" flex text-4xl justify-center align-center text-slate-500 p-2"
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
        <p className="absolute top-[18%] right-[3%] z-10 bg-white font-semibold p-1 rounded">
          Text Copied!
        </p>
      )}
    </main>
  );
};

export default Listing;
