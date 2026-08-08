import api from "./api";

export const updateDepartment = async (id, department) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/departments/${id}`,
    department,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};