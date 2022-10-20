import React from "react";
import { iForm } from "../pages/CreateListing";

type Props = {
  id: string;
  listing: Partial<iForm>;
};

const ListingComponent = ({ id, listing }: Props) => {
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = listing;

  return (
    <li>
      <h1>{name}</h1>
    </li>
  );
};

export default ListingComponent;
