import axios from "./axios";

export const createCourse = (data) => axios.post("/courses", data)
export const getCourses = () => axios.get("/courses");