import { FieldValue } from "firebase/firestore";

export interface iForm {
  type: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  address: string;
  description: string;
  offer: boolean;
  regularPrice: number;
  discountedPrice: number;
  latitude?: number;
  longitude?: number;
  images: FileList[];
}

export interface iFormDataCopy {
  type: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  address: string;
  description: string;
  offer: boolean;
  regularPrice: number;
  discountedPrice?: number;
  latitude?: number;
  longitude?: number;
  images?: FileList[];
  imgUrls: string[] | void;
  timestamp: FieldValue;
  userRef: string;
}

export interface listingData {
  type: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  address: string;
  description: string;
  offer: boolean;
  regularPrice: number;
  discountedPrice: number;
  latitude?: number;
  longitude?: number;
  images: [];
}
