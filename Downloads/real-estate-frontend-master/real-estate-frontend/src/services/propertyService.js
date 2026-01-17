import api from "./authService";

export const addProperty = (data) =>
  api.post("/properties", data);

export const getAllProperties = () =>
  api.get("/properties");
