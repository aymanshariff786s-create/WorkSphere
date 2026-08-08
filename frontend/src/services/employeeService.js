import api from "./api";

export const getEmployees = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/employees/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};