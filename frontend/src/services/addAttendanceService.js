import api from "./api";

export const addAttendance = async (attendance) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/attendance/",
    attendance,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};