import { axiosInstance } from "./api.config";

const getApiCall = async (endpoint: string, params?: any) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export { getApiCall };
