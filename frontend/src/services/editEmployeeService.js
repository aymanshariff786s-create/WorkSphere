import api from "./api";

export const updateEmployee = async (id, employee) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/employees/${id}`,
    employee,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};