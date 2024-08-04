import axios from "axios";

const API_URL = "http://localhost:8080";

export const createJob = async () => {
  const response = await axios.post(`${API_URL}/jobs`);
  return response.data.id;
};

export const getJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs`);
  return response.data;
};

export const getJob = async (id) => {
  const response = await axios.get(`${API_URL}/jobs/${id}`);
  return response.data;
};
