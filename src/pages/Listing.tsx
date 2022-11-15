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

type Props = {};

const Listing = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<DocumentData>({});

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
    </main>
  );
};

export default Listing;
