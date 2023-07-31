import React from "react";

import { StyledMain, StyledRegister } from "./styledRegister";
import { Input } from "../../components/InputsLoginAndRegister";
import { ThemeH1 } from "../../styles/typography";
import { ThemeButton } from "../../components/ButtonBackAndLogout/styledButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "./validator";
import { useAuth } from "../../hooks/registerAuth";

export function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    if (token) {
      navigate("/dashboard");
    }
  });
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const { submitFunction } = useAuth();
  return (
    <StyledRegister>
      <StyledMain className="form_Container">
        <ThemeH1 color="--Grey-05">Crie sua conta</ThemeH1>

        <form action="" onSubmit={handleSubmit(submitFunction)}>
          <Input
            labelText="Nome"
            register={register("name")}
            placeHolder="Digite aqui seu nome"
            type="text"
          />
          <Input
            labelText="Email"
            register={register("email")}
            placeHolder="Digite aqui seu email"
            type="email"
          />
          <Input
            labelText="Senha"
            register={register("password")}
            placeHolder="Digite aqui sua senha"
            type="password"
          />

          <ThemeButton
            backgroundColor="--Color-secondary"
            color="--Grey-05"
            hoverBackground="--Color-primary-02"
            type="submit"
          >
            Cadastrar
          </ThemeButton>
        </form>
      </StyledMain>
    </StyledRegister>
  );
}
