import { createContext, useEffect } from "react";
import React from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginData } from "../pages/Login/validator";

export const LoginContext = createContext({});

interface IDefaultProviderProps {
  children: React.ReactNode;
}

export const LoginProvider = ({ children }: IDefaultProviderProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");

    if (!token) {
      return;
    }
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, []);

  async function signIn(data: LoginData) {
    try {
      const response = await api.post("/login", data);

      const { token } = response.data;
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      window.localStorage.clear();
      window.localStorage.setItem("@TOKEN", token);

      toast.success("Login efetuado com sucesso");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("Email ou senha incorretos");
    }
  }

  return (
    <LoginContext.Provider
      value={{
        signIn,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
