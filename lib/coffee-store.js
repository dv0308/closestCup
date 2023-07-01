import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
});

const getUrlForCoffeeStores = (query, lat, lng, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${lat}%2C${lng}&limit=${limit}`;
};

const getImageForCoffeeStores = async () => {
  const res = await unsplash.search.getPhotos({
    query: "coffee-shop",
    perPage: 40,
  });
  const unsplashPhoto = res.response.results.map((result) => result.urls.small);
  return unsplashPhoto;
};

export const fetchCoffeeStore = async (
  lat = "30.366892919436065",
  lng = "78.06764938391682",
  limit = 8
) => {
  const photos = await getImageForCoffeeStores();
  //console.log(photos);
  console.log(lat);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FORESQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores("coffee", lat, lng, limit),
    options
  );
  const data = await response.json();
  return data.results.map((ress, idx) => {
    return {
      ...ress,
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });
};
