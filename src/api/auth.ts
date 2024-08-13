import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

const login = async (loginData: { emailAddress: string; password: string }) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);

    return response.data;
  } catch (error) {
    throw new Error("Error logging in");
  }
};

const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    throw new Error("Error logging out");
  }
};

const register = async (registerData: {
  emailAddress: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/register", registerData);

    return response.data;
  } catch (error) {
    throw new Error("Error registering");
  }
};

const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {},
    onError: () => {},
  });
};

const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {},
    onError: () => {},
  });
};

const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {},
    onError: () => {},
  });
};

export { useLogin, useLogout, useRegister };
