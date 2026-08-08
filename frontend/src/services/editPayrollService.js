import api from "./api";

export const updatePayroll = async (id, payroll) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/payroll/${id}`,
    payroll,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};