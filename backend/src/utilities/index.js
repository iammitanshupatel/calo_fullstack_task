const axios = require("axios");
const { createApi } = require("unsplash-js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_SECRET_KEY,
  fetch: fetch,
});

const getRandomFoodImage = async () => {
  const res = await unsplash.photos.getRandom({});
  console.log(res);
  return res?.response?.url;
};
// const getRandomFoodImage = async () => {
//   try {
//     console.log(
//       `https://picsum.photos/id/${Math.floor(Math.random() * 10)}/info`
//     );
//     const response = await axios.get("https://api.unsplash.com/photos/random");
//     return response?.url;
//   } catch (error) {
//     return error;
//   }
// };

module.exports = { getRandomFoodImage };
