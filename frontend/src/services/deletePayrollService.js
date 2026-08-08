import api from "./api";

export const deletePayroll = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(
    `/payroll/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};