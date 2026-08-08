import api from "./api";

export const updateAttendance = async (id, attendance) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/attendance/${id}`,
    attendance,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};