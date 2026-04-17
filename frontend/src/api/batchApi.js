import axios from "./axios";

export const createBatch = (data) => axios.post("/batches/", data);

export const getBatches = () => axios.get("/batches/");