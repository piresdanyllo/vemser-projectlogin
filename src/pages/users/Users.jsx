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
  ButtonLogin,
  LabelLogin,
  FormLogin,
} from "./Users.styled";
import { Link } from "react-router-dom";

const Users = () => {
  const { handleSignUp } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      login: "",
      senha: "",
    },
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  return (
    <>
      <Container>
        <CardLogin>
          <Logo />
          <Title>Wolf Pack</Title>
          <LoginTitle>Fazer cadastro</LoginTitle>
          <LoginSmall>Cria sua conta com seu usuário e senha</LoginSmall>
          <FormLogin onSubmit={formik.handleSubmit}>
            <LabelLogin htmlFor="login">Usuário</LabelLogin>
            <input
              id="login"
              name="login"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.login}
            />
            <LabelLogin htmlFor="senha">Senha</LabelLogin>
            <input
              id="senha"
              name="senha"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.senha}
            />            
            <ButtonLogin type="submit">Cadastrar</ButtonLogin>
            <LoginSmall>
              Voltar para <Link to="/">tela de login</Link>
            </LoginSmall>
          </FormLogin>
        </CardLogin>
      </Container>
    </>
  );
};

export default Users;
