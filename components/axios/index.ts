// api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const Axios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need
  },
});

Axios.interceptors.request.use(
  (config: any) => {
    // You can modify the request config here (e.g., adding an authorization token)
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response here before it's returned to the calling code
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default Axios;
