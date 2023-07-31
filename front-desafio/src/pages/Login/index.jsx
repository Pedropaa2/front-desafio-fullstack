import { Input } from "../../components/InputsLoginAndRegister/index";
import { useForm } from "react-hook-form";
import { ThemeButton } from "../../components/ButtonBackAndLogout/styledButton";
import { ThemeP } from "../../styles/typography";
import { StyledLogin } from "./styledLogin";
import { ThemeH1 } from "../../styles/typography";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { schema } from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";

export function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const { signIn } = useAuth();
  return (
    <StyledLogin>
      <>
        <ToastContainer />
      </>
      <div className="form_Container">
        <ThemeH1 color="--Grey-05">Login</ThemeH1>
        <form action="" onSubmit={handleSubmit(signIn)}>
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
            backgroundColor="--Color-primary"
            color="--Grey-05"
            hoverBackground="--Color-primary-02"
            type="submit"
          >
            Entrar
          </ThemeButton>
        </form>
        <ThemeP color="--Grey-04">Ainda não possui uma conta?</ThemeP>
        <Link to="/register" className="button">
          Cadastre-se
        </Link>
      </div>
    </StyledLogin>
  );
}
