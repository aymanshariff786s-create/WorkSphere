import api from "./api";

export const deleteEmployee = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(
    `/employees/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};