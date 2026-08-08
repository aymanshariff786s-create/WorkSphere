import api from "./api";

export const deleteDepartment = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(
    `/departments/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};