import api from "./api";

export const addEmployee = async (employee) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/employees/",
    employee,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};