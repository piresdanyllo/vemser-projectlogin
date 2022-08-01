import { useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  CardLogin,
  Logo,
  Title,
  LoginTitle,
  LoginSmall,
  FormLogin,
  LabelLogin,
  ButtonLogin,
} from "./Login.styled";
import { Link } from "react-router-dom";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      login: "",
      senha: "",
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <Container>
      <CardLogin>
        <Logo />
        <Title>Wolf Pack</Title>
        <LoginTitle>Fazer login</LoginTitle>
        <LoginSmall>Entre com seu usuário e senha</LoginSmall>
        <FormLogin onSubmit={formik.handleSubmit}>
          <LabelLogin htmlFor="login">Usuário</LabelLogin>
          <input
            id="login"
            name="login"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.login}
          />
          <div>
            <LabelLogin htmlFor="senha">Senha</LabelLogin>
            <span>Esqueceu a senha?</span>
          </div>
          <input
            id="senha"
            name="senha"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.senha}
          />
          <ButtonLogin type="submit">Login</ButtonLogin>
          <LoginSmall>
            Ainda não tem conta? <Link to='/users'>Cadastre-se aqui</Link>
          </LoginSmall>
        </FormLogin>
      </CardLogin>
    </Container>
  );
};

export default Login;
