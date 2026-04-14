import axios from "./axios";

export const loginUser = async(data) => {
    return await axios.post("/auth/login", data)

};