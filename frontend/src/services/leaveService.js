import api from "./api";

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getLeaves = async () => {
  const response = await api.get("/leaves/", getHeaders());
  return response.data;
};

export const addLeave = async (leave) => {
  const response = await api.post(
    "/leaves/",
    leave,
    getHeaders()
  );
  return response.data;
};

export const updateLeave = async (id, status) => {
  const response = await api.put(
    `/leaves/${id}`,
    { status },
    getHeaders()
  );

  return response.data;
};

export const deleteLeave = async (id) => {
  const response = await api.delete(
    `/leaves/${id}`,
    getHeaders()
  );

  return response.data;
};