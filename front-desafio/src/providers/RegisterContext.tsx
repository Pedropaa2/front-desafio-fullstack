import { createContext } from "react";
import React from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterData } from "../pages/Register/validator";

export const RegisterContext = createContext({});
interface IDefaultProviderProps {
  children: React.ReactNode;
}

export const RegisterProvider = ({ children }: IDefaultProviderProps) => {
  const navigate = useNavigate();

  async function submitFunction(data: RegisterData) {
    try {
      const response = await api.post("/clients/", data);

      window.localStorage.setItem("@USERNAME", response.data.name);
      toast.success("Cliente cadastrado com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Erro ao cadastrar cliente");
    }
  }
  return (
    <RegisterContext.Provider value={{ submitFunction }}>
      {children}
    </RegisterContext.Provider>
  );
};
