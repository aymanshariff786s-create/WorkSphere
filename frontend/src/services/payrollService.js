import api from "./api";

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getPayroll = async () => {
  const response = await api.get(
    "/payroll/",
    getHeaders()
  );

  return response.data;
};

export const addPayroll = async (payroll) => {
  const response = await api.post(
    "/payroll/",
    payroll,
    getHeaders()
  );

  return response.data;
};

export const updatePayroll = async (id, payroll) => {
  const response = await api.put(
    `/payroll/${id}`,
    payroll,
    getHeaders()
  );

  return response.data;
};

export const deletePayroll = async (id) => {
  const response = await api.delete(
    `/payroll/${id}`,
    getHeaders()
  );

  return response.data;
};