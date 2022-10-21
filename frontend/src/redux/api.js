import axios from "axios";


const API = axios.create({baseURL: "http://localhost:3000"});


export const singIn = (formData) => API.post("/api/user/login", formData)
export const updateBio = (bio, id) => API.put(`/api/user/${id}`, bio)
export const getPosts = () => API.get("/api/post")