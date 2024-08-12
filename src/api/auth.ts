import { useMutation } from "@tanstack/react-query";

const login = async (loginData: { emailAddress: string; password: string }) => {
  const response = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error logging in");
  }

  const result = await response.json();

  return result;
};

const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {},
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export default useLogin;
