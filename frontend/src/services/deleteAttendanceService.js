import api from "./api";

export const deleteAttendance = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(
    `/attendance/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};