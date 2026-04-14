import axios from "axios";

// create instance 
const axiosInstance = axios.create({
    // backend url
    baseURL: "http://127.0.0.1:8000"
});

// attach token automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;