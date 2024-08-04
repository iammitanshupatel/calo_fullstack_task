const axios = require("axios");

const getRandomFoodImage = async () => {
  try {
    const response = await axios.get(
      `https://picsum.photos/id/${Math.floor(Math.random() * 10)}/info`
    );
    return response?.url;
  } catch (error) {
    return error;
  }
};

module.exports = { getRandomFoodImage };
