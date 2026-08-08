import api from "./api";

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAttendance = async () => {
  const response = await api.get(
    "/attendance/",
    getHeaders()
  );

  return response.data;
};

export const addAttendance = async (attendance) => {
  const response = await api.post(
    "/attendance/",
    attendance,
    getHeaders()
  );

  return response.data;
};

export const updateAttendance = async (id, attendance) => {
  const response = await api.put(
    `/attendance/${id}`,
    attendance,
    getHeaders()
  );

  return response.data;
};

export const deleteAttendance = async (id) => {
  const response = await api.delete(
    `/attendance/${id}`,
    getHeaders()
  );

  return response.data;
};